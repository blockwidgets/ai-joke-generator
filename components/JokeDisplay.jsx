'use client'

import React from 'react'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

export default function JokeDisplay({ joke }) {
  return (
    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
      <h3 className="text-xl font-semibold mb-4 text-blue-800">Your Joke</h3>
      <div className="relative">
        <FaQuoteLeft className="text-blue-300 absolute top-0 left-0 text-xl" />
        <p className="text-gray-800 text-lg px-8 whitespace-pre-line">
          {joke}
        </p>
        <FaQuoteRight className="text-blue-300 absolute bottom-0 right-0 text-xl" />
      </div>
    </div>
  )
}