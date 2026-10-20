export async function downloadFile(fileUrl, fallbackFileName) {
  const url = new URL(fileUrl, window.location.href)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('The file URL must use HTTP or HTTPS')
  }

  if (url.origin !== window.location.origin) {
    const link = document.createElement('a')
    link.href = url.href
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    link.remove()
    return
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Download request failed (${response.status})`)
  }

  const blobUrl = window.URL.createObjectURL(await response.blob())
  const link = document.createElement('a')
  link.href = blobUrl
  link.download = decodeURIComponent(url.pathname.split('/').pop()) || fallbackFileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(blobUrl)
}
