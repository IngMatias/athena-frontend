export const getVideoId = (url) => {
  const urlObj = new URL(url)

  const searchParamId = urlObj.searchParams.get('v')
  if (searchParamId) {
    return searchParamId
  }

  const pathnameId = urlObj.pathname.substring(1)
  if (pathnameId) {
    return pathnameId
  }
}
export const getVideoUrl = (url) => {
  return 'https://www.youtube.com/watch?v=' + getVideoId(url)
}

export const isValidUrl = (url) => {
  const regexYoutubeURL = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(\S*)?$/
  return regexYoutubeURL.test(url)
}

export const getVideoSrc = (url, time, autoplay) => {
  console.log('autoplay', autoplay)
  return 'https://www.youtube.com/embed/' + getVideoId(url) + (time !== undefined ? `?start=${time.toString().split('.')[0]}` : '') + (autoplay ? '&autoplay=1' : '')
}

export const getVideoThumbnail = (url) => {
  return `https://i3.ytimg.com/vi/${getVideoId(url)}/maxresdefault.jpg`
}
