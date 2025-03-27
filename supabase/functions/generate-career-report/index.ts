
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// Get the DeepSeek API key from environment variables
const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');

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
    // Check if DeepSeek API key is available
    if (!DEEPSEEK_API_KEY) {
      throw new Error("DeepSeek API key not configured");
    }

    // Parse request body
    const { systemPrompt, userPrompt, userInfo, topCareerMatches } = await req.json();

    console.log("Received request to generate career report for:", userInfo.name);
    
    // For now, we'll mock the DeepSeek API call to provide a sample response structure
    // In production, this would be replaced with the actual API call

    // Simulated DeepSeek API response structure
    const mockResponse = {
      sections: [
        {
          title: "Personality Analysis",
          content: `Based on your assessment responses, you show a tendency toward ${Math.random() > 0.5 ? 'introversion' : 'extroversion'} with a ${Math.random() > 0.5 ? 'analytical' : 'creative'} thinking style.\n\nYour decision-making process appears to be ${Math.random() > 0.5 ? 'logical and systematic' : 'intuitive and values-based'}, and you prefer to ${Math.random() > 0.5 ? 'work independently' : 'collaborate with others'} when solving problems.\n\nIn learning environments, you demonstrate a preference for ${['visual', 'auditory', 'kinesthetic'][Math.floor(Math.random() * 3)]} learning methods, which suggests you would benefit from educational approaches that emphasize ${Math.random() > 0.5 ? 'practical application' : 'theoretical understanding'}.`,
          visual: "Personality Traits:\n" +
                 "Introversion ████████░░ 80%\n" +
                 "Analytical  ███████░░░ 70%\n" +
                 "Logical     ██████████ 100%\n" +
                 "Independent ████████░░ 80%"
        },
        {
          title: "Career Matches Analysis",
          content: `Your assessment results show strong alignment with careers in the ${topCareerMatches[0].clusterName} field, with a match score of ${topCareerMatches[0].score}%.\n\nThe combination of your ${Math.random() > 0.5 ? 'analytical abilities' : 'creative thinking'} and ${Math.random() > 0.5 ? 'interest in scientific concepts' : 'problem-solving skills'} makes this a particularly suitable path for you.\n\nOther highly compatible career clusters include ${topCareerMatches.length > 1 ? topCareerMatches[1].clusterName : 'Healthcare'} and ${topCareerMatches.length > 2 ? topCareerMatches[2].clusterName : 'Technology'}, which also leverage your core strengths.`,
          visual: "Career Match Scores:\n" +
                 `${topCareerMatches[0].clusterName.slice(0, 12).padEnd(12, ' ')} ${"█".repeat(Math.floor(topCareerMatches[0].score/10))}${"░".repeat(10-Math.floor(topCareerMatches[0].score/10))} ${topCareerMatches[0].score}%\n` +
                 `${topCareerMatches.length > 1 ? topCareerMatches[1].clusterName.slice(0, 12).padEnd(12, ' ') + "█".repeat(Math.floor(topCareerMatches[1].score/10)) + "░".repeat(10-Math.floor(topCareerMatches[1].score/10)) + " " + topCareerMatches[1].score + "%" : ""}\n` +
                 `${topCareerMatches.length > 2 ? topCareerMatches[2].clusterName.slice(0, 12).padEnd(12, ' ') + "█".repeat(Math.floor(topCareerMatches[2].score/10)) + "░".repeat(10-Math.floor(topCareerMatches[2].score/10)) + " " + topCareerMatches[2].score + "%" : ""}`
        },
        {
          title: "Skill Gap Analysis",
          content: `Based on your responses, we've identified several skills that would be beneficial to develop further for success in your top career match (${topCareerMatches[0].clusterName}).\n\nYour current strengths include ${topCareerMatches[0].skills.slice(0, 2).join(', ')}, which align well with this career path.\n\nHowever, there are opportunities to enhance your ${Math.random() > 0.5 ? 'technical knowledge' : 'communication abilities'} and ${Math.random() > 0.5 ? 'problem-solving approach' : 'leadership potential'} to maximize your career readiness.`,
          visual: "Skill Development Priorities:\n" +
                 "Current vs. Required Skills\n" +
                 "Technical    ██████░░░░ 60% vs. ████████░░ 80%\n" +
                 "Analytical   ███████░░░ 70% vs. ████████░░ 80%\n" +
                 "Leadership   ████░░░░░░ 40% vs. ██████░░░░ 60%"
        },
        {
          title: "Education Roadmap",
          content: `For pursuing a career in ${topCareerMatches[0].clusterName}, we recommend the following educational pathway:\n\n1. Complete 12th grade with focus on ${Math.random() > 0.5 ? 'Science (PCM/PCB)' : 'Commerce with Mathematics'}\n\n2. Bachelor's degree in ${topCareerMatches[0].clusterName.includes('Engineering') ? 'Engineering' : topCareerMatches[0].clusterName.includes('Medical') ? 'Medicine' : 'relevant field'}\n\n3. Consider specialized certifications or advanced degrees based on specific career goals\n\nEntrance exams to prepare for include ${Math.random() > 0.5 ? 'JEE Main/Advanced' : 'NEET'} for undergraduate programs and ${Math.random() > 0.5 ? 'GATE' : 'specialized graduate entrance exams'} for further studies.`,
          visual: "Educational Milestone Path:\n" +
                 "Grade 12 ➡️ Bachelor's ➡️ Specialization ➡️ Career\n" +
                 "        (3-4 years)   (1-3 years)"
        },
        {
          title: "Learning Style & Study Strategies",
          content: `Your assessment responses indicate you have a predominant ${['visual', 'auditory', 'kinesthetic'][Math.floor(Math.random() * 3)]} learning style.\n\nFor maximum learning effectiveness, consider these personalized study strategies:\n\n1. ${Math.random() > 0.5 ? 'Create visual mind maps and diagrams' : 'Record yourself explaining concepts and listen back'}\n\n2. ${Math.random() > 0.5 ? 'Use color-coding and visual hierarchies in notes' : 'Join study groups for discussion'}\n\n3. ${Math.random() > 0.5 ? 'Watch video tutorials on complex topics' : 'Teach concepts to others to reinforce understanding'}`,
        }
      ],
      warnings: [
        `Your assessment shows lower scores in ${Math.random() > 0.5 ? 'social interaction preferences' : 'mathematical reasoning'}, which may present challenges in certain aspects of your chosen career path.`,
        `Consider developing your ${Math.random() > 0.5 ? 'teamwork and collaboration' : 'technical analysis'} skills to address potential gaps in your career readiness profile.`
      ],
      recommendations: [
        `Focus on strengthening your ${Math.random() > 0.5 ? 'quantitative skills' : 'verbal communication'} through targeted practice and coursework.`,
        `Seek opportunities for ${Math.random() > 0.5 ? 'internships or shadowing' : 'project-based learning'} in your field of interest to gain practical experience.`,
        `Develop a personalized study plan that leverages your ${['visual', 'auditory', 'kinesthetic'][Math.floor(Math.random() * 3)]} learning style for more effective preparation.`
      ]
    };

    // Return the mock response for now
    // In production, this would be the actual DeepSeek API response
    return new Response(JSON.stringify(mockResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

    /* 
    // This is how the actual DeepSeek API call would be structured
    // Uncomment and replace the mock response when DeepSeek API is ready
    
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek-chat",
        "messages": [
          {
            "role": "system",
            "content": systemPrompt
          },
          {
            "role": "user",
            "content": userPrompt
          }
        ],
        "temperature": 0.3,
        "max_tokens": 3000,
        "response_format": { "type": "json_object" }
      })
    });

    const data = await response.json();
    
    // Parse and process DeepSeek response
    const generatedContent = JSON.parse(data.choices[0].message.content);
    
    return new Response(JSON.stringify(generatedContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    */
    
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
