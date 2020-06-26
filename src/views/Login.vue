<template>
  <v-container fluid>
    <div>
      <v-dialog
              v-model="errorDialog"
              max-width="400"
      >
        <v-card>
          <v-card-title class="headline">
            <v-icon color="error" left>mdi-alert-circle</v-icon>
            Error
          </v-card-title>
      
          <v-card-text>
            <p v-if="errorStatus === 401">Usuario o contraseña incorrectos</p>
            <p v-if="errorStatus !== 401">Ha ocurrido un error inesperado</p>
          </v-card-text>
      
        </v-card>
      </v-dialog>
    </div>
    <v-layout flex align-center justify-center>
      <v-flex sm4 elevation-6>
        <v-toolbar color="blue darken-2" dark>
          <v-spacer></v-spacer>
          <v-icon left large>mdi-account</v-icon>
          <h1>LOGIN</h1>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-form v-model="valid" ref="form" id="loginForm" @submit.prevent="submit">
                <v-text-field
                        label="e-mail"
                        v-model="email"
                        :rules="emailRules"
                        required
                        name="email"
                ></v-text-field>
                <v-text-field
                        label="contraseña"
                        v-model="password"
                        :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="e1 = !e1"
                        :type="e1 ? 'password' : 'text'"
                        :rules="passwordRules"
                        counter
                        required
                        name="password"
                ></v-text-field>
                <v-layout justify-space-between>
                  <v-btn :disabled="!valid" type="submit" form="loginForm" color="success">Iniciar sesión</v-btn>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import {USER_EMAIL, USER_PASSWORD} from "@/config";

  export default Vue.extend({
        name: "Login",
        data () {
            return {
                valid: false,
                e1: true,
                password: '',
                passwordRules: [
                    (v: string) => !!v || 'Password is required',
                ],
                email: '',
                emailRules: [
                    (v: string) => !!v || 'E-mail is required',
                    (v: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                errorDialog: false,
                errorStatus: 0
            }
        },
        methods: {
            async submit () {
                if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
                    const email = this.email;
                    const password = this.password;
                    console.log(USER_EMAIL, USER_PASSWORD);
                    if (email === USER_EMAIL && password === USER_PASSWORD) {
                        this.$store.commit('logged', true);
                        await this.$router.push('/treeview');
                    } else {
                        this.errorDialog = true;
                        this.errorStatus = 401;
                    }
                }
            },
            clear () {
                ((this.$refs.form as Vue & { reset: () => boolean }).reset())
            }
        }
    })
</script>

<style scoped>

</style>