<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">Catálogo de transacciones</v-card-title>
      <v-divider/>
      <v-card-text>
        <selector-transacciones/>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script lang="ts">
  import Vue from 'vue';
  import SelectorTransacciones from '@/components/SelectorTransacciones.vue';
  
  export default Vue.extend({
      name: "CatalogoTransacciones",
      components: {
          SelectorTransacciones
      }
  })
</script>

<style scoped>

</style>