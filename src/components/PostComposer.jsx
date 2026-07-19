/**
 * PostComposer Component
 * Main component that orchestrates the entire post composition workflow
 */

import React, { useState, useEffect } from 'react'
import PlatformSelector from './PlatformSelector'
import CharacterCounter from './CharacterCounter'
import ValidationMessages from './ValidationMessages'
import MediaUploader from './MediaUploader'
import PreviewCard from './PreviewCard'
import { platformRules } from '../utils/platformRules'
import { validateAllPlatforms, getSuggestedHashtags } from '../utils/validators'

const PostComposer = ({ darkMode = false, onDarkModeToggle = () => {} }) => {
  // State Management
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [media, setMedia] = useState([])
  const [validationResults, setValidationResults] = useState({})
  const [suggestedHashtags, setSuggestedHashtags] = useState([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [publishSuccess, setPublishSuccess] = useState(false)

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('postComposerDraft')
    if (savedDraft) {
      try {
        const { content: savedContent, platforms: savedPlatforms } = JSON.parse(savedDraft)
        setContent(savedContent)
        setSelectedPlatforms(savedPlatforms)
      } catch (error) {
        console.error('Failed to load draft:', error)
      }
    }
  }, [])

  // Auto-save to LocalStorage
  useEffect(() => {
    if (content.trim() || selectedPlatforms.length > 0) {
      const draft = JSON.stringify({
        content,
        platforms: selectedPlatforms,
      })
      localStorage.setItem('postComposerDraft', draft)
    }
  }, [content, selectedPlatforms])

  // Real-time validation
  useEffect(() => {
    if (selectedPlatforms.length > 0) {
      const results = validateAllPlatforms(content, selectedPlatforms, media)
      setValidationResults(results)
    }
  }, [content, selectedPlatforms, media])

  // Update suggested hashtags
  useEffect(() => {
    if (content.trim()) {
      setSuggestedHashtags(getSuggestedHashtags(content))
    }
  }, [content])

  // Check if all validations pass
  const isReadyToPublish = selectedPlatforms.length > 0 &&
    selectedPlatforms.every(p => validationResults[p]?.isValid ?? true)

  // Handle content change
  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  // Handle media operations
  const handleMediaAdd = (mediaItem) => {
    setMedia([...media, mediaItem])
  }

  const handleMediaRemove = (mediaId) => {
    setMedia(media.filter(m => m.id !== mediaId))
  }

  // Handle publish (dummy implementation)
  const handlePublish = () => {
    if (!isReadyToPublish) return

    // Simulate publishing
    setPublishSuccess(true)
    setTimeout(() => {
      setPublishSuccess(false)
      handleReset()
    }, 2000)
  }

  // Handle reset
  const handleReset = () => {
    setContent('')
    setSelectedPlatforms([])
    setMedia([])
    setValidationResults({})
    localStorage.removeItem('postComposerDraft')
  }

  // Add suggested hashtag
  const addHashtag = (hashtag) => {
    setContent(prev => prev + ' ' + hashtag)
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                ✍️ Post Composer
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Create and publish to multiple platforms simultaneously
              </p>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onDarkModeToggle}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Success Message */}
          {publishSuccess && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 rounded-lg flex items-center gap-3 animate-pulse">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-green-800 dark:text-green-200">
                  Post published successfully!
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Your post has been sent to {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          )}

          {/* Main Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Editor */}
            <div className="lg:col-span-2 space-y-6">
              {/* Glassmorphic Card */}
              <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6 space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Create New Post
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Compose your message and select platforms to publish
                  </p>
                </div>

                {/* Content Textarea */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    Post Content
                  </label>
                  <textarea
                    value={content}
                    onChange={handleContentChange}
                    placeholder="What's on your mind? Share your thoughts, news, or updates..."
                    className="w-full h-40 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 resize-none transition-colors"
                  />
                </div>

                {/* Platform Selector */}
                <div>
                  <PlatformSelector
                    selectedPlatforms={selectedPlatforms}
                    onChange={setSelectedPlatforms}
                  />
                </div>

                {/* Media Uploader */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    Media Files
                  </label>
                  <MediaUploader
                    media={media}
                    onMediaAdd={handleMediaAdd}
                    onMediaRemove={handleMediaRemove}
                  />
                </div>

                {/* Hashtag Suggestions */}
                {suggestedHashtags.length > 0 && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      💡 Suggested Hashtags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedHashtags.map(hashtag => (
                        <button
                          key={hashtag}
                          onClick={() => addHashtag(hashtag)}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors"
                        >
                          {hashtag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handlePublish}
                    disabled={!isReadyToPublish}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                      isReadyToPublish
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    🚀 Publish to {selectedPlatforms.length} Platform{selectedPlatforms.length !== 1 ? 's' : ''}
                  </button>

                  <button
                    onClick={handleReset}
                    className="py-3 px-6 rounded-lg font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Validation */}
            <div className="space-y-6">
              {/* Character Counter */}
              <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  📊 Content Stats
                </h3>
                <CharacterCounter
                  text={content}
                  selectedPlatforms={selectedPlatforms}
                  platformRules={platformRules}
                />
              </div>

              {/* Validation Messages */}
              {selectedPlatforms.length > 0 && (
                <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    ✓ Validation
                  </h3>
                  <ValidationMessages
                    validationResults={validationResults}
                    selectedPlatforms={selectedPlatforms}
                    platformRules={platformRules}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          {selectedPlatforms.length > 0 && (
            <div className="mt-8">
              <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  👁️ Platform Previews
                </h3>
                <PreviewCard
                  text={content}
                  selectedPlatforms={selectedPlatforms}
                  media={media}
                  validationResults={validationResults}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostComposer
