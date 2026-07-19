/**
 * PlatformSelector Component
 * Allows users to select multiple platforms for posting
 */

import React from 'react'
import { platformRules, platformList } from '../utils/platformRules'

const PlatformSelector = ({ selectedPlatforms = [], onChange = () => {} }) => {
  const handlePlatformToggle = (platformId) => {
    if (selectedPlatforms.includes(platformId)) {
      onChange(selectedPlatforms.filter(p => p !== platformId))
    } else {
      onChange([...selectedPlatforms, platformId])
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Select Platforms
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {platformList.map(platformId => {
          const platform = platformRules[platformId]
          const isSelected = selectedPlatforms.includes(platformId)

          return (
            <button
              key={platformId}
              onClick={() => handlePlatformToggle(platformId)}
              className={`relative p-4 rounded-lg border-2 transition-all duration-200 transform ${
                isSelected
                  ? `${platform.color} border-opacity-100 shadow-lg scale-105`
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {/* Checkbox */}
              <div className="absolute top-2 right-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handlePlatformToggle(platformId)}
                  className="w-5 h-5 rounded cursor-pointer accent-blue-600"
                />
              </div>

              {/* Platform Info */}
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-bold">{platform.icon}</span>
                  <h3 className="font-semibold text-sm">{platform.name}</h3>
                </div>

                <p className={`text-xs line-clamp-2 ${
                  isSelected ? 'opacity-90' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {platform.description}
                </p>

                {/* Character Limit */}
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600 border-opacity-30">
                  <p className={`text-xs font-medium ${
                    isSelected ? 'opacity-90' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    📝 {platform.maxCharacters.toLocaleString()} chars
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {selectedPlatforms.length === 0 && (
        <p className="text-sm text-amber-600 dark:text-amber-400 mt-4 flex items-center gap-2">
          <span>⚠️</span>
          Select at least one platform to publish
        </p>
      )}
    </div>
  )
}

export default PlatformSelector
