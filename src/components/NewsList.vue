<template>
    <div>
        <v-card
            class="mx-auto"
            width="600"
            tile
        >
            <v-list>
                <v-subheader>Список новостных ботов</v-subheader>
                <v-divider></v-divider>
                    <template v-if="getItemsLength == 0">
                        <p class="pa-5 text-center text-sm-body-2">Список новостных ботов пустой. Пожалуйста создайте бота.</p>
                    </template>
                    <template v-else>
                        <v-list-item 
                            v-for="(item, i) in items"
                            :key="i"
                            class="news-list__wrap"
                            >
                            <v-list-item-content @click="updateItem(item)" class="news-list__name-wrap">
                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-content class="news-list__btn-wrap">
                                <v-btn icon color="blue" class="news-list__btn" @click.prevent="deleteItem(item)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
            </v-list>
        </v-card>
    </div>
</template>

<script>
import {eventBus} from '@/main'

export default {
    name:'NewsList',
    props:{
        items:{
            type:Array,
            required:true
        }
    },
    computed:{
        getItemsLength:function(){
            return this.items.length
        }
    },
    methods:{
        deleteItem:function(item){
            this.$store.commit('DELETE_NEWS',item)
        },
        updateItem:function(item){
            eventBus.$emit('update-dialog',{title:'Редактирование бота',item:item})
        }
    }
}
</script>

<style lang="scss" scoped>
    .news-list{
        &__wrap{
            position: relative;
            display: flex;
            justify-content: space-between;
            &:hover{
                cursor: pointer;
                background: rgba(255,255,255,.2);
            }
            &:active{
                background: rgba(255,255,255,.1);
            }
        }
        &__name-wrap{
            flex-grow: 5;
        }
        &__btn-wrap{
            flex-grow: 1;
            justify-content: flex-end;
        }
        &__btn{
            max-width: 36px;
        }
    }
</style>