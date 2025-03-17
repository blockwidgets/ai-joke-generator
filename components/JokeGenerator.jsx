'use client'

import React, { useState } from 'react'
import ParameterSelector from './ParameterSelector'
import JokeDisplay from './JokeDisplay'
import JokeEvaluation from './JokeEvaluation'
import { FaSpinner } from 'react-icons/fa'

export default function JokeGenerator() {
  // State for joke parameters
  const [parameters, setParameters] = useState({
    topic: 'general',
    tone: 'witty',
    type: 'pun',
    temperature: 0.7
  })

  // State for the generated joke and its evaluation
  const [joke, setJoke] = useState('')
  const [evaluation, setEvaluation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Handle parameter changes
  const handleParameterChange = (name, value) => {
    setParameters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Function to generate a joke
  const generateJoke = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      // Call the API to generate a joke
      const response = await fetch('/api/generate-joke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters),
      })

      if (!response.ok) {
        throw new Error('Failed to generate joke')
      }

      const data = await response.json()
      setJoke(data.joke)
      
      // After getting the joke, evaluate it
      if (data.joke) {
        try {
          const evalResponse = await fetch('/api/evaluate-joke', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ joke: data.joke, parameters }),
          })

          if (evalResponse.ok) {
            const evalData = await evalResponse.json()
            setEvaluation(evalData.evaluation)
          } else {
            console.warn('Evaluation response was not OK:', await evalResponse.text())
            setEvaluation({
              scores: {
                humor: 5,
                offensiveness: 3,
                appropriateness: 7,
                originality: 5
              },
              feedback: "Evaluation data could not be retrieved. The joke is still funny, though!"
            })
          }
        } catch (evalError) {
          console.error('Error during joke evaluation:', evalError)
          setEvaluation({
            scores: {
              humor: 5,
              offensiveness: 3,
              appropriateness: 7,
              originality: 5
            },
            feedback: "Evaluation data could not be retrieved. The joke is still funny, though!"
          })
        }
      }
    } catch (err) {
      console.error('Error generating joke:', err)
      setError('Failed to generate joke. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Customize Your Joke</h2>
        <ParameterSelector 
          parameters={parameters} 
          onChange={handleParameterChange} 
        />
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={generateJoke}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition duration-300 flex items-center disabled:bg-blue-400"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            'Generate Joke'
          )}
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      {joke && !isLoading && (
        <div className="mt-8">
          <JokeDisplay joke={joke} />
          
          {evaluation && (
            <div className="mt-6">
              <JokeEvaluation evaluation={evaluation} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}