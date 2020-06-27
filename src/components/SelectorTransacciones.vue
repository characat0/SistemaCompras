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
            >Nueva transacción</v-btn>
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
              <v-btn color="success" text @click="save" :disabled="!nuevaTransaccion.codigo.match(/^(TRX_)[0-9]{1,2}$/) || !nuevaTransaccion.descripcion">Guardar</v-btn>
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
        <v-data-table :headers="columns" :items="transaccion ? getInfo(accionTransaccion[transaccion]) : []">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogo" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                          :disabled="!transaccion"
                  >Agregar acción</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Nueva acción</span>
                  </v-card-title>
          
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-select
                                  v-model="newAct"
                                  v-if="transaccion"
                                  label="Código"
                                  :items="Object.keys(a).filter(v => accionTransaccion[transaccion].indexOf(v) === -1)"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                                  v-if="transaccion"
                                  label="Descripción"
                                  disabled
                                  :value="newAct ? getInfo([newAct])[0].descripcion : ''"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
          
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeNewAction">Cancelar</v-btn>
                    <v-btn color="success" text @click="newAction">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.acciones="{ item }">
            <v-icon
                    color="success"
                    @click="moveUp(item)"
            >
              mdi-arrow-up-bold
            </v-icon>
            <v-icon
                    color="error"
                    @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
            <v-icon
                    color="success"
                    @click="moveDown(item)"
            >
              mdi-arrow-down-bold
            </v-icon>
          </template>

        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {accion} from "@/store/acciones";
  import {transaccion} from "@/store/transacciones";
  
  
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
              },
              accionTransaccion: this.$store.getters.accionTransaccion as {[p: string]: string[]},
              dialogo: false,
              newAct: ''
          }
      },
      computed: {
          t: {
              get(): {[p: string]: transaccion} {
                  return this.$store.getters.transacciones;
              },
          },
          a: {
              get(): {[p: string]: accion} {
                  return this.$store.getters.acciones;
              }
          }

      },
      methods: {
          deleteItem (item: {codigo: string; descripcion: string; tipo: string; secuencia: number}) {//Borra una accion dentro de una transaccion
              const acciones = this.accionTransaccion[this.transaccion];
              const index = acciones.indexOf(item.codigo)
              confirm('¿Estás seguro de que deseas eliminar esta acción?') && acciones.splice(index, 1) && this.$store.commit('changeAccionTransaccion', this.accionTransaccion);
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
              delete this.t[this.transaccion];
              confirm('¿Estás seguro de que deseas eliminar esta transacción?') && this.$store.commit('changeTransacciones', this.t);
              this.transaccion = '';
          },
          getInfo(acciones: string[]) {
              const acts: {codigo:string;descripcion:string;tipo:string;secuencia:number}[] = [];
              for (let i = 0; i < acciones.length; i++) {
                  const a = this.a[acciones[i]];
                  acts.push({codigo: acciones[i], descripcion: a.descripcion, tipo: a.tipo, secuencia: i+1})
              }
              return acts;
          },
          moveDown(item: {codigo: string; descripcion: string; tipo: string; secuencia: number}) {
              const acciones = this.accionTransaccion[this.transaccion];
              const index = acciones.indexOf(item.codigo);
              if (index === acciones.length - 1) return;
              const elem = acciones.splice(index, 1)[0];
              acciones.splice(index+1, 0, elem);
              this.$store.commit('changeAccionTransaccion', this.accionTransaccion);
          },
          moveUp(item: {codigo: string; descripcion: string; tipo: string; secuencia: number}) {
              const acciones = this.accionTransaccion[this.transaccion];
              const index = acciones.indexOf(item.codigo);
              if (index === 0) return;
              const elem = acciones.splice(index, 1)[0];
              acciones.splice(index-1, 0, elem);
              this.$store.commit('changeAccionTransaccion', this.accionTransaccion);
          },
          newAction() {
              this.accionTransaccion[this.transaccion].push(this.newAct);
              this.$store.commit('changeAccionTransaccion', this.accionTransaccion);
              this.closeNewAction();
          },
          closeNewAction() {
              this.dialogo = false
              this.$nextTick(() => {
                  this.newAct = '';
              })
          }
      }
  })
</script>

<style scoped>

</style>