import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    const { topic, tone, type, temperature } = await request.json()

    // Construct system message based on parameters
    const systemMessage = `You are a professional comedian specializing in ${tone} humor. 
    Your task is to create a ${type} joke about ${topic}. 
    Make sure the joke is clever, original, and appropriate for a general audience.
    Structure the joke properly according to its type.`

    // Create prompt for different joke types
    let userPrompt = ""
    
    switch (type) {
      case 'knock-knock':
        userPrompt = `Create a knock-knock joke about ${topic} that is ${tone} in tone.`
        break
      case 'pun':
        userPrompt = `Create a clever pun about ${topic} that is ${tone} in tone.`
        break
      case 'one-liner':
        userPrompt = `Create a one-liner about ${topic} that is ${tone} in tone.`
        break
      case 'story':
        userPrompt = `Create a short story joke about ${topic} that is ${tone} in tone. Keep it concise with a clear punchline.`
        break
      case 'dad-joke':
        userPrompt = `Create a classic dad joke about ${topic} that is ${tone} in tone.`
        break
      case 'riddle':
        userPrompt = `Create a riddle about ${topic} that is ${tone} in tone. Include both the question and answer.`
        break
      default:
        userPrompt = `Create a joke about ${topic} that is ${tone} in tone.`
    }

    // Call OpenAI API to generate the joke
    const response = await openai.chat.completions.create({
      model: 'gpt-4', // or another appropriate model
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userPrompt }
      ],
      temperature: parseFloat(temperature), // Controls randomness/creativity
      max_tokens: 500, // Limit response length
    })

    // Extract the joke from the response
    const joke = response.choices[0].message.content.trim()

    return NextResponse.json({ joke })
  } catch (error) {
    console.error('Error generating joke:', error)
    return NextResponse.json(
      { error: 'Failed to generate joke' },
      { status: 500 }
    )
  }
}