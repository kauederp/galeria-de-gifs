<template>
  <div id="openGifModal" class="w-full">
    <div class="bg-zinc-900 p-3">
      <div class="text-end"><i @click="closeModal()" class="bi bi-x-lg text-rose-400"></i></div>

      <div class="w-full flex justify-center py-3">
        <img :id="galery.openImage.value.id" :src="galery.openImage.value.url" alt="" class=" w-10/12">
      </div>
      <div class="flex justify-end">
        <a href="#" class="btn p-4 rounded-full text-white bg-green-600" :download="galery.openImage.value.download">
          Download </a>
      </div>
    </div>

  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { galeryStore } from 'src/stores/galery-store.js';




const galery = storeToRefs(galeryStore())

const emit = defineEmits(['closeModal'])


function closeModal() {
  emit('closeModal')
}

</script>
<style scoped>
#openGifModal {
  position: fixed;
  top: 60px;
  left: 0px;
}
</style>
