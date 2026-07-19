/**
 * Main App Component
 * Entry point for the React application
 */

import React, { useState, useEffect } from 'react'
import PostComposer from './components/PostComposer'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Save dark mode preference
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode))
  }

  return (
    <PostComposer
      darkMode={darkMode}
      onDarkModeToggle={handleDarkModeToggle}
    />
  )
}

export default App
