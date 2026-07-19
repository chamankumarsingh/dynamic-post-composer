/**
 * CharacterCounter Component
 * Displays character count, word count, and estimated reading time
 */

import React from 'react'
import { getWordCount, getEstimatedReadTime } from '../utils/validators'

const CharacterCounter = ({
  text = '',
  selectedPlatforms = [],
  platformRules = {},
}) => {
  const charCount = text.length
  const wordCount = getWordCount(text)
  const readTime = getEstimatedReadTime(text)

  // Get the most restrictive character limit
  const limits = selectedPlatforms
    .map(p => platformRules[p]?.maxCharacters)
    .filter(Boolean)
  
  const minLimit = limits.length > 0 ? Math.min(...limits) : null

  return (
    <div className="space-y-3">
      {/* Main Character Count */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Character Count
          </span>
          <span className={`text-2xl font-bold ${
            minLimit && charCount > minLimit
              ? 'text-red-600 dark:text-red-400'
              : minLimit && charCount > platformRules[selectedPlatforms[0]]?.warningThreshold
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-green-600 dark:text-green-400'
          }`}>
            {charCount}
          </span>
        </div>

        {minLimit && (
          <>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  charCount > minLimit
                    ? 'bg-red-600'
                    : charCount > (platformRules[selectedPlatforms[0]]?.warningThreshold || minLimit)
                    ? 'bg-amber-600'
                    : 'bg-green-600'
                }`}
                style={{ width: `${Math.min(100, (charCount / minLimit) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {charCount} / {minLimit}
            </p>
          </>
        )}
      </div>

      {/* Word Count & Reading Time */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            Words
          </p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
            {wordCount}
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 border border-orange-200 dark:border-orange-800">
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            Read Time
          </p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">
            {readTime}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CharacterCounter
