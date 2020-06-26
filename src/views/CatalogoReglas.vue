<template>
  <v-container>
    <v-layout flex align-center justify-center>
      <v-flex md12>
        <v-card>
          <v-card-title class="headline">
            Catálogo de reglas
          </v-card-title>
          <v-divider/>
          <v-card-text>
            <TablaReglas/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TablaReglas from '@/components/TablaReglas.vue';
  
  export default Vue.extend({
      name: "CatalogoReglas",
      components: {
          TablaReglas
      }
  })
</script>

<style scoped>

</style>