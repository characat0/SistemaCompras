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
            >Agregar regla</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
          
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                            v-model="editedItem.codigo"
                            label="Código de regla"
                            :rules="[v => !!v && v[0] === 'R' && parseInt(v.substr(1)) > 0 || 'Código no válido']"
                            hint="RXX"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.parametro" label="Nombre del parámetro" :rules="[v=>!!v||'Campo requerido']"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.operador" label="Operador lógico" :rules="[v=>!!v||'Campo requerido']"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.valor" label="Valor del parámetro" :rules="[v=>!!v||'Campo requerido']"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field :value="editedItem.descripcion = `${editedItem.parametro} ${editedItem.operador} ${editedItem.valor}`" label="Descripción" disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.verdadero" label="Acción Verdadero" :rules="[v=>!!v||'Campo requerido']"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.falso" label="Acción Falso" :rules="[v=>!!v||'Campo requerido']"></v-text-field>
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
  
  type regla = { codigo: string; parametro: string; valor: string; operador: string; verdadero: string; falso: string; descripcion: string; editable?: boolean };
  export default Vue.extend({
      name: "TablaReglas",
      data() {
          return {
              columns: [
                  { text: 'Regla', value: 'codigo', align: 'start', sortable: false, divider: true },
                  { text: 'Nombre del parámetro', value: 'parametro', sortable: false, divider: true },
                  { text: 'Valor del parámetro', value: 'valor', sortable: false, divider: true },
                  { text: 'Operador lógico', value: 'operador', sortable: false, divider: true },
                  { text: 'Descripción', value: 'descripcion', sortable: false, divider: true },
                  { text: 'Acción V', value: 'verdadero', sortable: false, divider: true },
                  { text: 'Acción F', value: 'falso', sortable: false, divider: true },
                  { text: 'Acciones', value: 'acciones', sortable: false, divider: true }
              ],
              dialog: false,
              editedIndex: -1,
              editedItem: {
                  codigo: '',
                  parametro: '',
                  valor: '',
                  operador: '',
                  descripcion: '',
                  verdadero: '',
                  falso: ''
              },
              defaultItem: {
                  codigo: '',
                  parametro: '',
                  valor: '',
                  operador: '',
                  descripcion: '',
                  verdadero: '',
                  falso: ''
              },
              elements: this.$store.getters.reglas as regla[]
          }
      },
      computed: {
          formTitle() {
              return this.editedIndex === -1 ? 'Nueva regla' : 'Editar regla'
          },
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
              this.$store.commit('changeReglasNegocio', this.elements);
              this.close()
          },
          editItem (item: regla) {
              this.editedIndex = this.elements.indexOf(item)
              this.editedItem = Object.assign({}, item)
              this.dialog = true
          },
          deleteItem (item: regla) {
              const index = this.elements.indexOf(item)
              confirm('¿Estás seguro de que deseas eliminar esta regla?') && this.elements.splice(index, 1) && this.$store.commit('changeReglasNegocio', this.elements);
          },
      }
  })
</script>

<style scoped>

</style>