const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/drive/v3';

// Debug logging
console.log('🔑 API_KEY status:', {
  exists: !!API_KEY,
  type: typeof API_KEY,
  length: API_KEY?.length,
  firstChars: API_KEY?.substring(0, 10)
});

/**
 * List files in a Google Drive folder
 * @param {string} folderId - The Google Drive folder ID
 * @returns {Promise<Array>} Array of files and folders
 */
export async function listFilesInFolder(folderId) {
  try {
    console.log('📂 Attempting to list files for folder:', folderId);
    console.log('🔑 Using API_KEY:', API_KEY ? 'Present' : 'Missing');
    
    if (!API_KEY) {
      console.error('❌ Google Drive API key is not configured');
      return [];
    }

    const response = await fetch(
      `${BASE_URL}/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,size,createdTime,modifiedTime,iconLink,webViewLink,thumbnailLink)`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error:', response.status, errorData);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error('Error fetching files from Google Drive:', error);
    return [];
  }
}

/**
 * Get file metadata
 * @param {string} fileId - The Google Drive file ID
 * @returns {Promise<Object>} File metadata
 */
export async function getFileMetadata(fileId) {
  try {
    const response = await fetch(
      `${BASE_URL}/files/${fileId}?key=${API_KEY}&fields=id,name,mimeType,size,createdTime,modifiedTime,webViewLink,thumbnailLink`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching file metadata:', error);
    return null;
  }
}

/**
 * Check if item is a folder
 * @param {string} mimeType - The MIME type of the item
 * @returns {boolean}
 */
export function isFolder(mimeType) {
  return mimeType === 'application/vnd.google-apps.folder';
}

/**
 * Check if item is a PDF
 * @param {string} mimeType - The MIME type of the item
 * @returns {boolean}
 */
export function isPDF(mimeType) {
  return mimeType === 'application/pdf';
}

/**
 * Check if item is a Google Slides presentation
 * @param {string} mimeType - The MIME type of the item
 * @returns {boolean}
 */
export function isPPT(mimeType) {
  return mimeType === 'application/vnd.google-apps.presentation' || 
         mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
         mimeType === 'application/vnd.ms-powerpoint';
}

/**
 * Get PDF preview URL
 * @param {string} fileId - The Google Drive file ID
 * @returns {string} Preview URL
 */
export function getPDFPreviewUrl(fileId) {
  // Use Google Docs viewer - works better with third-party cookie restrictions on Android
  // This embeds via docs.google.com which has better cross-origin compatibility
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/**
 * Get Google Drive download URL
 * @param {string} fileId - The Google Drive file ID
 * @returns {string} Download URL
 */
export function getDriveDownloadUrl(fileId) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

/**
 * Get alternative PDF preview URL using Google Docs Viewer
 * Better compatibility with Android Chrome's cookie restrictions
 * @param {string} fileId - The Google Drive file ID
 * @returns {string} Preview URL
 */
export function getAlternativePDFUrl(fileId) {
  const driveUrl = `https://drive.google.com/uc?id=${fileId}`;
  return `https://docs.google.com/viewer?url=${encodeURIComponent(driveUrl)}&embedded=true`;
}

/**
 * Get Google Slides preview URL
 * @param {string} fileId - The Google Drive file ID
 * @returns {string} Preview URL for embedded slides
 */
export function getPPTPreviewUrl(fileId) {
  // Use Drive preview for better compatibility with uploaded PowerPoint files
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/**
 * Get alternative PPT preview URL using Google Docs Viewer
 * Better compatibility with Android Chrome's cookie restrictions
 * @param {string} fileId - The Google Drive file ID
 * @returns {string} Preview URL
 */
export function getAlternativePPTUrl(fileId) {
  const driveUrl = `https://drive.google.com/uc?id=${fileId}`;
  return `https://docs.google.com/viewer?url=${encodeURIComponent(driveUrl)}&embedded=true`;
}

/**
 * Extract file ID from Google Drive URL
 * @param {string} url - Google Drive URL
 * @returns {string|null} File ID or null
 */
export function extractFileId(url) {
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /\/presentation\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /folders\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}
