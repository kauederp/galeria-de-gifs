<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />


        <q-toolbar-title>
          Galery of gifs
        </q-toolbar-title>
        <div class="w-100 flex px-2 flex-row">
          <input placeholder="search here..." class="w-full px-2  border-2 border-black-500  text-black search-input"
            type="text" v-model="search" @focus="clearSearchInput()" @input="updateSearchValue()">
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer v-if="leftDrawerOpen" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list class="h-full flex column justify-between pb-5">
        <div>
          <q-item-label header>
            Search:
          </q-item-label>
          <div class="w-100 flex px-2 flex-row">
            <input placeholder="search here..." class="w-full px-2  border-2 border-black-500  text-black search-input"
              type="text" v-model="search" @focus="clearSearchInput()" @input="updateSearchValue()">
          </div>
        </div>
        <EssentialLink @updateSearchValue="updateSearchValue($event)" v-for="link in essentialLinks" :key="link.title"
          v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>

      <IndexPage :search="search" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { galeryStore } from 'src/stores/galery-store.js'
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import IndexPage from 'src/pages/IndexPage.vue'

const linksList = [

  {
    title: 'Github',
    caption: 'github.com/kauederp/galeria-de-gifs',
    icon: 'code',
    link: 'https://github.com/kauederp/galeria-de-gifs'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    IndexPage
  },

  setup() {
    const leftDrawerOpen = ref(true)

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    toggleLeftDrawer()
    return {
      search: '',
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer
    }
  },
  methods: {
    updateSearchValue(search) {




      if (search == undefined)
        galeryStore().search = this.search
      else
        galeryStore().search = search

      //this.$emit('updateSearchValue', galeryStore.search)
    },
    clearSearchInput() {
      document.querySelectorAll('.search-input').forEach(e => { e.value = '' })
    }
  }
})
</script>
