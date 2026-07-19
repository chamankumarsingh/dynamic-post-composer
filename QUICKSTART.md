# 🚀 Quick Start Guide - Dynamic Post Composer

## ⚡ 5-Minute Setup

### 1. Installation
```bash
cd "c:\Users\Chaman Kumar\Documents\dynamic post composer"
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```

✅ **App opens automatically at http://localhost:5173**

---

## 🎯 How to Use

### Creating a Post

1. **Write Content**
   - Type your message in the textarea
   - See character count update in real-time

2. **Select Platforms**
   - Click checkboxes for platforms
   - See validation rules for each

3. **Add Media** (Optional)
   - Click "Upload Images" to add photos
   - Click "Upload Videos" to add videos
   - Click ✕ to remove files

4. **Review Validation**
   - Check validation panel for errors
   - Publish button enables when valid
   - See live preview for each platform

5. **Publish**
   - Click "🚀 Publish to X Platforms"
   - See success message
   - Draft clears automatically

---

## 📱 Platform Guide

### ✅ Always Valid
- **Facebook**: 63,206 characters
- **LinkedIn**: 3,000 characters
- **Threads**: 500 characters
- **Mastodon**: 500 characters
- **Twitter**: 280 characters
- **Instagram**: 2,200 characters (⚠️ needs media)

### ⚠️ Special Rules
- **Instagram Only**: Requires at least 1 image/video
- **Twitter**: Warning at 250 chars
- **LinkedIn**: Warning at 2,800 chars

---

## 🌙 Dark Mode
Click the moon/sun icon (top-right) to toggle dark mode. Your preference saves automatically.

---

## 💾 Auto-Save
Your draft saves automatically as you type. Reload the page to restore it.

---

## 🎨 Features

| Feature | How to Use |
|---------|-----------|
| **Character Counter** | See real-time count in right panel |
| **Word Count** | Auto-calculated below character count |
| **Reading Time** | Estimated at 200 words per minute |
| **Hashtag Suggestions** | Click to add suggested hashtags |
| **Preview** | See how post looks on each platform |
| **Media Upload** | Click upload buttons, select files |
| **Validation** | Red = error, Yellow = warning, Green = valid |
| **Reset** | Click 🔄 Reset button to clear all |

---

## 🐛 Troubleshooting

### Port 5173 Already in Use?
Vite automatically tries the next port (5174, 5175...)

### Lost Your Draft?
```javascript
// Restore from browser console
localStorage.getItem('postComposerDraft')
```

### Clear Everything?
```javascript
// In browser console
localStorage.clear()
```

### Dark Mode Not Persisting?
Check browser's LocalStorage is enabled

---

## 📦 Commands

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm preview      # Preview production build
```

---

## ✨ Tips & Tricks

1. **Multi-Select**: Hold Ctrl and click platforms to select multiple
2. **Keyboard Shortcuts**: Press Ctrl+A to select all text in textarea
3. **Emoji Support**: Paste emojis directly in content
4. **Hashtags**: Type # followed by word to auto-detect
5. **Mentions**: Type @ followed by username to auto-detect

---

## 🎯 Platform Tips

### Twitter
- Keep it under 250 to avoid warning
- Use images for engagement
- Perfect for quick updates

### LinkedIn
- Professional tone works best
- Link to articles or blog posts
- Share insights and industry news

### Instagram
- Add at least one image
- Use caption to tell a story
- Hashtags help discovery

### Facebook
- Long-form content is OK
- Videos perform well
- Engage with comments

### Threads
- Quick conversations
- Thread replies work best
- Keep it conversational

### Mastodon
- Respectful community
- Privacy-focused audience
- Federation-friendly

---

## 🎊 You're All Set!

Start composing posts and hit publish! Your posts will be validated in real-time and you'll see previews for each platform.

**Happy posting! 🎉**

---

**Need Help?**
- Check DOCUMENTATION.md for detailed info
- Check README.md for feature overview
- Code is well-commented for reference

---

*Updated: 2026-07-19*
