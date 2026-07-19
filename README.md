# 🚀 Dynamic Post Composer

A modern, responsive React.js application for composing and publishing social media posts across multiple platforms with real-time validation and platform-specific constraints.

## ✨ Features

### Core Features
- ✍️ **Multi-Platform Support**: X (Twitter), Facebook, LinkedIn, Instagram, Threads, and Mastodon
- 🎯 **Real-time Validation**: Instant character count and platform-specific constraint checking
- 🎨 **Responsive Design**: Beautiful UI that works seamlessly on desktop, tablet, and mobile
- 🌙 **Dark Mode Toggle**: Switch between light and dark themes
- 💾 **Auto-Save**: Automatic draft saving to browser's LocalStorage
- 🎥 **Media Upload**: Support for images and videos with file preview
- 📊 **Content Statistics**: Character count, word count, and estimated reading time

### Advanced Features
- 🏷️ **Hashtag Detection**: Automatic extraction and suggestions
- @️ **Mention Detection**: Automatic @ mention recognition
- ⚠️ **Smart Validation**: Per-platform validation messages with color-coded status
- 📺 **Live Preview**: Real-time preview for each selected platform
- 🎭 **Glassmorphism UI**: Modern design with blur and gradient effects
- 🔄 **Reset Functionality**: Clear all content and start fresh

### Platform-Specific Rules

#### X (Twitter)
- Maximum 280 characters
- Warning after 250 characters
- Supports up to 4 images and 1 video

#### Facebook
- Maximum 63,206 characters
- Unlimited media support
- Perfect for long-form content

#### LinkedIn
- Maximum 3,000 characters
- Warning after 2,800 characters
- Professional network optimization

#### Instagram
- Maximum 2,200 characters
- Warning after 2,000 characters
- **Requires at least one media file**
- Supports up to 10 images and 1 video

#### Threads
- Maximum 500 characters
- Warning after 450 characters
- Text-based conversation format

#### Mastodon
- Maximum 500 characters
- Warning after 450 characters
- Decentralized network support

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project directory**
```bash
cd "dynamic post composer"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── PostComposer.jsx          # Main orchestrator component
│   ├── PlatformSelector.jsx      # Platform selection interface
│   ├── CharacterCounter.jsx      # Statistics and metrics
│   ├── ValidationMessages.jsx    # Real-time validation display
│   ├── MediaUploader.jsx         # File upload handler
│   └── PreviewCard.jsx           # Live platform previews
├── utils/
│   ├── platformRules.js          # Platform constraints and rules
│   └── validators.js             # Validation logic and utilities
├── App.jsx                       # Main app component
├── main.jsx                      # React entry point
└── index.css                     # Global styles with Tailwind

Configuration files:
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

## 🎨 Design Features

### Modern UI Elements
- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Gradients**: Beautiful color transitions
- **Smooth Animations**: Transitions for all interactive elements
- **Color Coding**:
  - 🟢 Green: Valid content
  - 🟡 Yellow: Warning (approaching limits)
  - 🔴 Red: Error (exceeded limits)

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Technical Stack

- **Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.3
- **PostCSS**: Autoprefixer integration
- **Package Manager**: npm

## 💡 Usage Guide

### Creating a Post

1. **Write Content**: Type your message in the textarea
2. **Select Platforms**: Choose one or multiple platforms
3. **Add Media** (Optional): Upload images or videos
4. **Review Validation**: Check the validation panel for any issues
5. **Preview**: See how your post looks on each platform
6. **Publish**: Click the publish button to send

### Understanding Validation

The validator shows:
- ✅ **Success**: Content meets all requirements
- ⚠️ **Warning**: Approaching character limit
- ❌ **Error**: Exceeded limit or missing required fields

### Auto-Save Feature

Your draft is automatically saved to browser storage when you:
- Type new content
- Change platform selection

To restore: Reload the page to see your saved draft.

### Dark Mode

Click the moon/sun icon in the top-right corner to toggle dark mode. Your preference is saved automatically.

## 🔐 LocalStorage Keys

- `postComposerDraft`: Saves content and selected platforms
- `darkMode`: Saves dark mode preference

## 🚀 Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

## 🔍 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## 📝 Code Quality

- ✅ Functional React components with Hooks
- ✅ Comprehensive comments for complex logic
- ✅ Reusable utility functions
- ✅ No external dependencies for core functionality
- ✅ Clean folder structure
- ✅ Responsive design principles

## 🎯 Future Enhancements

- Emoji picker integration
- Content scheduling
- Team collaboration features
- Analytics integration
- Drag-and-drop media uploads
- Image cropping tools
- URL preview cards

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm preview
```

### Key Features Implementation

- **Validation**: Located in `src/utils/validators.js`
- **Platform Rules**: Located in `src/utils/platformRules.js`
- **Main Logic**: Orchestrated in `src/components/PostComposer.jsx`

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📞 Support

For issues or questions, please refer to the code comments and documentation within each component.

---

**Built with ❤️ for social media enthusiasts and developers**

Happy posting! 🎉
