<template>
  <v-data-table
          :headers="columns"
          :items="rows"
          :items-per-page="12"
  >
    <template v-slot:item.acciones="{ item }">
      <v-icon v-if="item.deleted" @click="addItem(item)" color="success">
        mdi-plus-circle
      </v-icon>
      <v-icon v-else @click="deleteItem(item)" color="error">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: "TablaProductos",
        data() {
            return {
                columns: [
                    { text: 'Código de compra', value: 'codigo', align: 'start', sortable: false, divider: true },
                    { text: 'Magnitd', value: 'magnitud', divider: true },
                    { text: 'Urgencia', value: 'urgencia', divider: true },
                    { text: 'Procedencia', value: 'procedencia', divider: true },
                    { text: 'Naturaleza', value: 'naturaleza', divider: true },
                    { text: 'Protocolo', value: 'protocolo', divider: true },
                    { text: 'Acciones', value: 'acciones', sortable: false }
                ],
                rows: this.$store.getters.productRows
            }
        },
        methods: {
            addItem(item: {deleted: boolean, [p: string]: any}) {
                item.deleted = false;
                this.$store.commit('changeProductRows', this.rows);
            },
            deleteItem(item: {deleted: boolean, [p: string]: any}) {
                item.deleted = true;
                this.$store.commit('changeProductRows', this.rows);
            }
        }
  })
</script>

<style scoped>
</style>