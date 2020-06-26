<template>
  <v-container>
    <v-layout align-content-space-around justify-center>
      <v-flex md8>
        <fieldset>
          <legend> Parámetros de cuantía</legend>
          <v-form v-model="valido" ref="form">
            <v-layout flex align-center justify-center>
              <v-flex md6 style="padding-left: 0.5em; padding-right: 0.5em; padding-bottom: 3em">
                <v-select
                        :items="tipoProductos"
                        label="Tipo de producto"
                        v-model="tipoProducto"
                />
              </v-flex>
            </v-layout>
            <v-layout align-content-end justify-end v-for="magnitud in this.tipoMagnitud">
              <v-flex md6 style="padding-left: 0.5em; padding-right: 3em; padding-bottom: 1.5em">
                <v-text-field
                        :label="`Límite de la cuantía para que se considere ${magnitud}`"
                        v-model="parametrosCuantia[nombresTipoProducto[tipoProductos.indexOf(tipoProducto)]][nombresTipoMagnitud[tipoMagnitud.indexOf(magnitud)]]"
                        type="number"
                        :rules="[v => v > 0 || 'Debe ser un número positivo']"
                />
              </v-flex>
            </v-layout>
            <v-divider/>
            <v-layout wrap>
              <v-spacer></v-spacer>
              <v-flex xs12 sm2 d-flex style="padding: 1em">
                <v-btn block color="success" @click="submit">
                  Guardar
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </fieldset>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {PARAMETROS} from "@/config";
  const tipoProductos = Object.values(PARAMETROS.naturaleza);
  const nombresTipoProducto = Object.keys(PARAMETROS.naturaleza);
  const tipoMagnitud = Object.values(PARAMETROS.magnitud);
  const nombresTipoMagnitud = Object.keys(PARAMETROS.magnitud);
  nombresTipoMagnitud.pop()
  tipoMagnitud.pop();

  export default Vue.extend({
      name: "ParametrosCuantia",
      data() {
          return {
              tipoProductos,
              nombresTipoProducto,
              tipoProducto: tipoProductos[0],
              tipoMagnitud,
              parametrosCuantia: this.$store.getters.cuantias,
              nombresTipoMagnitud,
              valido: false
          }
      },
      methods: {
          submit() {
              const valid = (this.$refs.form as Vue & { validate: () => boolean }).validate();
              if (valid) {
                  this.$store.commit('changeCuantias', this.parametrosCuantia);
              }
          }
      }
  })
</script>

<style scoped>

</style>