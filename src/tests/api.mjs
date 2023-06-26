import axios, { Axios } from 'axios'

async function getInitialGifs() {
  let url = 'https://api.giphy.com/v1/gifs/search?api_key=2XgxDfWZxAJd8rQF1GQ6R4aBoZ97Jp2S&q=games&limit=25&offset=26&rating=g&lang=en&bundle=messaging_non_clips'
  //'https://api.giphy.com/v1/gifs/search?api_key=2XgxDfWZxAJd8rQF1GQ6R4aBoZ97Jp2S&q=dragon&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips'
  let gifs = (await axios.get(url)).data.data
  if (typeof (gifs) != 'object' || gifs == null || gifs == undefined) {
    console.log('getInitialGifs error')
    return 0
  }
  console.log('getInitialGifs pass')
}

getInitialGifs()
