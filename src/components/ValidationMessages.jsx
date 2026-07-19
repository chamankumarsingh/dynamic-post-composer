/**
 * ValidationMessages Component
 * Displays validation status and messages for all selected platforms
 */

import React from 'react'

const ValidationMessages = ({ validationResults = {}, selectedPlatforms = [], platformRules = {} }) => {
  if (selectedPlatforms.length === 0) {
    return null
  }

  const allValid = selectedPlatforms.every(
    p => validationResults[p]?.isValid ?? true
  )

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return '✅'
      case 'warning':
        return '⚠️'
      case 'error':
        return '❌'
      default:
        return '•'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'warning':
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
      case 'error':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
    }
  }

  return (
    <div className="space-y-3">
      {/* Overall Status */}
      <div className={`p-4 rounded-lg border-2 ${
        allValid
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      }`}>
        <p className={`text-sm font-semibold flex items-center gap-2 ${
          allValid ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
        }`}>
          <span>{allValid ? '✅' : '❌'}</span>
          {allValid ? 'All platforms valid!' : 'Fix errors before publishing'}
        </p>
      </div>

      {/* Per-Platform Validation */}
      <div className="space-y-2">
        {selectedPlatforms.map(platformId => {
          const validation = validationResults[platformId] || {
            isValid: true,
            status: 'success',
            message: 'Valid',
          }
          const platform = platformRules[platformId]

          return (
            <div
              key={platformId}
              className={`p-3 rounded-lg border border-l-4 ${getStatusColor(validation.status)}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{getStatusIcon(validation.status)}</span>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold mb-1">{platform?.name}</p>
                  
                  {/* Character Count Message */}
                  <p className="text-xs leading-relaxed">
                    {validation.message}
                  </p>

                  {/* Media Message */}
                  {validation.mediaMessage && (
                    <p className="text-xs leading-relaxed mt-1 opacity-90">
                      {validation.mediaMessage}
                    </p>
                  )}

                  {/* Media Requirements */}
                  {platform?.requiresMedia && validation.mediaValid && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      📦 Media attached
                    </p>
                  )}
                </div>

                {/* Character Percentage Indicator */}
                {validation.percentage !== undefined && (
                  <div className="text-right">
                    <p className="text-xs font-bold whitespace-nowrap">
                      {Math.round(validation.percentage)}%
                    </p>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {validation.percentage !== undefined && (
                <div className="mt-2 w-full bg-gray-300 dark:bg-gray-600 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      validation.status === 'error'
                        ? 'bg-red-600'
                        : validation.status === 'warning'
                        ? 'bg-amber-600'
                        : 'bg-green-600'
                    }`}
                    style={{ width: `${Math.min(100, validation.percentage)}%` }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ValidationMessages
