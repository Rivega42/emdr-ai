import './globals.css'

export const metadata = {
  title: 'EMDR-AI Therapy Assistant',
  description: 'Revolutionary virtual therapy platform using AI and emotion recognition',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}