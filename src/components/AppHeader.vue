<template>
    <v-app-bar
      app
      clipped-left
    > 
      <div class="nav-bar">
        <v-toolbar-title>News Bot Creater</v-toolbar-title>
        <v-btn large color="primary" @click.prevent="createNews">Создать бота</v-btn>
      </div>
    </v-app-bar>
</template>

<script>
import {eventBus} from '@/main'

export default {
    name:'AppHeader',
    methods:{
      createNews:function(){
          eventBus.$emit('create-dialog',{title:'Создание бота новости',type:'create'})
      }
    }
}
</script>

<style lang="scss" scoped>
  .nav-bar{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>