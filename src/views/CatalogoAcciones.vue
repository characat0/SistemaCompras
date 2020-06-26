<template>
  <v-container>
    <v-layout flex align-center justify-center>
      <v-flex md8>
        <v-card>
          <v-card-title class="headline">
            Catálogo de acciones
          </v-card-title>
          <v-divider/>
          <v-card-text>
            <TablaAcciones/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TablaAcciones from "@/components/TablaAcciones.vue";
  
  export default Vue.extend({
      name: "CatalogoAcciones",
      components: {
          TablaAcciones
      }
  })
</script>

<style scoped>

</style>