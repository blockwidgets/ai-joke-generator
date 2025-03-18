import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
    
  try {
    const { joke, parameters } = await request.json()

    // Construct system message for evaluation
    const systemMessage = `You are an expert comedy critic with decades of experience evaluating humor. 
    Your task is to evaluate a joke and provide objective scores and feedback.
    
    You should evaluate the joke based on the following criteria:
    - Humor: How funny is the joke on a scale of 1-10?
    - Offensiveness: How potentially offensive is the joke on a scale of 1-10? (1 = not offensive at all, 10 = extremely offensive)
    - Appropriateness: How appropriate is the joke for a general audience on a scale of 1-10?
    - Originality: How original and creative is the joke on a scale of 1-10?
    
    Additionally, provide brief constructive feedback about the joke.
    
    IMPORTANT: Your response MUST be in valid JSON format with NOTHING else before or after. Use EXACTLY this structure:
    
    {
      "scores": {
        "humor": <number from 1-10>,
        "offensiveness": <number from 1-10>,
        "appropriateness": <number from 1-10>,
        "originality": <number from 1-10>
      },
      "feedback": "<brief feedback text>"
    }
    
    Do not include any explanations or additional text outside of this JSON structure.`

    // Call OpenAI API to evaluate the joke
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Using a widely available model
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: `Please evaluate this ${parameters.type} joke about ${parameters.topic} with a ${parameters.tone} tone:\n\n${joke}` }
      ],
      temperature: 0.5, // Lower temperature for more consistent evaluations
    })

    // Extract the evaluation from the response
    const evaluationText = response.choices[0].message.content.trim()
    
    // Try to parse the response as JSON, but handle the case where it might not be valid JSON
    let evaluation
    try {
      evaluation = JSON.parse(evaluationText)
    } catch {
      // If parsing fails, create a default structure and include the raw feedback
      evaluation = {
        scores: {
          humor: 5,
          offensiveness: 3,
          appropriateness: 7,
          originality: 5
        },
        feedback: evaluationText
      }
    }

    return NextResponse.json({ evaluation })
  } catch (error) {
    console.error('Error evaluating joke:', error)
    return NextResponse.json(
      { error: 'Failed to evaluate joke' },
      { status: 500 }
    )
  }
}