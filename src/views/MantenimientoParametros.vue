<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">
        Mantenimiento de parámetros
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <ParametrosCuantia/>
        <v-divider/>
        <ParametrosEmpresa/>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import ParametrosCuantia from '@/components/ParametrosCuantia.vue';
  import ParametrosEmpresa from "@/components/ParametrosEmpresa.vue";
  
  export default Vue.extend({
      name: "MantenimientoParametros",
      components: {
          ParametrosCuantia,
          ParametrosEmpresa
      }
  })
</script>

<style scoped>

</style>