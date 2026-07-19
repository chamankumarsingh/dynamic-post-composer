/**
 * PreviewCard Component
 * Displays a live preview of the post with selected platforms and content
 */

import React from 'react'
import { platformRules } from '../utils/platformRules'
import { getWordCount, getHashtags, getMentions } from '../utils/validators'

const PreviewCard = ({
  text = '',
  selectedPlatforms = [],
  media = [],
  validationResults = {},
}) => {
  const hashtags = getHashtags(text)
  const mentions = getMentions(text)
  const wordCount = getWordCount(text)

  if (selectedPlatforms.length === 0) {
    return (
      <div className="text-center py-8 px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          👀 Select platforms to see preview
        </p>
      </div>
    )
  }

  const getValidationColor = (platformId) => {
    const validation = validationResults[platformId]
    if (!validation) return 'border-gray-300'
    if (!validation.isValid) return 'border-red-400'
    if (validation.status === 'warning') return 'border-amber-400'
    return 'border-green-400'
  }

  return (
    <div className="space-y-4">
      {/* Platforms Summary */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          📲 Publishing to {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedPlatforms.map(platformId => {
            const platform = platformRules[platformId]
            const validation = validationResults[platformId]
            return (
              <div
                key={platformId}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                  !validation?.isValid
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : validation?.status === 'warning'
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                }`}
              >
                <span>{platform.icon}</span>
                {platform.name}
              </div>
            )
          })}
        </div>
      </div>

      {/* Platform Previews */}
      <div className="space-y-3">
        {selectedPlatforms.map(platformId => {
          const platform = platformRules[platformId]
          const validation = validationResults[platformId]

          return (
            <div
              key={platformId}
              className={`rounded-lg border-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow ${getValidationColor(platformId)}`}
            >
              {/* Platform Header */}
              <div className={`${platform.color} p-3 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{platform.icon}</span>
                  <span className="font-semibold text-sm">{platform.name}</span>
                </div>
                <span className="text-xs opacity-75">Preview</span>
              </div>

              {/* Preview Content */}
              <div className="bg-white dark:bg-gray-800 p-4 space-y-3">
                {/* Post Text */}
                {text && (
                  <p className="text-sm text-gray-800 dark:text-gray-100 leading-relaxed whitespace-pre-wrap break-words line-clamp-5">
                    {text}
                  </p>
                )}

                {/* Media Files */}
                {media.length > 0 && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      📎 {media.length} file{media.length !== 1 ? 's' : ''}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {media.map(m => (
                        <div
                          key={m.id}
                          className="bg-gray-100 dark:bg-gray-700 p-2 rounded flex items-center gap-1.5"
                        >
                          <span className="text-lg">{m.type === 'image' ? '🖼️' : '🎥'}</span>
                          <span className="text-xs truncate text-gray-700 dark:text-gray-300">
                            {m.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Post Stats */}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-3">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Characters</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {text.length} / {platform.maxCharacters}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Words</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {wordCount}
                    </p>
                  </div>
                  {media.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Media</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {media.length}
                      </p>
                    </div>
                  )}
                </div>

                {/* Hashtags & Mentions */}
                {(hashtags.length > 0 || mentions.length > 0) && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1.5">
                    {hashtags.length > 0 && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 flex flex-wrap gap-1">
                        {hashtags.slice(0, 3).map(tag => (
                          <span key={tag} className="font-medium">
                            {tag}
                          </span>
                        ))}
                        {hashtags.length > 3 && (
                          <span className="text-gray-600 dark:text-gray-400">
                            +{hashtags.length - 3} more
                          </span>
                        )}
                      </p>
                    )}
                    {mentions.length > 0 && (
                      <p className="text-xs text-green-600 dark:text-green-400 flex flex-wrap gap-1">
                        {mentions.slice(0, 3).map(mention => (
                          <span key={mention} className="font-medium">
                            {mention}
                          </span>
                        ))}
                        {mentions.length > 3 && (
                          <span className="text-gray-600 dark:text-gray-400">
                            +{mentions.length - 3} more
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                )}

                {/* Validation Status */}
                {validation && (
                  <div className={`pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-xs font-semibold ${
                    !validation.isValid
                      ? 'text-red-600 dark:text-red-400'
                      : validation.status === 'warning'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-green-600 dark:text-green-400'
                  }`}>
                    <span>
                      {!validation.isValid ? '❌' : validation.status === 'warning' ? '⚠️' : '✅'}
                    </span>
                    {validation.message}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PreviewCard
