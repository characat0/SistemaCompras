<template>
  <v-container>
    <v-layout wrap justify-center align-content-space-between>
      <v-flex sm4 md4>
        <v-select block v-model="transaccion" label="Transacción" :items="Object.keys(t).map(v=>({value:v,text:`${v} - ${t[v].descripcion}`}))"/>
      </v-flex>
      <v-flex md1></v-flex>
      <v-flex sm2 md3>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                    color="blue"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
            >Agregar acción</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Nueva transacción</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="nuevaTransaccion.codigo" label="Código" :rules="[v=>!!v&&!!v.match(/^(TRX_)[0-9]{1,2}$/)]" hint="TRX_XX"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="nuevaTransaccion.descripcion" label="Descripción" :rules="[v=>!!v||'Campo requerido']"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
        
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="close">Cancelar</v-btn>
              <v-btn color="success" text @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex sm2 md3>
        <v-btn color="error" :disabled="!transaccion" @click="removeTransaction">Eliminar transaccion</v-btn>
      </v-flex>
    </v-layout>

    <v-divider/>
    <h3 style="padding-top: 3em; padding-bottom: 0.5em" v-text="`Acciones de la transaccion ${transaccion}`"></h3>
    <v-layout align-content-space-around justify-center>
      <v-flex>
        <v-data-table :headers="columns">
          <template v-slot:item.acciones="{ item }">
            <v-icon
                    color="error"
                    @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>

        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  
  
  export default Vue.extend({
      name: "SelectorTransacciones",
      data() {
          
          return {
              transaccion: '',
              columns: [
                  { text: 'Codigo', value: 'codigo', align: 'center', sortable: false, divider: true },
                  { text: 'Descripción', value: 'descripcion', align: 'center', sortable: false, divider: true },
                  { text: 'Tipo', value: 'tipo', align: 'center', sortable: false, divider: true },
                  { text: 'Secuencia', value: 'secuencia', align: 'center', sortable: false, divider: true },
                  { text: 'Acción', value: 'acciones', align: 'center', sortable: false, divider: true }
              ],
              elements: [] as {codigo: string; descripcion: string; tipo: string; secuencia: number}[],
              dialog: false,
              nuevaTransaccion: {
                  codigo: '',
                  descripcion: ''
              }
          }
      },
      computed: {
          t: {
              get() {
                  return this.$store.getters.transacciones;
              },
          },
          a: {
              get() {
                  return this.$store.getters.acciones;
              }
          }

      },
      methods: {
          deleteItem (item: {codigo: string; descripcion: string; tipo: string; secuencia: number}) {//Borra una accion dentro de una transaccion
              const index = this.elements.indexOf(item)
              console.log(item);
              confirm('¿Estás seguro de que deseas eliminar esta acción?') && this.elements.splice(index, 1) && this.$store.commit('changeTransacciones', this.elements);
          },
          close () {
              this.dialog = false
              this.$nextTick(() => {
                  this.nuevaTransaccion = {
                      codigo: '',
                      descripcion: ''
                  };
              })
          },
          save () {
              this.t[this.nuevaTransaccion.codigo] = { descripcion: this.nuevaTransaccion.descripcion };
              this.$store.commit('changeTransacciones', this.t);
              this.close()
          },
          removeTransaction() {
              console.log(this.transaccion, {...this.t});
              delete this.t[this.transaccion];
              this.$store.commit('changeTransacciones', this.t);
              this.transaccion = '';
          }
      }
  })
</script>

<style scoped>

</style>