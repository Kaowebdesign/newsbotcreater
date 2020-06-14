<template>
  <v-app id="inspire">
    
    <app-header />
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="shrink">
            <news-list :items="getNews"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; kaowebdev 2020</span>
    </v-footer>
    <v-dialog v-model="createDialog" persistent max-width="600px">
      <news-form :data="data" :type="type"/>
    </v-dialog>
  </v-app>
</template>

<script>
import NewsList from "./components/NewsList"
import NewsForm from "./components/NewsForm"
import AppHeader from "./components/AppHeader"
import {eventBus} from '@/main'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components:{
    NewsList,
    NewsForm,
    AppHeader
  },
  data: () => ({
    items:[],
    createDialog:false,
    data:{
      title:'',
      type:'',
      item:{
        name:'',
        description:'',
        date:new Date().toISOString().substr(0, 10),
        images:[]
      }
    },
    type:''
  }),
  computed:{
     ...mapGetters([
        'getNews'
      ]),
  },
  created () {
    this.$vuetify.theme.dark = true
    eventBus.$on('create-dialog', ({title,type}) => {
      this.createDialog = true
      this.data.title = title
      this.data.type = type
      this.data.item = {
        name:'',
        description:'',
        date:new Date().toISOString().substr(0, 10),
        images:[]
      }
    });
    eventBus.$on('update-dialog',({title,item}) => {
      this.createDialog = true
      this.data.title = title
      this.data.type = 'update'
      this.data.item = item
    });
    eventBus.$on('close-dialog', () => {
        this.createDialog = false
      });  
    }
};
</script>

<style lang="scss" scoped>
  
</style>