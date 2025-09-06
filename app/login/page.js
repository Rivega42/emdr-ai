'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Brain, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email обязателен'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      // Получаем пользователей из localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Ищем пользователя
      const user = users.find(u => u.email === formData.email && u.password === formData.password)
      
      if (!user) {
        setErrors({ general: 'Неверный email или пароль' })
        setIsLoading(false)
        return
      }
      
      // Создаем сессию
      const session = {
        id: user.id,
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString()
      }
      
      if (formData.rememberMe) {
        // Сохраняем на 30 дней
        localStorage.setItem('currentUser', JSON.stringify(session))
        localStorage.setItem('sessionExpiry', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString())
      } else {
        // Сохраняем только на сессию
        sessionStorage.setItem('currentUser', JSON.stringify(session))
      }
      
      // Redirect to therapy page
      setTimeout(() => {
        router.push('/therapy')
      }, 1000)
      
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ general: 'Произошла ошибка при входе' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EMDR-AI
              </span>
            </Link>
            <Link href="/register" className="text-gray-700 hover:text-purple-600 transition">
              Нет аккаунта? Зарегистрироваться
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                С возвращением!
              </h1>
              <p className="text-gray-600">
                Войдите в свой аккаунт для продолжения терапии
              </p>
            </div>

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ivan@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Пароль
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Введите пароль"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                    Запомнить меня
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-purple-600 hover:underline">
                  Забыли пароль?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-lg text-white font-semibold transition ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg'
                }`}
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">или</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <img src="/api/placeholder/20/20" alt="Google" />
                <span className="text-gray-700">Войти с Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <img src="/api/placeholder/20/20" alt="Apple" />
                <span className="text-gray-700">Войти с Apple</span>
              </button>
            </div>

            {/* Demo Account Notice */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900 font-semibold mb-1">Демо-аккаунт для тестирования:</p>
              <p className="text-sm text-blue-700">
                Email: demo@example.com<br/>
                Пароль: demo1234
              </p>
            </div>
          </motion.div>

          {/* Additional Links */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Нажимая "Войти", вы соглашаетесь с нашими{' '}
              <Link href="/terms" className="text-purple-600 hover:underline">
                условиями использования
              </Link>{' '}
              и{' '}
              <Link href="/privacy" className="text-purple-600 hover:underline">
                политикой конфиденциальности
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}