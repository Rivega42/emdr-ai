'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, Eye, Heart, Shield, Users, Zap, Star, ChevronRight, Play, Check, Menu, X } from 'lucide-react'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  return (
    <>
      {/* SEO Meta будет в layout.js */}
      
      {/* Header/Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EMDR-AI
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition">
                Как это работает
              </Link>
              <Link href="#benefits" className="text-gray-700 hover:text-purple-600 transition">
                Преимущества
              </Link>
              <Link href="#science" className="text-gray-700 hover:text-purple-600 transition">
                Наука
              </Link>
              <Link href="#pricing" className="text-gray-700 hover:text-purple-600 transition">
                Тарифы
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-purple-600 transition">
                Войти
              </Link>
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition"
              >
                Начать бесплатно
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link href="#how-it-works" className="block text-gray-700">Как это работает</Link>
              <Link href="#benefits" className="block text-gray-700">Преимущества</Link>
              <Link href="#science" className="block text-gray-700">Наука</Link>
              <Link href="#pricing" className="block text-gray-700">Тарифы</Link>
              <Link href="/login" className="block text-gray-700">Войти</Link>
              <Link href="/register" className="block bg-purple-600 text-white text-center py-2 rounded-full">
                Начать бесплатно
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center bg-purple-100 rounded-full px-4 py-2 mb-6">
                <Star className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-sm text-purple-800">Одобрено ВОЗ • Научно доказано</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Революция в терапии травм с помощью
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> ИИ и EMDR</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Получите доступ к передовой EMDR-терапии 24/7. 
                Наша платформа использует искусственный интеллект для персонализированной помощи 
                при тревоге, ПТСР и стрессе.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/register"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition"
                >
                  Начать терапию бесплатно
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center justify-center bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold border-2 border-purple-200 hover:bg-purple-50 transition"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Смотреть видео
                </button>
              </div>
              
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900">10,000+</div>
                  <div className="text-sm text-gray-600">Активных пользователей</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Рейтинг удовлетворенности</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">85%</div>
                  <div className="text-sm text-gray-600">Снижение симптомов</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img 
                  src="/api/placeholder/600/600" 
                  alt="EMDR-AI Therapy Interface"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 rounded-2xl"></div>
              </div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <img src="/api/placeholder/120/40" alt="WHO" className="h-10" />
            <img src="/api/placeholder/120/40" alt="APA" className="h-10" />
            <img src="/api/placeholder/120/40" alt="NHS" className="h-10" />
            <img src="/api/placeholder/120/40" alt="Stanford" className="h-10" />
            <img src="/api/placeholder/120/40" alt="MIT" className="h-10" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Как работает EMDR-AI терапия
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Три простых шага к эмоциональному благополучию
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Eye className="h-8 w-8" />,
                title: "1. Оценка состояния",
                description: "ИИ анализирует ваше эмоциональное состояние через камеру, определяя уровень стресса и тревоги"
              },
              {
                icon: <Brain className="h-8 w-8" />,
                title: "2. Персональная терапия",
                description: "Система подбирает оптимальные паттерны движения глаз и интенсивность сессии под ваши потребности"
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "3. Отслеживание прогресса",
                description: "Мониторинг улучшений и адаптация программы для максимальной эффективности"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Преимущества нашего подхода
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <Shield className="h-6 w-6" />,
                    title: "Полная конфиденциальность",
                    description: "Все данные обрабатываются локально на вашем устройстве"
                  },
                  {
                    icon: <Zap className="h-6 w-6" />,
                    title: "Мгновенный доступ",
                    description: "Терапия доступна 24/7 без записи и ожидания"
                  },
                  {
                    icon: <Users className="h-6 w-6" />,
                    title: "Поддержка сообщества",
                    description: "Доступ к группам поддержки и экспертам"
                  },
                  {
                    icon: <Brain className="h-6 w-6" />,
                    title: "ИИ-персонализация",
                    description: "Адаптация под ваши уникальные потребности в реальном времени"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Что говорят исследования
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">90%</div>
                  <p className="text-gray-700">пациентов отмечают значительное улучшение после 3-6 сессий</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">77%</div>
                  <p className="text-gray-700">полное избавление от симптомов ПТСР после курса терапии</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                  <p className="text-gray-700">безопасность метода подтверждена клиническими испытаниями</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section id="science" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Научная основа EMDR
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Метод, признанный Всемирной организацией здравоохранения
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Что такое EMDR?
                </h3>
                <p className="text-gray-600 mb-6">
                  EMDR (Eye Movement Desensitization and Reprocessing) - это психотерапевтический метод, 
                  разработанный Франсин Шапиро в 1987 году. Метод основан на билатеральной стимуляции 
                  мозга через движения глаз, что помогает переработать травматические воспоминания.
                </p>
                <ul className="space-y-3">
                  {[
                    "Одобрен ВОЗ для лечения ПТСР",
                    "Более 30 лет клинических исследований",
                    "Эффективность 77-90% при травмах",
                    "Работает быстрее традиционной терапии"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Как мы улучшили метод
                </h3>
                <p className="text-gray-600 mb-6">
                  Наша платформа объединяет классический EMDR с передовыми технологиями ИИ 
                  для создания персонализированного терапевтического опыта.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="text-purple-600 font-bold text-xl">01</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Распознавание эмоций</h4>
                      <p className="text-gray-600 text-sm">ИИ анализирует микровыражения лица для точной оценки состояния</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-purple-600 font-bold text-xl">02</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Адаптивные паттерны</h4>
                      <p className="text-gray-600 text-sm">8 различных паттернов движения для разных типов травм</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-purple-600 font-bold text-xl">03</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Мультисенсорная стимуляция</h4>
                      <p className="text-gray-600 text-sm">Комбинация визуальных, аудио и тактильных стимулов</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Истории выздоровления
            </h2>
            <p className="text-xl text-gray-600">
              Реальные отзывы наших пользователей
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Анна М.",
                age: "32 года",
                condition: "Тревожное расстройство",
                text: "После 3 месяцев использования платформы я наконец-то могу спокойно спать. Приступы паники ушли полностью.",
                rating: 5
              },
              {
                name: "Михаил К.",
                age: "28 лет",
                condition: "ПТСР",
                text: "Военная травма преследовала меня годами. EMDR-AI помог там, где традиционная терапия не справлялась.",
                rating: 5
              },
              {
                name: "Елена В.",
                age: "45 лет",
                condition: "Депрессия",
                text: "Удобство использования дома в любое время - это спасение для работающей мамы. Чувствую себя намного лучше.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.age} • {testimonial.condition}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Выберите ваш план
            </h2>
            <p className="text-xl text-gray-600">
              Начните бесплатно, обновитесь когда будете готовы
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Бесплатный",
                price: "0₽",
                period: "навсегда",
                features: [
                  "3 сессии в месяц",
                  "Базовые паттерны EMDR",
                  "Отслеживание прогресса",
                  "Поддержка по email"
                ],
                cta: "Начать бесплатно",
                featured: false
              },
              {
                name: "Премиум",
                price: "2,990₽",
                period: "в месяц",
                features: [
                  "Безлимитные сессии",
                  "Все паттерны EMDR",
                  "ИИ-персонализация",
                  "Приоритетная поддержка",
                  "Экспорт отчетов",
                  "Интеграция с носимыми устройствами"
                ],
                cta: "Попробовать 7 дней бесплатно",
                featured: true
              },
              {
                name: "Терапевт",
                price: "9,990₽",
                period: "в месяц",
                features: [
                  "Все из Премиум",
                  "До 10 пациентов",
                  "Панель терапевта",
                  "Видео-консультации",
                  "Клинические отчеты",
                  "API доступ"
                ],
                cta: "Связаться с нами",
                featured: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-8 ${
                  plan.featured ? 'ring-4 ring-purple-600 shadow-xl scale-105' : 'shadow-lg'
                }`}
              >
                {plan.featured && (
                  <div className="bg-purple-600 text-white text-sm font-semibold py-1 px-3 rounded-full inline-block mb-4">
                    Популярный
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block text-center py-3 px-6 rounded-full font-semibold transition ${
                    plan.featured
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Начните путь к исцелению сегодня
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам людей, которые уже преодолели свои травмы с помощью EMDR-AI
          </p>
          <Link
            href="/register"
            className="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition"
          >
            Начать бесплатную пробную версию
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="text-white/80 mt-4">
            Без кредитной карты • Отмена в любое время
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold text-white">EMDR-AI</span>
              </div>
              <p className="text-sm">
                Революционная платформа виртуальной терапии на основе EMDR и искусственного интеллекта.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="hover:text-white transition">Возможности</Link></li>
                <li><Link href="/science" className="hover:text-white transition">Наука</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Тарифы</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Компания</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white transition">О нас</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Блог</Link></li>
                <li><Link href="/careers" className="hover:text-white transition">Карьера</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Контакты</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Правовая информация</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-white transition">Конфиденциальность</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Условия использования</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
                <li><Link href="/disclaimer" className="hover:text-white transition">Отказ от ответственности</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">© 2025 EMDR-AI. Все права защищены.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="hover:text-white transition">Twitter</Link>
                <Link href="#" className="hover:text-white transition">LinkedIn</Link>
                <Link href="#" className="hover:text-white transition">Facebook</Link>
                <Link href="#" className="hover:text-white transition">Instagram</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full p-8">
            <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
              <Play className="h-16 w-16 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}