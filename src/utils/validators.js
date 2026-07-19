/**
 * Validation utilities for post composition
 * Handles character count validation, media validation, and platform-specific rules
 */

import { platformRules } from './platformRules'

/**
 * Validates text content against character limits
 * Returns object with isValid, status, and message
 */
export const validateCharacters = (text, platform) => {
  const rules = platformRules[platform]
  const length = text.length

  if (length > rules.maxCharacters) {
    return {
      isValid: false,
      status: 'error',
      message: `❌ Character limit exceeded. ${length}/${rules.maxCharacters}`,
      percentage: Math.min(100, (length / rules.maxCharacters) * 100),
    }
  }

  if (length > rules.warningThreshold) {
    return {
      isValid: true,
      status: 'warning',
      message: `⚠️ Approaching limit. ${length}/${rules.maxCharacters}`,
      percentage: (length / rules.maxCharacters) * 100,
    }
  }

  return {
    isValid: true,
    status: 'success',
    message: `✅ Valid. ${length}/${rules.maxCharacters}`,
    percentage: (length / rules.maxCharacters) * 100,
  }
}

/**
 * Validates all selected platforms
 * Returns object mapping platform to validation result
 */
export const validateAllPlatforms = (text, selectedPlatforms, media) => {
  const results = {}

  selectedPlatforms.forEach(platform => {
    const charValidation = validateCharacters(text, platform)
    const rules = platformRules[platform]
    
    // Check media requirements
    let mediaValid = true
    let mediaMessage = ''

    if (rules.requiresMedia && media.length === 0) {
      mediaValid = false
      mediaMessage = `${charValidation.message.split('.')[0]}. Media required.`
    }

    results[platform] = {
      ...charValidation,
      isValid: charValidation.isValid && mediaValid,
      mediaMessage,
      mediaValid,
    }
  })

  return results
}

/**
 * Validates media files
 * Returns object with validation results
 */
export const validateMedia = (files, selectedPlatforms) => {
  const errors = []
  const warnings = []

  if (files.length === 0) {
    selectedPlatforms.forEach(platform => {
      const rules = platformRules[platform]
      if (rules.requiresMedia) {
        errors.push(`${rules.name} requires at least one media file`)
      }
    })
  }

  // Check max media per platform
  const images = files.filter(f => f.type === 'image')
  const videos = files.filter(f => f.type === 'video')

  selectedPlatforms.forEach(platform => {
    const rules = platformRules[platform]
    
    if (rules.maxImages && images.length > rules.maxImages) {
      errors.push(
        `${rules.name} supports maximum ${rules.maxImages} image(s). You have ${images.length}`
      )
    }

    if (rules.maxVideos && videos.length > rules.maxVideos) {
      errors.push(
        `${rules.name} supports maximum ${rules.maxVideos} video(s). You have ${videos.length}`
      )
    }

    // Check supported media types
    files.forEach(file => {
      if (!rules.supportedMedia.includes(file.type)) {
        errors.push(`${rules.name} doesn't support ${file.type} files`)
      }
    })
  })

  return { isValid: errors.length === 0, errors, warnings }
}

/**
 * Calculate word count from text
 */
export const getWordCount = (text) => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

/**
 * Calculate estimated reading time in seconds
 * Average reading speed: 200 words per minute
 */
export const getEstimatedReadTime = (text) => {
  const words = getWordCount(text)
  const readingSpeed = 200 / 60 // words per second
  const seconds = Math.ceil(words / readingSpeed)
  
  if (seconds < 1) return '< 1s'
  if (seconds < 60) return `${seconds}s`
  
  const minutes = Math.ceil(seconds / 60)
  return `${minutes}m`
}

/**
 * Extract hashtags from text
 */
export const getHashtags = (text) => {
  const hashtagRegex = /#\w+/g
  const hashtags = text.match(hashtagRegex) || []
  return [...new Set(hashtags)] // Remove duplicates
}

/**
 * Extract mentions from text
 */
export const getMentions = (text) => {
  const mentionRegex = /@\w+/g
  const mentions = text.match(mentionRegex) || []
  return [...new Set(mentions)] // Remove duplicates
}

/**
 * Suggest hashtags based on text content
 */
export const getSuggestedHashtags = (text) => {
  const commonHashtags = [
    '#Social',
    '#Media',
    '#Content',
    '#Digital',
    '#Marketing',
    '#Trending',
    '#Update',
    '#Share',
    '#Community',
    '#Engagement',
  ]
  
  return commonHashtags.slice(0, 5)
}
