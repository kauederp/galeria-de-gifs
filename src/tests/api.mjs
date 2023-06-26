import axios, { Axios } from 'axios'




async function getInitialGifs() {
  const apiKey = '2XgxDfWZxAJd8rQF1GQ6R4aBoZ97Jp2S'
  let page = 1

  let quantPerPage = 50

  let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${quantPerPage}&offset=${(quantPerPage * page)}&rating=g&bundle=messaging_non_clips`

  //let url = 'https://api.giphy.com/v1/gifs/search?api_key=2XgxDfWZxAJd8rQF1GQ6R4aBoZ97Jp2S&q=games&limit=25&offset=26&rating=g&lang=en&bundle=messaging_non_clips'
  //'https://api.giphy.com/v1/gifs/search?api_key=2XgxDfWZxAJd8rQF1GQ6R4aBoZ97Jp2S&q=dragon&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips'
  let gifs = (await axios.get(url)).data.data
  if (typeof (gifs) != 'object' || gifs == null || gifs == undefined) {
    console.log('getInitialGifs error')
    return 0
  } else {
    console.log('getInitialGifs pass', gifs.length)
  }
}

async function getPage() {
  const apiKey = '2XgxDfWZxAJd8rQF1GQ6R4aBoZ97Jp2S'
  let page = 1
  let quantPerPage = 50
  let search = 'memes' // <- test search key
  let url = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + search + '&limit=' + quantPerPage + '&offset=' + (quantPerPage * page) + '&rating=g&lang=en&bundle=messaging_non_clips'
  let gifs = (await axios.get(url)).data.data
  if (typeof (gifs) != 'object' || gifs == null || gifs == undefined) {
    console.log('getInitialGifs error')
    return 0
  } else {
    console.log('getPage pass', gifs.length)
  }

}

getInitialGifs()
getPage()
