<template>
  <v-container>
    <v-layout align-content-space-around justify-center>
      <v-flex md8>
        <fieldset>
          <legend>Parámetros de empresa</legend>
          <v-form v-model="valido" ref="form">
            <v-layout align-content-end justify-end>
              <v-flex md6 style="padding-left: 0.5em; padding-right: 3em; padding-bottom: 1.5em">
                <v-text-field
                        label="Nacionalidad de la empresa en operación"
                        v-model="nacionalidad"
                        :rules="[v => !!v || 'No puede ser nulo']"
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
  export default Vue.extend({
      name: "ParametrosEmpresa",
      data() {
          return {
              valido: false,
              nacionalidad: this.$store.getters.nacionalidad
          }
      },
      methods: {
          submit() {
              const valid = (this.$refs.form as Vue & { validate: () => boolean }).validate();
              if (valid) {
                  this.$store.commit('setNacionalidad', this.nacionalidad);
              }
          }
      }
  })
</script>

<style scoped>

</style>