
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY is not set in environment variables');
    }

    const { userInfo, answers, assessmentResult, careerMatches } = await req.json();

    console.log("Received data for AI report generation");
    console.log("User info:", userInfo);
    console.log("Career matches count:", careerMatches.length);

    // Connect to Google AI Gemini
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`;

    // Prepare prompt with user data
    const topCareerPaths = careerMatches.slice(0, 3).map(match => 
      `${match.path} (Match: ${match.matchScore}%)`
    ).join(", ");

    let answersText = "";
    if (answers) {
      answersText = Object.entries(answers)
        .map(([questionId, answer]) => `Question ${questionId}: ${answer}`)
        .join("\n");
    }

    const prompt = `
      Generate a comprehensive career guidance report for a student with the following profile:
      
      Name: ${userInfo.name}
      Grade: ${userInfo.grade || 'High School'}
      Email: ${userInfo.email || 'Not provided'}
      ${userInfo.age ? `Age: ${userInfo.age}` : ''}
      ${userInfo.location ? `Location: ${userInfo.location}` : ''}
      
      Assessment Results:
      Top career matches: ${topCareerPaths}
      
      User's assessment answers:
      ${answersText}
      
      Based on this information, please generate:
      1. Three detailed sections analyzing their profile, career fit, and educational path.
      2. A list of 3 warnings or challenges they might face.
      3. A list of 5 specific recommendations for next steps.
      
      Format each section with a clear title and detailed content. Make the guidance specific to their top career matches.
      Write this as if you're a professional career counselor addressing them directly.
    `;

    console.log("Sending request to Google AI");

    const aiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
          topP: 0.95,
          topK: 40
        }
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("Google AI API error:", errorText);
      throw new Error(`Google AI API error: ${aiResponse.status} - ${errorText}`);
    }

    const aiData = await aiResponse.json();
    console.log("Received response from Google AI");

    const aiText = aiData.candidates[0].content.parts[0].text;
    
    // Parse the AI response into structured sections
    const sections = parseAiResponse(aiText);
    
    return new Response(
      JSON.stringify(sections),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error("Error in generate-ai-report function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "An error occurred during report generation",
        sections: [],
        warnings: ["Error generating report"],
        recommendations: ["Please try again later"]
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 500
      }
    );
  }
});

function parseAiResponse(text: string) {
  // Simple parsing function to extract sections, warnings and recommendations
  const sections = [];
  const warnings = [];
  const recommendations = [];
  
  // Split by double newlines to get paragraphs
  const paragraphs = text.split(/\n\n+/);
  
  let currentSection = null;
  let inWarnings = false;
  let inRecommendations = false;
  
  for (const para of paragraphs) {
    const trimmedPara = para.trim();
    
    // Check for section headers
    if (trimmedPara.startsWith('# ') || /^[A-Z][A-Za-z\s]+:/.test(trimmedPara)) {
      // This is a section header
      if (currentSection) {
        sections.push(currentSection);
      }
      
      const title = trimmedPara.replace(/^# /, '').replace(/:$/, '');
      currentSection = { title, content: '' };
      
      // Check if we're entering warnings or recommendations
      if (title.toLowerCase().includes('warning') || title.toLowerCase().includes('challenge')) {
        inWarnings = true;
        inRecommendations = false;
      } else if (title.toLowerCase().includes('recommendation') || title.toLowerCase().includes('next step')) {
        inWarnings = false;
        inRecommendations = true;
      } else {
        inWarnings = false;
        inRecommendations = false;
      }
    } 
    // Check for bullet points that might be warnings or recommendations
    else if (trimmedPara.startsWith('- ') || trimmedPara.startsWith('• ') || /^\d+\./.test(trimmedPara)) {
      const item = trimmedPara.replace(/^[- •]\s*/, '').replace(/^\d+\.\s*/, '');
      
      if (inWarnings) {
        warnings.push(item);
      } else if (inRecommendations) {
        recommendations.push(item);
      } else if (currentSection) {
        currentSection.content += trimmedPara + '\n\n';
      }
    }
    // Regular content
    else if (currentSection && trimmedPara) {
      currentSection.content += trimmedPara + '\n\n';
    }
  }
  
  // Add the last section if there is one
  if (currentSection) {
    sections.push(currentSection);
  }
  
  // Extract warnings and recommendations if they weren't explicitly marked
  if (warnings.length === 0) {
    const warningSection = sections.find(s => 
      s.title.toLowerCase().includes('warning') || 
      s.title.toLowerCase().includes('challenge')
    );
    
    if (warningSection) {
      const extracted = extractBulletPoints(warningSection.content);
      warnings.push(...extracted);
    }
  }
  
  if (recommendations.length === 0) {
    const recSection = sections.find(s => 
      s.title.toLowerCase().includes('recommendation') || 
      s.title.toLowerCase().includes('next step')
    );
    
    if (recSection) {
      const extracted = extractBulletPoints(recSection.content);
      recommendations.push(...extracted);
    }
  }
  
  return {
    sections: sections.filter(s => 
      !s.title.toLowerCase().includes('warning') && 
      !s.title.toLowerCase().includes('challenge') &&
      !s.title.toLowerCase().includes('recommendation') && 
      !s.title.toLowerCase().includes('next step')
    ),
    warnings,
    recommendations
  };
}

function extractBulletPoints(text: string) {
  const lines = text.split('\n');
  const points = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ') || /^\d+\./.test(trimmedLine)) {
      const point = trimmedLine.replace(/^[- •]\s*/, '').replace(/^\d+\.\s*/, '');
      if (point) {
        points.push(point);
      }
    }
  }
  
  return points;
}
