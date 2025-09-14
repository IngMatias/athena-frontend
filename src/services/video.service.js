const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

import { get, post, postAndStreamJSON } from "@/utils/api";


export const getInfo = ({ url }) => {

  return post(`${URL_BACKEND}/api/video`, {
    url
  })
    .then(({ data }) => {
      return data
    })
    .then(({ title, description }) => {
      return { title, description }
    })
    .catch((err) => {
      console.error('Error getting video info: ', err)
    })
}


export const getTranscription = ({ url, onChunk }) => {
  return postAndStreamJSON(`${URL_BACKEND}/api/video/captions`, {
    url
  })
    .then(async (res) => {
      for await (const chunk of res) {
        console.log('chunk', chunk)
        onChunk(chunk);
      }
    })
    .catch((err) => {
      // reject(err);
    });
}
