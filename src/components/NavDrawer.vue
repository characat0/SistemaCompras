<template>
  <v-navigation-drawer
    app
    temporary
    :v-model="drawer"
    :value="drawer"
    :color="color"
    dark
  >
    <v-list dense nav>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="/img/uni.png" alt="" style="width: auto;" >
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Compras-gerencial</v-list-item-title>
          <v-btn @click="changeRoute('/')" x-small depressed :color="color" style="text-transform: none; text-align: left">
            <v-list-item-subtitle>Inicio</v-list-item-subtitle>
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      
      <v-divider></v-divider>
      <v-list-item v-if="!logged">
        <v-btn @click="changeRoute('/login')" depressed :color="color" block large>
          <v-icon left>mdi-login</v-icon>
          <v-list-item-title style="text-align: left">Login</v-list-item-title>
        </v-btn>
      </v-list-item>
      <v-list-item v-if="logged">
        <v-btn @click="() => {logged=false; changeRoute('/')}" depressed :color="color" block large>
          <v-icon left>mdi-logout</v-icon>
          <v-list-item-title style="text-align: left">Logout</v-list-item-title>
        </v-btn>
      </v-list-item>
      <v-list-item v-if="logged">
        <v-btn @click="changeRoute('/treeview')" depressed :color="color" block large>
          <v-icon left>mdi-office-building</v-icon>
          <v-list-item-title style="text-align: left">Arquitectura</v-list-item-title>
        </v-btn>
      </v-list-item>
      <v-list-item v-if="logged">
        <v-btn @click="changeRoute('/modulos/compras')" depressed :color="color" block large>
          <v-icon left>mdi-cart</v-icon>
          <v-list-item-title style="text-align: left">Cat. Compras</v-list-item-title>
        </v-btn>
      </v-list-item>
      <v-list-item v-if="logged">
        <v-btn @click="changeRoute('/modulos/reglas')" depressed :color="color" block large>
          <v-icon left>mdi-ruler</v-icon>
          <v-list-item-title style="text-align: left">Cat. Reglas</v-list-item-title>
        </v-btn>
      </v-list-item>


    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
      data: function () {
          return {
              color: 'primary'
          }
      },
      computed: {
          drawer: {
              get() {
                  return this.$store.getters.drawer + 1;
              }
          },
          logged: {
              get() {
                  return this.$store.getters.logged;
              },
              set(v) {
                  return this.$store.commit('logged', v);
              }
          }
      },
      methods: {
          changeRoute(desiredRoute: string) {
              console.log(this.$route.fullPath, desiredRoute);
              if (this.$route.fullPath !== desiredRoute) {
                  this.$router.push(desiredRoute);
              }
          }
      }
  })
  
</script>