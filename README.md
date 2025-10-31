# X Glass Card Generator 🎨

Transform your X (Twitter) profile into stunning glass card designs with AI-powered generation.

## ✨ Features

- **AI-Powered Generation**: Uses Google's Gemini 2.5 Flash Image model to generate hyper-realistic 3D glass cards
- **Photorealistic Output**: Creates stunning 682x1024 glass cards held in hand with cinematic lighting
- **Professional White Theme**: Clean, minimalist design with black accents and borders
- **Two-Column Layout**: Upload interface with live preview example side-by-side
- **Multiple Input Methods**: Upload files or paste images directly from clipboard (Ctrl+V)
- **Global Paste Support**: Press Ctrl+V anywhere on the page to paste screenshots
- **Fixed Dimensions**: All images constrained to 682x1024 ratio for consistency
- **Rate Limiting**: 3 generations per day per device (automatically disabled in dev mode)
- **Buy Me Chai Button**: Prominently placed Razorpay payment link for donations
- **Maintenance Mode**: Easy toggle for maintenance periods
- **Error Handling**: Comprehensive error messages and validation
- **Responsive Design**: Works seamlessly on all devices with best UX practices
- **Reference Image Support**: Uses your custom reference design as a template
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- **Google AI Studio API key** (Required - Get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd glass-card-maker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```env
   VITE_GOOGLE_AI_API_KEY=your_api_key_here
   VITE_MAINTENANCE_MODE=false
   VITE_RAZORPAY_LINK=https://razorpay.me/@yourusername
   ```

4. **Add reference image**
   Place your reference glass card image as `reference-card.png` in the `public/` folder. This image will be used as the design template for AI generation.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Build for Production

```bash
npm run build
npm run preview
```

## 📖 How It Works

1. **Reference Image**: The AI uses your reference glass card design (from `public/reference-card.png`) as a template
2. **Upload**: Take a screenshot of any X (Twitter) profile page (dark mode recommended)
3. **AI Processing**: Google's Gemini 2.5 Flash Image model analyzes both images
4. **Generate**: AI creates a hyper-realistic 3D glass card matching the reference design with the profile data
5. **Download**: Save your custom glass card as a high-resolution PNG image

## 🎨 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **AI**: Google Gemini 2.5 Flash Image (@google/genai)
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🔧 Configuration

### Reference Image

Place your reference glass card design as `public/reference-card.png`. This image should:
- Show the desired glass card style, layout, and aesthetics
- Have clear text hierarchy and icon positioning
- Demonstrate the glassmorphism effect you want to replicate
- Be high quality (PNG format recommended)

The AI will use this as a template and replicate its design with the user's profile data.

### Maintenance Mode

Set `VITE_MAINTENANCE_MODE=true` in your `.env` file to enable the maintenance page.

### Rate Limiting

The app limits users to 3 generations per day. This is stored in localStorage and resets daily.

### Customization

- **Footer**: Edit `src/components/Footer.tsx` to update social links
- **Colors**: Modify Tailwind theme in `src/index.css`
- **Rate Limit**: Change `MAX_USES_PER_DAY` in `src/lib/rateLimit.ts`
- **Reference Image**: Replace `public/reference-card.png` with your own design

## 📁 Project Structure

```
glass-card-maker/
├── public/
│   └── reference-card.png   # Reference design for AI
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── ImageUpload.tsx  # Upload interface
│   │   ├── DownloadButton.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── MaintenanceMode.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── utils.ts         # Utility functions
│   │   ├── rateLimit.ts     # Rate limiting logic
│   │   └── errorHandler.ts  # Error handling
│   ├── services/
│   │   └── aiService.ts     # Google Gemini AI integration
│   ├── App.tsx              # Main app component
│   └── index.css            # Global styles
├── .env.example             # Environment variables template
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Developed by **ABC**

- [Twitter/X](https://twitter.com/abc)
- [GitHub](https://github.com/abc)
- [LinkedIn](https://linkedin.com/in/abc)

## 🙏 Acknowledgments

- shadcn/ui for the beautiful component library
- Tesseract.js for OCR capabilities
- The React and Vite teams for excellent tooling
