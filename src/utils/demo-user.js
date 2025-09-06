// Demo user initialization script
// Run this in browser console on first load to create demo user

const createDemoUser = () => {
  const demoUser = {
    id: 'demo-user-001',
    name: 'Демо Пользователь',
    email: 'demo@example.com',
    password: 'demo1234',
    birthDate: '1990-01-01',
    createdAt: new Date().toISOString()
  }
  
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
  
  if (!existingUsers.find(u => u.email === demoUser.email)) {
    existingUsers.push(demoUser)
    localStorage.setItem('users', JSON.stringify(existingUsers))
    console.log('Demo user created successfully!')
    console.log('Email: demo@example.com')
    console.log('Password: demo1234')
  } else {
    console.log('Demo user already exists')
  }
}

// Auto-create demo user on page load
if (typeof window !== 'undefined') {
  createDemoUser()
}

export default createDemoUser