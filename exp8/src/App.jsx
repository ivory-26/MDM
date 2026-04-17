import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [sessionTime, setSessionTime] = useState(0)

  // Side Effect 1: Update Document Title
  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])

  // Side Effect 2: Session Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)
    
    // Cleanup function
    return () => clearInterval(timer)
  }, [])

  const increment = () => setCount(prev => prev + 1)
  const decrement = () => setCount(prev => (prev > 0 ? prev - 1 : 0))
  const reset = () => setCount(0)

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="container">
      <div className="glow-sphere"></div>
      
      <main className="counter-card">
        <header>
          <span className="badge">React Hooks Demo</span>
          <h1>Minimalist Counter</h1>
          <p className="session-info">Active for {formatTime(sessionTime)}</p>
        </header>

        <div className="display-area">
          <div className="count-wrapper">
            <span className="count-number">{count}</span>
          </div>
        </div>

        <div className="controls">
          <button className="btn btn-secondary" onClick={decrement} aria-label="Decrease">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14" />
            </svg>
          </button>

          <button className="btn btn-primary" onClick={increment} aria-label="Increase">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>

          <button className="btn btn-ghost" onClick={reset}>Reset</button>
        </div>
      </main>

      <footer className="footer-note">
        Built with <span>useState</span> & <span>useEffect</span>
      </footer>
    </div>
  )
}

export default App
