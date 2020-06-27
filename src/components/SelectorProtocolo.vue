<template>
  <v-container>
    <v-layout justify-center>
      <v-flex>
        <v-select v-model="protocolo" label="Protocolo" :items="this.productRows.filter(v=>!v.deleted).map(v => v.protocolo)"/>
      </v-flex>
    </v-layout>
    <v-divider/>
    <h3 style="padding-top: 3em" v-text="`Transacciones del protocolo ${protocolo}`"></h3>
    <v-layout align-content-space-around justify-center>
      <v-flex>
        <v-data-table :headers="columns">
        
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  
  export default Vue.extend({
      name: "SelectorProtocolo",
      data() {
          return {
              protocolo: '',
              columns: [
                  { text: 'Transacción', value: 'codigo', align: 'center', divider: true },
                  { text: 'Descripción', value: 'descripcion', divider: true },
                  { text: 'Secuencia', value: 'codigo', align: 'center', divider: true },
              ],
              cruce: {} as {[p: string]: string[]}
          }
      },
      computed: {
          productRows: {
              get() {
                  return this.$store.getters.productRows
              }
          },
          transacciones: {
              get() {
                  return this.$store.getters.transacciones
              }
          }
      }
  })
</script>

<style scoped>

</style>