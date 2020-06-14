<template>
    <div>
        <v-card>
          <v-card-title>
              <span class="headline">{{ data.title }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
           <v-container>
            <v-row>
              <v-col cols="10" class="ma-auto">
                <v-text-field prefix="@" label="Название бота*" v-model="data.item.name" :rules="rules" required></v-text-field>
                <v-alert type="error" v-model="error">
                  Поле 'Название бота' обязательное
                </v-alert>
                <v-text-field label="Описание" v-model="data.item.description" ></v-text-field>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="data.date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="data.item.date"
                      label="Дата создания"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="data.item.date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(data.item.date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <VueFileAgent 
                  :uploadUrl="uploadUrl" 
                  :deletable="true"
                  v-model="data.item.images"
                  :helpText="'Загрузка изображения новости'"
                  ></VueFileAgent>
              </v-col>
            </v-row>
           </v-container>
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Закрыть</v-btn>
            <v-btn v-if="this.data.type == 'create'" color="blue darken-1" text @click="saveData">Сохранить</v-btn>
            <v-btn v-else color="blue darken-1" text @click="updateData">Сохранить</v-btn>
          </v-card-actions>
      </v-card>
    </div>
</template>

<script>
import {eventBus} from '@/main'

export default {
    name:'NewsForm',
    props:{
        data:{
            type:Object,
            required:true
        }
    },
    data:()=>({
        uploadUrl: 'http://localhost:8080',
        menu: false,
        rules:[
          value => (value || '').length <= 15 || 'Максимум 15 символов',
          value => (value|| '').indexOf(' ') < 0 || 'Пробелы запрещены'
        ],
        error:false
    }),
    methods:{
      closeDialog:function(){
          eventBus.$emit('close-dialog')
      },
      saveData:function(){
          if(this.data.item.name == ''){
            let self = this
            self.error = true
            setTimeout(function(){
              self.error = false
            },2000)
          }else{
            this.$store.commit('ADD_NEWS',{...this.data.item,id:Date.now()})
            eventBus.$emit('close-dialog')
          }
          
      },
      updateData:function(){
          this.$store.commit('UPDATE_NEWS',{...this.data})
      },
    }
}
</script>

<style lang="scss" scoped>

</style>