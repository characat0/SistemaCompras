<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">Catálogo de protocolos</v-card-title>
      <v-divider/>
      <v-card-text>
        <selector-protocolo/>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import SelectorProtocolo from '@/components/SelectorProtocolo.vue';
  
  export default Vue.extend({
      name: "CatalogoProtocolos",
      components: {
          SelectorProtocolo
      }
  })
</script>

<style scoped>

</style>