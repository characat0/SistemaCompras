<template>
  <v-container>
    <v-layout justify-center>
      <v-flex>
        <v-select v-model="protocolo" label="Protocolo" :items="this.productRows.filter(v=>!v.deleted).map(v => v.protocolo)"/>
      </v-flex>
    </v-layout>
    <v-layout v-if="protocolo">
      <v-flex>
        <v-text-field label="Magnitud" disabled :value="this.productRows.find(v=>v.protocolo === protocolo).magnitud"></v-text-field>
      </v-flex>
      <v-flex>
        <v-text-field label="Procedencia" disabled :value="this.productRows.find(v=>v.protocolo === protocolo).procedencia"></v-text-field>
      </v-flex>
      <v-flex>
        <v-text-field label="Naturaleza" disabled :value="this.productRows.find(v=>v.protocolo === protocolo).naturaleza"></v-text-field>
      </v-flex>
      <v-flex>
        <v-text-field label="Urgencia" disabled :value="this.productRows.find(v=>v.protocolo === protocolo).urgencia"></v-text-field>
      </v-flex>
    </v-layout>
    <v-divider/>
    <h3 style="padding-top: 3em" v-text="`Transacciones del protocolo ${protocolo}`"></h3>
    <v-layout align-content-space-around justify-center>
      <v-flex>
        <v-data-table :headers="columns" :items="protocolo ? getInfo(protocoloTransaccion[protocolo]) : []">
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
                          :disabled="!protocolo"
                  >Agregar transacción</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Nueva transacción</span>
                  </v-card-title>
          
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-select
                                  v-model="newTra"
                                  v-if="protocolo"
                                  label="Código"
                                  :items="Object.keys(transacciones).filter(v => protocoloTransaccion[protocolo].indexOf(v) === -1)"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                                  v-if="protocolo"
                                  label="Descripción"
                                  disabled
                                  :value="newTra ? getInfo([newTra])[0].descripcion : ''"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
          
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeNewTran">Cancelar</v-btn>
                    <v-btn color="success" text @click="newTran">Guardar</v-btn>
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
  
  export default Vue.extend({
      name: "SelectorProtocolo",
      data() {
          return {
              protocolo: '',
              columns: [
                  { text: 'Transacción', value: 'codigo', align: 'center', divider: true },
                  { text: 'Descripción', value: 'descripcion', divider: true },
                  { text: 'Secuencia', value: 'secuencia', align: 'center', divider: true },
                  { text: 'Acción', value: 'acciones', align: 'center', sortable: false, divider: true }
              ],
              protocoloTransaccion: this.$store.getters.protocoloTransaccion as {[p: string]: string[]},
              dialogo: false,
              newTra: ''
          }
      },
      computed: {
          productRows: {
              get(): {codigo:string;deleted:boolean;magnitud:string;procedencia:string;protocolo:string;urgencia:string}[] {
                  return this.$store.getters.productRows
              }
          },
          transacciones: {
              get(): {[p: string]: { descripcion: string }} {
                  return this.$store.getters.transacciones
              }
          }
      },
      methods: {
          getInfo(transacciones: string[]) {
              const rows: {codigo: string; descripcion: string; secuencia: number}[] = []
              for (let i = 0; i < transacciones.length; i++) {
                  
                  const t = transacciones[i];
                  const tt = this.transacciones[t];
                  if (!tt) {
                      transacciones.splice(i, 1);
                      i--;
                  } else {
                      rows.push({ codigo: t, descripcion: tt.descripcion, secuencia: i+1 });
                  }
              }
              return rows;
          },
          closeNewTran() {
              this.dialogo = false;
              this.$nextTick(() => {
                  this.newTra = '';
              })
          },
          newTran() {
              this.protocoloTransaccion[this.protocolo].push(this.newTra);
              this.$store.commit('changeProtocoloTransaccion', this.protocoloTransaccion);
              this.closeNewTran();
          },
          moveDown(item: {codigo: string; descripcion: string; secuencia: number}) {
              const acciones = this.protocoloTransaccion[this.protocolo];
              const index = acciones.indexOf(item.codigo);
              if (index === acciones.length - 1) return;
              const elem = acciones.splice(index, 1)[0];
              acciones.splice(index+1, 0, elem);
              this.$store.commit('changeProtocoloTransaccion', this.protocoloTransaccion);
          },
          moveUp(item: {codigo: string; descripcion: string; secuencia: number}) {
              const acciones = this.protocoloTransaccion[this.protocolo];
              const index = acciones.indexOf(item.codigo);
              if (index === 0) return;
              const elem = acciones.splice(index, 1)[0];
              acciones.splice(index-1, 0, elem);
              this.$store.commit('changeProtocoloTransaccion', this.protocoloTransaccion);
          },
          deleteItem (item: {codigo: string; descripcion: string; secuencia: number}) {//Borra una transaccion
              const acciones = this.protocoloTransaccion[this.protocolo];
              const index = acciones.indexOf(item.codigo)
              confirm('¿Estás seguro de que deseas eliminar esta transacción?') && acciones.splice(index, 1) && this.$store.commit('changeProtocoloTransaccion', this.protocoloTransaccion);
          },
      }
  })
</script>

<style scoped>

</style>