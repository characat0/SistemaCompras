<template>
  <v-data-table
          :headers="columns"
          :items="elements"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
            >Agregar acción</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
          
            <v-card-text>
              <v-container>

                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.descripcion" label="Descripción" :rules="[v=>!!v||'Campo requerido']"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                            v-model="editedItem.codigo"
                            label="Código de acción"
                            :rules="[v => !!v && !!v.match(/^(MET|OP)_[0-9]{1,2}$/) || 'Código no válido']"
                            hint="MET_XX o OP_XX"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select v-model="editedItem.tipo" :items="['Método', 'Operación']" label="Tipo de acción" :rules="[v=>!!v||'Campo requerido']"></v-select>
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
      </v-toolbar>
    </template>
    <template v-slot:item.acciones="{ item }">
      <v-icon
              color="blue"
              class="mr-2"
              @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
              color="error"
              @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {DefaultComputed} from "vue/types/options";
  import {accion} from "@/store/acciones";
  
  type Accion = {codigo:string; descripcion: string; tipo: 'Método' | 'Operación' }
  type column = { text: string; value: string; align?: string; sortable?: boolean, divider?: boolean }
  export default Vue.extend({
      name: "TablaAcciones",
      data(): {columns: column[]; dialog: boolean; editedIndex: number; editedItem: Accion; defaultItem: Accion} {
          return {
              columns: [
                  { text: 'Codigo', value: 'codigo', align: 'center', sortable: false, divider: true },
                  { text: 'Descripción', value: 'descripcion', align: 'center', sortable: false, divider: true },
                  { text: 'Tipo', value: 'tipo', align: 'center', sortable: false, divider: true },
                  { text: 'Acción', value: 'acciones', align: 'center', sortable: false, divider: true }
              ],
              dialog: false,
              editedIndex: -1,
              editedItem: {
                  codigo: '',
                  descripcion: '',
                  tipo: '' as 'Método' | 'Operación'
              },
              defaultItem: {
                  codigo: '',
                  descripcion: '',
                  tipo: '' as 'Método' | 'Operación'
              },
          }
      },
      computed: {
          formTitle: {
              get(): DefaultComputed[string] {
                  return this.editedIndex === -1 ? 'Nueva acción' : 'Editar acción'
              }
          },
          elements: {
              get(): Accion[] {
                  const acciones: {[p: string]: accion} = this.$store.getters.acciones;
                  const result: Accion[] = [];
                  for (const key of Object.keys(acciones)) {
                      const e = {codigo: key, ...acciones[key]};
                      result.push(e);
                  }
                  return result;
              }
          }
      },
      methods: {
          close () {
              this.dialog = false
              this.$nextTick(() => {
                  this.editedItem = Object.assign({}, this.defaultItem)
                  this.editedIndex = -1
              })
          },
          save () {
              if (this.editedIndex > -1) {
                  Object.assign(this.elements[this.editedIndex], this.editedItem)
              } else {
                  this.elements.push(this.editedItem);
              }
              this.$store.commit('changeAcciones', this.elements);
              this.close()
          },
          editItem (item: Accion) {
              this.editedIndex = this.elements.indexOf(item)
              this.editedItem = Object.assign({}, item)
              this.dialog = true
          },
          deleteItem (item: Accion) {
              const index = this.elements.indexOf(item)
              console.log(item);
              confirm('¿Estás seguro de que deseas eliminar esta acción?') && this.elements.splice(index, 1) && this.$store.commit('changeAcciones', this.elements);
          },
      }
  })
</script>

<style scoped>

</style>