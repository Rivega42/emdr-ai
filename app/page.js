'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [pattern, setPattern] = useState('horizontal')
  const [speed, setSpeed] = useState(1.0)
  const [isRunning, setIsRunning] = useState(false)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [sessionData, setSessionData] = useState({
    stressLevel: 0.5,
    engagementLevel: 0.7,
    positivityLevel: 0.6
  })

  useEffect(() => {
    if (!canvasRef.current || !isRunning) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight * 0.6

    let startTime = Date.now()
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.05)')
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0.05)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      const t = (Date.now() - startTime) * 0.001 * speed
      let x = 0, y = 0
      
      // Calculate position based on pattern
      switch(pattern) {
        case 'horizontal':
          x = (Math.sin(t) + 1) * 0.5 * canvas.width
          y = canvas.height / 2
          break
        case 'infinity':
          x = canvas.width/2 + Math.sin(t) * canvas.width * 0.3
          y = canvas.height/2 + Math.sin(t * 2) * canvas.height * 0.2
          break
        case 'butterfly':
          const scale = Math.min(canvas.width, canvas.height) * 0.25
          x = canvas.width/2 + Math.sin(t) * scale * Math.cos(t)
          y = canvas.height/2 + Math.sin(t) * scale * Math.sin(t)
          break
        case 'spiral':
          const radius = (Math.sin(t/3) + 1) * Math.min(canvas.width, canvas.height) * 0.25
          x = canvas.width/2 + Math.cos(t * 3) * radius
          y = canvas.height/2 + Math.sin(t * 3) * radius
          break
        case 'wave':
          x = (t * 50) % canvas.width
          y = canvas.height/2 + Math.sin(t * 4) * canvas.height * 0.2
          break
        case 'diagonal':
          x = ((Math.sin(t) + 1) * 0.5) * canvas.width
          y = ((Math.sin(t) + 1) * 0.5) * canvas.height
          break
        case 'circular':
          const circleRadius = Math.min(canvas.width, canvas.height) * 0.3
          x = canvas.width/2 + Math.cos(t * 2) * circleRadius
          y = canvas.height/2 + Math.sin(t * 2) * circleRadius
          break
      }
      
      // Draw the EMDR dot with glow effect
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 40)
      glowGradient.addColorStop(0, 'rgba(34, 197, 94, 0.8)')
      glowGradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.3)')
      glowGradient.addColorStop(1, 'rgba(34, 197, 94, 0)')
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(x, y, 40, 0, Math.PI * 2)
      ctx.fill()
      
      // Inner dot
      ctx.fillStyle = '#22c55e'
      ctx.beginPath()
      ctx.arc(x, y, 15, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw trail
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.2)'
      ctx.lineWidth = 2
      ctx.beginPath()
      for(let i = 0; i < 20; i++) {
        const trailT = t - i * 0.05
        let trailX = 0, trailY = 0
        
        switch(pattern) {
          case 'horizontal':
            trailX = (Math.sin(trailT) + 1) * 0.5 * canvas.width
            trailY = canvas.height / 2
            break
          // Add other patterns for trail
        }
        
        if(i === 0) ctx.moveTo(trailX, trailY)
        else ctx.lineTo(trailX, trailY)
      }
      ctx.stroke()
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isRunning, pattern, speed])

  // Simulate emotion tracking
  useEffect(() => {
    if (!isRunning) return
    
    const interval = setInterval(() => {
      setSessionData(prev => ({
        stressLevel: Math.max(0, prev.stressLevel - Math.random() * 0.1),
        engagementLevel: Math.min(1, prev.engagementLevel + Math.random() * 0.05),
        positivityLevel: Math.min(1, prev.positivityLevel + Math.random() * 0.08)
      }))
    }, 2000)
    
    return () => clearInterval(interval)
  }, [isRunning])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🧠</span>
              </div>
              <h1 className="text-2xl font-bold text-white">EMDR-AI Therapy</h1>
            </div>
            <nav className="flex space-x-6">
              <button className="text-white/80 hover:text-white transition">Sessions</button>
              <button className="text-white/80 hover:text-white transition">Progress</button>
              <button className="text-white/80 hover:text-white transition">Settings</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Canvas Area */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl">
          <canvas 
            ref={canvasRef}
            className="w-full"
            style={{ height: '400px' }}
          />
        </div>

        {/* Controls */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pattern Selection */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Movement Pattern</h3>
            <select 
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border border-white/20 focus:border-green-400 focus:outline-none"
            >
              <option value="horizontal">Horizontal</option>
              <option value="infinity">Infinity (∞)</option>
              <option value="butterfly">Butterfly</option>
              <option value="spiral">Spiral</option>
              <option value="wave">Wave</option>
              <option value="diagonal">Diagonal</option>
              <option value="circular">Circular</option>
            </select>
          </div>

          {/* Speed Control */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Speed: {speed.toFixed(1)}x</h3>
            <input 
              type="range"
              min="0.3"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-green-400"
            />
            <div className="flex justify-between text-white/60 text-sm mt-2">
              <span>Slow</span>
              <span>Normal</span>
              <span>Fast</span>
            </div>
          </div>

          {/* Session Control */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Session Control</h3>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                isRunning 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isRunning ? '⏸ Pause Session' : '▶ Start Session'}
            </button>
          </div>
        </div>

        {/* Emotion Metrics */}
        {isRunning && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h4 className="text-white/80 text-sm mb-2">Stress Level</h4>
              <div className="flex items-center justify-between">
                <div className="flex-1 bg-white/20 rounded-full h-2 mr-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-yellow-400 h-2 rounded-full transition-all"
                    style={{ width: `${(1 - sessionData.stressLevel) * 100}%` }}
                  />
                </div>
                <span className="text-white font-bold">
                  {((1 - sessionData.stressLevel) * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h4 className="text-white/80 text-sm mb-2">Engagement</h4>
              <div className="flex items-center justify-between">
                <div className="flex-1 bg-white/20 rounded-full h-2 mr-3">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all"
                    style={{ width: `${sessionData.engagementLevel * 100}%` }}
                  />
                </div>
                <span className="text-white font-bold">
                  {(sessionData.engagementLevel * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h4 className="text-white/80 text-sm mb-2">Positivity</h4>
              <div className="flex items-center justify-between">
                <div className="flex-1 bg-white/20 rounded-full h-2 mr-3">
                  <div 
                    className="bg-gradient-to-r from-pink-400 to-rose-400 h-2 rounded-full transition-all"
                    style={{ width: `${sessionData.positivityLevel * 100}%` }}
                  />
                </div>
                <span className="text-white font-bold">
                  {(sessionData.positivityLevel * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}