import { defineStore } from 'pinia';

export const galeryStore = defineStore('galery', {
  state: () => ({
    search: '',
    openImage: {
      id: '',
      url: ''
    }
  }),
  getters: {
  },
  actions: {

  },
});
