<template>
  <v-container>
    <v-layout flex align-center justify-center>
      <v-flex md8>
        <v-card>
          <v-card-title class="headline">
            Catálogo de compras
          </v-card-title>
          <v-divider/>
          <v-card-text>
            <TablaProductos/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TablaProductos from "@/components/TablaProductos.vue";
  
  export default Vue.extend({
      name: "CatalogoCompras",
      components: {
          TablaProductos
      }
  })
</script>

<style scoped>

</style>