/**
 * MediaUploader Component
 * Handles image and video uploads with file preview
 */

import React, { useRef } from 'react'

const MediaUploader = ({ media = [], onMediaAdd = () => {}, onMediaRemove = () => {} }) => {
  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)

  const handleFileSelect = (event, type) => {
    const files = Array.from(event.target.files || [])
    
    files.forEach(file => {
      const mediaItem = {
        id: `${type}-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        type: type,
        file: file,
      }
      onMediaAdd(mediaItem)
    })

    // Reset input
    event.target.value = ''
  }

  const images = media.filter(m => m.type === 'image')
  const videos = media.filter(m => m.type === 'video')

  return (
    <div className="space-y-4">
      {/* Upload Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Image Upload */}
        <button
          onClick={() => imageInputRef.current?.click()}
          className="p-4 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
        >
          <input
            ref={imageInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e, 'image')}
            className="hidden"
          />
          
          <div className="text-center">
            <p className="text-2xl mb-2">🖼️</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Upload Images
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              PNG, JPG, GIF (Max 10)
            </p>
          </div>
        </button>

        {/* Video Upload */}
        <button
          onClick={() => videoInputRef.current?.click()}
          className="p-4 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 group"
        >
          <input
            ref={videoInputRef}
            type="file"
            multiple
            accept="video/*"
            onChange={(e) => handleFileSelect(e, 'video')}
            className="hidden"
          />
          
          <div className="text-center">
            <p className="text-2xl mb-2">🎥</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
              Upload Videos
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              MP4, WebM, MOV (Max 1)
            </p>
          </div>
        </button>
      </div>

      {/* Media List */}
      {media.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Attached Media ({media.length})
          </h3>

          {images.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                📷 Images ({images.length})
              </p>
              <div className="space-y-2">
                {images.map(m => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-lg flex-shrink-0">🖼️</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                          {m.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {m.size} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onMediaRemove(m.id)}
                      className="ml-2 p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400 transition-colors"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {videos.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                🎥 Videos ({videos.length})
              </p>
              <div className="space-y-2">
                {videos.map(m => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-lg flex-shrink-0">🎥</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                          {m.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {m.size} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onMediaRemove(m.id)}
                      className="ml-2 p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400 transition-colors"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MediaUploader
