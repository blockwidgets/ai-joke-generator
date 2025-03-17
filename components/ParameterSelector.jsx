'use client'

import React from 'react'

export default function ParameterSelector({ parameters, onChange }) {
  // Define options for each parameter
  const options = {
    topic: [
      { value: 'general', label: 'General' },
      { value: 'work', label: 'Work & Office' },
      { value: 'tech', label: 'Technology' },
      { value: 'animals', label: 'Animals' },
      { value: 'food', label: 'Food & Cooking' },
      { value: 'sports', label: 'Sports' },
      { value: 'movies', label: 'Movies & TV' },
      { value: 'music', label: 'Music' },
      { value: 'science', label: 'Science' },
      { value: 'history', label: 'History' }
    ],
    tone: [
      { value: 'witty', label: 'Witty' },
      { value: 'sarcastic', label: 'Sarcastic' },
      { value: 'silly', label: 'Silly' },
      { value: 'dry', label: 'Dry' },
      { value: 'goofy', label: 'Goofy' },
      { value: 'clever', label: 'Clever' },
      { value: 'absurd', label: 'Absurd' }
    ],
    type: [
      { value: 'pun', label: 'Pun' },
      { value: 'one-liner', label: 'One-liner' },
      { value: 'knock-knock', label: 'Knock-knock' },
      { value: 'story', label: 'Story Joke' },
      { value: 'wordplay', label: 'Wordplay' },
      { value: 'dad-joke', label: 'Dad Joke' },
      { value: 'riddle', label: 'Riddle' }
    ]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Topic Selection */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Topic</label>
        <select
          value={parameters.topic}
          onChange={(e) => onChange('topic', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.topic.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Tone Selection */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Tone</label>
        <select
          value={parameters.tone}
          onChange={(e) => onChange('tone', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.tone.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Joke Type Selection */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Joke Type</label>
        <select
          value={parameters.type}
          onChange={(e) => onChange('type', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.type.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Temperature Slider */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Creativity Level (Temperature): {parameters.temperature}
        </label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={parameters.temperature}
          onChange={(e) => onChange('temperature', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-500 text-xs mt-1">
          <span>More Predictable</span>
          <span>More Creative</span>
        </div>
      </div>
    </div>
  )
}