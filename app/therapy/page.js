'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Brain, Play, Pause, Square, Settings, Volume2, Eye, 
  Activity, User, LogOut, Home, ChevronRight, Info,
  Zap, Moon, Sun, Heart, Shield, Clock, Calendar
} from 'lucide-react'

export default function TherapyPage() {
  const router = useRouter()
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [currentPattern, setCurrentPattern] = useState('horizontal')
  const [speed, setSpeed] = useState(1.0)
  const [color, setColor] = useState('#4CAF50')
  const [volume, setVolume] = useState(0.5)
  const [showSettings, setShowSettings] = useState(false)
  const [emotionData, setEmotionData] = useState({
    stress: 0.5,
    engagement: 0.7,
    positivity: 0.6
  })

  // EMDR Patterns
  const patterns = {
    horizontal: 'Горизонтальный',
    infinity: 'Бесконечность',
    butterfly: 'Бабочка',
    spiral: 'Спираль',
    wave: 'Волна',
    circular: 'Круговой',
    diagonal: 'Диагональный',
    figure8: 'Восьмерка'
  }

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser')
      
      if (!currentUser) {
        router.push('/login')
        return
      }
      
      const userData = JSON.parse(currentUser)
      setUser(userData)
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])

  // Session timer
  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  // Canvas animation
  useEffect(() => {
    if (!canvasRef.current || !isPlaying) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    
    let time = 0
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      time += 0.01 * speed
      let x, y
      
      switch(currentPattern) {
        case 'horizontal':
          x = (Math.sin(time) + 1) * 0.5 * canvas.width
          y = canvas.height / 2
          break
        case 'infinity':
          x = canvas.width/2 + Math.sin(time) * 150
          y = canvas.height/2 + Math.sin(time * 2) * 75
          break
        case 'butterfly':
          const scale = 100
          x = canvas.width/2 + Math.sin(time) * scale * Math.cos(time)
          y = canvas.height/2 + Math.sin(time) * scale * Math.sin(time)
          break
        case 'spiral':
          const radius = (Math.sin(time/3) + 1) * 100
          x = canvas.width/2 + Math.cos(time * 3) * radius
          y = canvas.height/2 + Math.sin(time * 3) * radius
          break
        case 'wave':
          x = (time * 50) % canvas.width
          y = canvas.height/2 + Math.sin(time * 3) * 50
          break
        case 'circular':
          x = canvas.width/2 + Math.cos(time) * 150
          y = canvas.height/2 + Math.sin(time) * 150
          break
        case 'diagonal':
          x = ((Math.sin(time) + 1) * 0.5) * canvas.width
          y = ((Math.sin(time) + 1) * 0.5) * canvas.height
          break
        case 'figure8':
          x = canvas.width/2 + Math.sin(time * 2) * 100
          y = canvas.height/2 + Math.sin(time) * 150
          break
        default:
          x = canvas.width/2
          y = canvas.height/2
      }
      
      // Draw trail
      for (let i = 0; i < 5; i++) {
        const alpha = (5 - i) / 5 * 0.3
        const size = 20 + i * 2
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()
      }
      
      // Draw main object
      ctx.beginPath()
      ctx.arc(x, y, 20, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
      
      // Glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 40)
      gradient.addColorStop(0, color + '80')
      gradient.addColorStop(1, color + '00')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, 40, 0, Math.PI * 2)
      ctx.fill()
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, currentPattern, speed, color])

  // Simulate emotion tracking
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setEmotionData({
        stress: Math.max(0, Math.min(1, emotionData.stress + (Math.random() - 0.6) * 0.1)),
        engagement: Math.max(0, Math.min(1, emotionData.engagement + (Math.random() - 0.4) * 0.1)),
        positivity: Math.max(0, Math.min(1, emotionData.positivity + (Math.random() - 0.3) * 0.1))
      })
    }, 2000)
    
    return () => clearInterval(interval)
  }, [isPlaying, emotionData])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    sessionStorage.removeItem('currentUser')
    router.push('/')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 text-purple-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
      {/* Header */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-white" />
                <span className="text-xl font-bold text-white">EMDR-AI</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/therapy" className="text-white/80 hover:text-white transition">
                  <Home className="h-5 w-5" />
                </Link>
                <Link href="/progress" className="text-white/80 hover:text-white transition">
                  <Activity className="h-5 w-5" />
                </Link>
                <Link href="/profile" className="text-white/80 hover:text-white transition">
                  <User className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white text-sm">Привет, {user?.name}!</p>
                <p className="text-white/60 text-xs">Сессий сегодня: 1</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-white/80 hover:text-white transition"
                title="Выйти"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-white/10"
            >
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-[500px] rounded-2xl bg-gradient-to-br from-purple-950 to-blue-950"
                />
                
                {/* Overlay Controls */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-4 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition"
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8 text-white" />
                    ) : (
                      <Play className="h-8 w-8 text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsPlaying(false)
                      setSessionTime(0)
                    }}
                    className="p-4 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition"
                  >
                    <Square className="h-8 w-8 text-white" />
                  </button>
                </div>
                
                {/* Session Timer */}
                <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md rounded-full px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-white/60" />
                    <span className="text-white font-mono">{formatTime(sessionTime)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pattern Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Паттерны движения
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(patterns).map(([key, name]) => (
                  <button
                    key={key}
                    onClick={() => setCurrentPattern(key)}
                    className={`p-3 rounded-lg text-sm font-medium transition ${
                      currentPattern === key
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emotion Tracking */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Эмоциональное состояние
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">Стресс</span>
                    <span className="text-white">{(emotionData.stress * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-red-400 h-2 rounded-full transition-all"
                      style={{ width: `${emotionData.stress * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">Вовлеченность</span>
                    <span className="text-white">{(emotionData.engagement * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all"
                      style={{ width: `${emotionData.engagement * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">Позитивность</span>
                    <span className="text-white">{(emotionData.positivity * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-green-400 h-2 rounded-full transition-all"
                      style={{ width: `${emotionData.positivity * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Настройки сессии
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-white/70 text-sm block mb-2">Скорость</label>
                  <input
                    type="range"
                    min="0.3"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-white text-center mt-1">{speed.toFixed(1)} Hz</div>
                </div>
                <div>
                  <label className="text-white/70 text-sm block mb-2">Цвет</label>
                  <div className="grid grid-cols-6 gap-2">
                    {['#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#F44336', '#00BCD4'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-10 h-10 rounded-lg border-2 ${
                          color === c ? 'border-white' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/70 text-sm block mb-2">Громкость</label>
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-white/70" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Session Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Статистика
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70 text-sm">Сессий сегодня</span>
                  <span className="text-white font-semibold">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70 text-sm">Всего сессий</span>
                  <span className="text-white font-semibold">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70 text-sm">Общее время</span>
                  <span className="text-white font-semibold">5ч 42м</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70 text-sm">Прогресс</span>
                  <span className="text-green-400 font-semibold">+15%</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-6 border border-purple-400/20"
            >
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Совет дня
              </h3>
              <p className="text-white/80 text-sm">
                Для лучшего эффекта, сосредоточьтесь на травматическом воспоминании, 
                одновременно следя глазами за движущимся объектом. Дышите глубоко и равномерно.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}