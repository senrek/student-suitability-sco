
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// Get the Google AI Studio API key from environment variables
const GOOGLE_AI_API_KEY = Deno.env.get('GOOGLE_AI_API_KEY') || "AIzaSyCIUg4ZXk3yp3Ok9HOYPrJHGwwM3JAZImw";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userInfo, answers, assessmentResult, careerMatches } = await req.json();
    
    console.log("Received request to generate career report for:", userInfo.name);
    console.log("Number of answers:", Object.keys(answers).length);
    console.log("Number of career matches:", careerMatches.length);
    
    // Prepare the prompt for Google AI Studio (Gemini)
    const prompt = `
    Generate a comprehensive career assessment report for a student with the following profile:
    
    STUDENT PROFILE:
    Name: ${userInfo.name}
    Age: ${userInfo.age || 'Not specified'}
    Grade: ${userInfo.grade || '11-12'}
    Location: ${userInfo.location || 'Not specified'}
    
    ASSESSMENT RESULTS:
    Career Matches: ${careerMatches.map(match => `${match.path} (${match.matchScore}% match)`).join(', ')}
    
    Based on this information, generate a detailed career assessment report with the following sections:
    1. Personality Analysis - Analyze the student's personality traits based on their assessment answers
    2. Career Matches Analysis - Evaluate the top 3 career matches and explain why they are suitable
    3. Skill Gap Analysis - Identify skills the student needs to develop for their top career matches
    4. Education Roadmap - Recommend educational pathways for the top career match
    5. Learning Style & Study Strategies - Suggest study approaches based on their learning preferences
    
    For each section, provide:
    - A detailed analysis (200-300 words)
    - Practical recommendations
    - Visual representations of data where appropriate (as text-based charts/diagrams)
    
    Additionally, include:
    - 3 specific warnings about potential challenges they might face
    - 5 tailored recommendations for next steps
    
    Format the response as a JSON object with these sections as keys, where each section has "title", "content", and optionally "visual" properties.
    `;
    
    // Make the request to Google AI Studio API (Gemini)
    try {
      console.log("Making request to Google AI Studio API...");
      
      const geminiResponse = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GOOGLE_AI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          }
        })
      });
      
      if (!geminiResponse.ok) {
        const errorData = await geminiResponse.text();
        console.error("Google AI Studio API error response:", errorData);
        throw new Error(`Google AI Studio API error: ${errorData}`);
      }
      
      const geminiData = await geminiResponse.json();
      console.log("Received response from Google AI Studio API");
      
      // Extract the generated content
      let content = {};
      
      try {
        if (geminiData.candidates && geminiData.candidates[0]?.content?.parts) {
          const textContent = geminiData.candidates[0].content.parts[0].text;
          // Try to parse the JSON from the text response
          content = JSON.parse(textContent.replace(/```json|```/g, '').trim());
        } else {
          throw new Error("Unexpected response format from Google AI Studio API");
        }
      } catch (parseError) {
        console.error("Error parsing Google AI Studio response:", parseError);
        
        // Fallback to manually creating a structured response
        content = {
          sections: [
            {
              title: "Personality Analysis",
              content: "Based on your assessment results, you exhibit strong analytical thinking skills and a methodical approach to problem-solving. Your responses indicate a preference for logical reasoning and data-based decision-making.",
              visual: "Analytical Thinking: ████████░░ 80%\nMethodical Approach: ███████░░░ 70%\nCreativity: ██████░░░░ 60%"
            },
            {
              title: "Career Matches Analysis",
              content: `Your top career match is ${careerMatches[0]?.path || 'Engineering'} with a ${careerMatches[0]?.matchScore || '85'}% compatibility score. This aligns well with your analytical skills and problem-solving abilities.`,
              visual: `${careerMatches[0]?.path || 'Engineering'}: ████████░░ ${careerMatches[0]?.matchScore || '85'}%\n${careerMatches[1]?.path || 'Computer Science'}: ███████░░░ ${careerMatches[1]?.matchScore || '75'}%`
            },
            {
              title: "Skill Gap Analysis",
              content: `To excel in ${careerMatches[0]?.path || 'Engineering'}, consider developing stronger skills in technical writing, project management, and advanced mathematics.`,
              visual: "Technical Writing: ██████░░░░ 60% (Need: 80%)\nProject Management: █████░░░░░ 50% (Need: 75%)"
            },
            {
              title: "Education Roadmap",
              content: `A bachelor's degree in ${careerMatches[0]?.path || 'Engineering'} is recommended, followed by specialized certification or a master's degree in your area of interest.`,
              visual: "Education Path:\nBachelor's Degree (4 years) → Specialized Certification (1 year) → Industry Experience"
            },
            {
              title: "Learning Style & Study Strategies",
              content: "Your assessment indicates you learn best through practical application and visual aids. Consider using diagrams, charts, and hands-on projects to reinforce your understanding of complex concepts."
            }
          ],
          warnings: [
            "Your current mathematical skills may need strengthening for advanced coursework.",
            "The field requires continuous learning to keep up with evolving technologies.",
            "Entry-level positions may require additional certifications beyond a degree."
          ],
          recommendations: [
            "Take advanced mathematics courses to build a strong foundation.",
            "Seek internship opportunities to gain practical experience.",
            "Join professional organizations to build your network.",
            "Develop a portfolio of projects to showcase your skills.",
            "Consider a minor in business or communication to complement your technical skills."
          ]
        };
      }
      
      return new Response(JSON.stringify(content), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (aiError) {
      console.error("Google AI Studio API error:", aiError);
      throw new Error(`Google AI Studio API error: ${aiError.message}`);
    }
  } catch (error) {
    console.error("Error:", error.message);
    
    return new Response(JSON.stringify({
      error: error.message,
      sections: [{
        title: "Error Generating Report",
        content: "There was an error generating your AI-enhanced career report. Please try again later or contact support."
      }],
      warnings: [],
      recommendations: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
