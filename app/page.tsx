'use client'

import React from 'react'
import JokeGenerator from '@/components/JokeGenerator'

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-blue-50 to-sky-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Joke Generator</h1>
          <p className="text-lg text-gray-600">
            Customize your joke preferences and let AI create humor just for you!
          </p>
        </header>
        
        <JokeGenerator />
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p></p>
        </footer>
      </div>
    </main>
  )
}