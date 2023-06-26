<template>
  <div class="flex column" @scroll="infinityScroll()">

    <div @mousewheel="infinityScroll($event)">
      <div class="flex  flex-center" v-if="gifs.length != 0">

        <div @click="getGifById($event.currentTarget.id, gif.images.fixed_width.webp, gif.images.original.url)"
          :id="gif.id" v-for="gif in gifs" :key="gif" class="flex flex-center m-1" style="width: 178px;">
          <img :src="gif.images.fixed_height_small.webp" :alt="gif.title">
        </div>
      </div>
      <div v-if="showError" class="flex  flex-center bg-orange">
        <ErrorNotFoundSearchResults />
      </div>



    </div>

    <OpenGifModal @close-modal="toggleOpenGifModal = !toggleOpenGifModal" v-if="toggleOpenGifModal" />

    <!-- <div class="h-10">k</div> -->
  </div>
</template>

<script >
import axios from 'axios'
import { galeryStore } from 'src/stores/galery-store.js'
import { defineComponent, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import ErrorNotFoundSearchResults from '../components/ErrorNotFoundSearchResults.vue'
import OpenGifModal from '../components/OpenGifModal.vue'


export default {

  name: 'IndexPage',
  components: { ErrorNotFoundSearchResults, OpenGifModal },
  setup() {
    const apiKey = '2XgxDfWZxAJd8rQF1GQ6R4aBoZ97Jp2S'
    let page = 1
    let timeout
    let gifs = ref([])
    const galery = storeToRefs(galeryStore())
    let search = galery.search.value
    let openImage = galery.openImage.value
    let toggleOpenGifModal = ref(false)
    let showError = ref(false)


    async function getInitialGifs() {
      let quantPerPage = 50

      let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${quantPerPage}&offset=${(quantPerPage * page)}&rating=g&bundle=messaging_non_clips`



      console.log(url)
      let tmp = (await axios.get(url))
      if (gifs.value.length == 0) {

        gifs.value = tmp.data.data
        //console.log(tmp)
      } else {

        gifs.value = gifs.value.concat(tmp.data.data)

      }
    }

    async function getGifById(id, url, download) {

      galery.openImage.value = {
        id: id,
        url: url,
        download: download
      }
      toggleOpenGifModal.value = !toggleOpenGifModal.value
      console.log(toggleOpenGifModal)


    }

    async function getPage() {

      let quantPerPage = 50

      let url = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + search + '&limit=' + quantPerPage + '&offset=' + (quantPerPage * page) + '&rating=g&lang=en&bundle=messaging_non_clips'
      console.log(url)
      let tmp = (await axios.get(url))
      if (gifs.value.length == 0) {

        gifs.value = tmp.data.data
        //console.log(tmp)
      } else {

        gifs.value = gifs.value.concat(tmp.data.data)

      }

      if (gifs.value.length == 0) {
        showError.value = true
        console.log(showError.value)
      } else {
        showError.value = false
      }
    }
    async function infinityScroll(event) {
      //window.addEventListener('scroll', () => {


      if (
        window.scrollY + window.innerHeight >=
        event.currentTarget.scrollHeight
      ) {
        clearTimeout(timeout)

        timeout = setTimeout(() => {
          page++
          if (search != '') {
            getPage()
            getPage()
          } else {
            getInitialGifs()
          }

        }, 2000)
      }
      //})
    }

    function clearGifsList() {
      gifs.value = []
    }


    watch(galery.search, () => {
      page = 1
      search = galery.search.value
      clearTimeout(timeout)
      clearGifsList()
      timeout = setTimeout(() => getPage(), 1000)
    })

    getInitialGifs()
    return {
      gifs: gifs,
      teste: 'test',
      infinityScroll,
      getGifById,
      search: search,
      openImage: openImage,
      toggleOpenGifModal: toggleOpenGifModal,
      showError: showError
    }
  },





}
</script>
