import news from '@/modules/news';

const state = {
    ...news.state
  }
  
  const actions = {
    ...news.actions
  }
  
  const mutations = {
    ...news.mutations
  }
  
  const getters = {
    ...news.getters
  }
  
  export default {state, actions, mutations, getters}