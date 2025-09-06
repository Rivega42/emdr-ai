# 🧠 EMDR-AI Therapy Assistant

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Rivega42/emdr-ai)

Revolutionary virtual therapy platform using EMDR (Eye Movement Desensitization and Reprocessing) with AI-powered emotion recognition.

## 🌟 Features

- **7 EMDR Movement Patterns**: Horizontal, Infinity, Butterfly, Spiral, Wave, Diagonal, Circular
- **Real-time Emotion Tracking**: Stress, Engagement, and Positivity levels
- **Adaptive Speed Control**: Adjustable from 0.3x to 2.0x speed
- **Beautiful UI**: Modern glassmorphic design with smooth animations
- **Privacy-First**: All emotion processing happens locally
- **Progressive Web App**: Works on desktop and mobile

## 🚀 Live Demo

Visit the live application: [https://emdr-ai.pages.dev](https://emdr-ai.pages.dev)

API Endpoint: [https://emdr-ai-api.workers.dev](https://emdr-ai-api.workers.dev)

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Framer Motion
- **Backend**: Cloudflare Workers, Hono Framework
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare KV & R2
- **Deployment**: Cloudflare Pages & Workers

## 📦 Installation

### Prerequisites

- Node.js 20+
- npm or yarn
- Cloudflare account
- Wrangler CLI

### Local Development

```bash
# Clone the repository
git clone https://github.com/Rivega42/emdr-ai.git
cd emdr-ai

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Deployment

This project auto-deploys to Cloudflare via GitHub Actions when you push to main branch.

Manual deployment:

```bash
# Deploy API to Workers
npm run deploy:api

# Deploy Frontend to Pages
npm run deploy:web
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://emdr-ai-api.workers.dev
MORPHCAST_KEY=your-morphcast-key # Optional, for emotion recognition
```

### GitHub Secrets

Add these secrets to your GitHub repository:

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

## 📱 Usage

1. **Select Pattern**: Choose from 7 different EMDR movement patterns
2. **Adjust Speed**: Use the slider to control movement speed
3. **Start Session**: Click the Start button to begin therapy
4. **Monitor Progress**: Watch real-time emotion metrics

## 🎯 EMDR Patterns

- **Horizontal**: Classic side-to-side movement
- **Infinity (∞)**: Figure-8 pattern for smooth tracking
- **Butterfly**: Mimics butterfly wing movements
- **Spiral**: Expanding and contracting circular motion
- **Wave**: Sinusoidal wave pattern
- **Diagonal**: Corner-to-corner movement
- **Circular**: Full circular rotation

## 🔐 Privacy & Security

- All emotion data is processed locally
- No personal data is stored without consent
- Secure HTTPS connections
- GDPR compliant

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- EMDR therapy method by Francine Shapiro
- Cloudflare for infrastructure
- Open source community

## ⚠️ Medical Disclaimer

This application is for educational and wellness purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.

---

Made with ❤️ by the EMDR-AI Team