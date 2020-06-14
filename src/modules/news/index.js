import Vue from 'vue'

export default {
    state:{
        news:[]
    },
    mutations:{
        ADD_NEWS(state,payload){
           state.news.push(payload)
        },
        DELETE_NEWS(state,payload){
            let news = state.news.filter(item => item.id !== payload.id)
            Vue.set(state,'news',news)
        },
        UPDATE_NEWS(state,payload){
            Vue.set(state.news,payload.id,payload)
        }
    },
    actions:{
    },
    getters:{
        getNews:(state)=>state.news
    }
}