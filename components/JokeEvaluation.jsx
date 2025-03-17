'use client'

import React from 'react'

export default function JokeEvaluation({ evaluation }) {
  // If evaluation is null or doesn't have the expected structure
  if (!evaluation || !evaluation.scores) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">AI Evaluation</h3>
        <p className="text-gray-600">No evaluation data available.</p>
      </div>
    )
  }
  // Helper function to determine the color based on the score
  const getColorClass = (score, category) => {
    // For humor, higher is better
    if (category === 'humor') {
      if (score >= 8) return 'bg-green-100 text-green-800'
      if (score >= 5) return 'bg-yellow-100 text-yellow-800'
      return 'bg-red-100 text-red-800'
    }
    
    // For offensiveness, lower is better
    if (category === 'offensiveness') {
      if (score <= 2) return 'bg-green-100 text-green-800'
      if (score <= 5) return 'bg-yellow-100 text-yellow-800'
      return 'bg-red-100 text-red-800'
    }
    
    // For appropriateness, higher is better
    if (category === 'appropriateness') {
      if (score >= 8) return 'bg-green-100 text-green-800'
      if (score >= 5) return 'bg-yellow-100 text-yellow-800'
      return 'bg-red-100 text-red-800'
    }
    
    // For originality, higher is better
    if (category === 'originality') {
      if (score >= 8) return 'bg-green-100 text-green-800'
      if (score >= 5) return 'bg-yellow-100 text-yellow-800'
      return 'bg-red-100 text-red-800'
    }
    
    // Default
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">AI Evaluation</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {evaluation.scores && Object.entries(evaluation.scores).map(([category, score]) => (
          <div key={category} className="flex flex-col items-center">
            <div className="mb-1 text-sm font-medium text-gray-700 capitalize">
              {category}
            </div>
            <div
              className={`text-sm py-1 px-3 rounded-full font-medium ${getColorClass(score, category)}`}
            >
              {score}/10
            </div>
          </div>
        ))}
      </div>
      
      {evaluation.feedback && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-700 mb-2">Feedback:</h4>
          <p className="text-gray-600 text-sm">{evaluation.feedback}</p>
        </div>
      )}
    </div>
  )
}