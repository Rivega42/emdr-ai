# 🧠 EMDR-AI Therapy Assistant

[![Deploy to Cloudflare Pages](https://github.com/Rivega42/emdr-ai/actions/workflows/deploy.yml/badge.svg)](https://github.com/Rivega42/emdr-ai/actions/workflows/deploy.yml)

## 🌐 Live Demo
**[https://emdr-ai.pages.dev](https://emdr-ai.pages.dev)**

## 📖 Description
EMDR-AI Therapy Assistant is an adaptive virtual therapy platform that uses Eye Movement Desensitization and Reprocessing (EMDR) techniques combined with AI-powered emotion recognition to provide personalized therapeutic experiences.

## ✨ Features
- 🎯 **8 Different Movement Patterns**: Horizontal, Infinity, Butterfly, Spiral, Wave, Circular, Diagonal, Figure-8
- 🎨 **Customizable Visual Settings**: Colors, sizes, trail effects
- 📊 **Real-time Emotion Tracking**: Simulated emotion monitoring (ready for MorphCast integration)
- ⚡ **Adaptive Speed Control**: Adjusts based on emotional state
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🔒 **Privacy-First**: All processing happens locally in your browser

## 🚀 Quick Start

### Visit the Live Site
Simply open [https://emdr-ai.pages.dev](https://emdr-ai.pages.dev) in your browser.

### Run Locally
```bash
# Clone the repository
git clone https://github.com/Rivega42/emdr-ai.git
cd emdr-ai

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🎮 How to Use

1. **Register/Login**: Create an account or use demo credentials
2. **Select a Pattern**: Choose from 8 different movement patterns
3. **Adjust Speed**: Use the slider to control movement speed (0.3 - 2.0 Hz)
4. **Customize Visuals**: Pick your preferred color theme and object size
5. **Start Session**: Click "Start" to begin the EMDR session
6. **Monitor Progress**: Watch the emotional state panel for real-time feedback

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion, Canvas API
- **Authentication**: Local Storage (demo mode)
- **Hosting**: Cloudflare Pages
- **CI/CD**: GitHub Actions
- **Future Integration**: MorphCast SDK for real emotion recognition

## 📦 Project Structure

```
emdr-ai/
├── app/                 # Next.js App Router
│   ├── page.js         # Landing page
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   └── therapy/        # Therapy session page
├── public/             # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml  # Automated deployment
└── README.md          # This file
```

## 🔬 EMDR Patterns Explained

- **Horizontal**: Classic EMDR left-right movement
- **Infinity (∞)**: Smooth figure-eight pattern for gentle stimulation
- **Butterfly**: Wing-like movement mimicking natural patterns
- **Spiral**: Expanding and contracting circular motion
- **Wave**: Flowing sinusoidal movement
- **Circular**: Simple circular rotation
- **Diagonal**: Corner-to-corner movement
- **Figure-8**: Vertical figure-eight pattern

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Disclaimer

This application is for educational and research purposes only. It is not a replacement for professional mental health treatment. If you're experiencing mental health issues, please consult with a qualified healthcare professional.

## 🙏 Acknowledgments

- EMDR therapy methodology by Francine Shapiro
- Cloudflare for hosting infrastructure
- Open source community for inspiration

---

**Status**: ✅ Active | **Version**: 2.0.0 | **Last Updated**: September 2025
