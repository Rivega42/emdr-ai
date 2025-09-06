'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Brain, Eye, Lock, Mail, User, Calendar, Shield, Check, AlertCircle } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    acceptTerms: false,
    acceptPrivacy: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name) {
      newErrors.name = 'Имя обязательно'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email обязателен'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен быть не менее 8 символов'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают'
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'Дата рождения обязательна'
    } else {
      const age = new Date().getFullYear() - new Date(formData.birthDate).getFullYear()
      if (age < 18) {
        newErrors.birthDate = 'Вы должны быть старше 18 лет'
      }
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Вы должны принять условия использования'
    }
    
    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = 'Вы должны принять политику конфиденциальности'
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
      // Сохраняем в localStorage для демо
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Проверяем, существует ли пользователь
      if (users.find(u => u.email === formData.email)) {
        setErrors({ email: 'Пользователь с таким email уже существует' })
        setIsLoading(false)
        return
      }
      
      // Добавляем нового пользователя
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password, // В реальном приложении используйте хеширование!
        birthDate: formData.birthDate,
        createdAt: new Date().toISOString()
      }
      
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      
      // Создаем сессию
      localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }))
      
      // Redirect to therapy page
      setTimeout(() => {
        router.push('/therapy')
      }, 1000)
      
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ general: 'Произошла ошибка при регистрации' })
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
            <Link href="/login" className="text-gray-700 hover:text-purple-600 transition">
              Уже есть аккаунт? Войти
            </Link>
          </div>
        </div>
      </nav>

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Начните путь к исцелению
              </h1>
              <p className="text-gray-600">
                Создайте аккаунт и получите доступ к персонализированной EMDR-терапии
              </p>
            </div>

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Иван Иванов"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

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
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Минимум 8 символов"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Подтвердите пароль
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Повторите пароль"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Birth Date Field */}
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Дата рождения
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                      errors.birthDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.birthDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
                )}
              </div>

              {/* Terms and Privacy */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-700">
                    Я принимаю{' '}
                    <Link href="/terms" className="text-purple-600 hover:underline">
                      условия использования
                    </Link>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="ml-7 text-sm text-red-600">{errors.acceptTerms}</p>
                )}

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="acceptPrivacy"
                    name="acceptPrivacy"
                    checked={formData.acceptPrivacy}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="acceptPrivacy" className="ml-3 text-sm text-gray-700">
                    Я принимаю{' '}
                    <Link href="/privacy" className="text-purple-600 hover:underline">
                      политику конфиденциальности
                    </Link>
                  </label>
                </div>
                {errors.acceptPrivacy && (
                  <p className="ml-7 text-sm text-red-600">{errors.acceptPrivacy}</p>
                )}
              </div>

              {/* Security Notice */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div className="text-sm text-purple-900">
                    <p className="font-semibold mb-1">Ваши данные в безопасности</p>
                    <p className="text-purple-700">
                      Мы используем передовые методы шифрования для защиты вашей личной информации. 
                      Все данные обрабатываются в соответствии с GDPR.
                    </p>
                  </div>
                </div>
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
                {isLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
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
                <span className="text-gray-700">Продолжить с Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <img src="/api/placeholder/20/20" alt="Apple" />
                <span className="text-gray-700">Продолжить с Apple</span>
              </button>
            </div>

            {/* Benefits */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Что вы получите после регистрации:
              </h3>
              <ul className="space-y-3">
                {[
                  'Персонализированные сессии EMDR-терапии',
                  'Отслеживание прогресса и аналитика',
                  'Безопасное хранение данных',
                  'Доступ к сообществу поддержки',
                  '3 бесплатные сессии каждый месяц'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}