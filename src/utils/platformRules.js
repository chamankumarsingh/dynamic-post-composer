/**
 * Platform-specific rules and constraints for post composition
 * Defines character limits, media restrictions, and warnings for each social media platform
 */

export const platformRules = {
  twitter: {
    name: 'X (Twitter)',
    icon: '𝕏',
    maxCharacters: 280,
    warningThreshold: 250,
    maxImages: 4,
    maxVideos: 1,
    supportedMedia: ['image', 'video'],
    requiresMedia: false,
    description: 'Perfect for quick thoughts and updates',
    color: 'bg-black text-white',
    borderColor: 'border-black dark:border-white',
  },
  facebook: {
    name: 'Facebook',
    icon: 'f',
    maxCharacters: 63206,
    warningThreshold: 60000,
    maxImages: null,
    maxVideos: null,
    supportedMedia: ['image', 'video'],
    requiresMedia: false,
    description: 'Long-form content with media support',
    color: 'bg-blue-600 text-white',
    borderColor: 'border-blue-600',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: 'in',
    maxCharacters: 3000,
    warningThreshold: 2800,
    maxImages: null,
    maxVideos: null,
    supportedMedia: ['image', 'video'],
    requiresMedia: false,
    description: 'Professional network updates',
    color: 'bg-blue-700 text-white',
    borderColor: 'border-blue-700',
  },
  instagram: {
    name: 'Instagram',
    icon: '📷',
    maxCharacters: 2200,
    warningThreshold: 2000,
    maxImages: 10,
    maxVideos: 1,
    supportedMedia: ['image', 'video'],
    requiresMedia: true,
    description: 'Visual-first platform for stories and content',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    borderColor: 'border-purple-500',
  },
  threads: {
    name: 'Threads',
    icon: '@',
    maxCharacters: 500,
    warningThreshold: 450,
    maxImages: 10,
    maxVideos: null,
    supportedMedia: ['image', 'video'],
    requiresMedia: false,
    description: 'Text-based conversations',
    color: 'bg-gray-900 text-white',
    borderColor: 'border-gray-900 dark:border-white',
  },
  mastodon: {
    name: 'Mastodon',
    icon: 'M',
    maxCharacters: 500,
    warningThreshold: 450,
    maxImages: 4,
    maxVideos: 1,
    supportedMedia: ['image'],
    requiresMedia: false,
    description: 'Decentralized social network',
    color: 'bg-purple-600 text-white',
    borderColor: 'border-purple-600',
  },
}

export const platformList = [
  'twitter',
  'facebook',
  'linkedin',
  'instagram',
  'threads',
  'mastodon',
]

/**
 * Get combined validation rules for multiple platforms
 * Returns the most restrictive rules across selected platforms
 */
export const getCombinedRules = (selectedPlatforms) => {
  if (selectedPlatforms.length === 0) {
    return null
  }

  const rules = selectedPlatforms.map(p => platformRules[p])
  const charLimits = rules.map(r => r.maxCharacters).filter(c => c !== null)
  
  return {
    maxCharacters: charLimits.length > 0 ? Math.min(...charLimits) : Infinity,
    warningThreshold: Math.min(...rules.map(r => r.warningThreshold)),
    requiresMedia: rules.some(r => r.requiresMedia),
  }
}
