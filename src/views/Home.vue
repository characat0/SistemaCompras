<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
                src="/img/uni.png"
                class="my-3"
                contain
                height="300"
        />
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Universidad Nacional de Ingeniería
        </h1>
      </v-col>
      <v-col
              class="mb-5"
              cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Diseño de base de datos
        </h2>
        <v-container style="min-width: 40vw; max-width: 20em; text-align: justify">
          <p>
            Prototipo de módulos para el primer entregable del curso diseño de base de datos,
            consta del módulo ONLINE de la arquitectura.
          </p>
          <ol>
            <li class="headline">Seguridad</li>
            La parte de seguridad del diseño arquitectónico del sistema de compras tendrá por función restringir el
            acceso a los datos en los módulos. Esta restricción se dará de acuerdo al perfil del usuario.
            <li class="headline">Mantenimiento de parámetros</li>
            Este módulo define los escenarios de negocio, se subdivide en:
            <ul>
              <li>Catálogo de compras</li>
              <li>Catálogo de reglas</li>
              <li>Catálogo de protocolos</li>
            </ul>
          </ol>
          <p>
          
          </p>
        </v-container>
      </v-col>
      <v-col
              class="mb-2"
      >
        <h2 class="headline font-weight-bold mb-2">
          Docente
        </h2>
        <v-container style="min-width: 40vw; max-width: 20em; text-align: justify">
          <p style="text-align: center" class="headline mb-2">
            Tino Eduardo Reyna Monteverde
          </p>
        </v-container>
      </v-col>
      <v-col
              class="mb-2"
      >
        <h2 class="headline font-weight-bold mb-2">
          Alumnos
        </h2>
        <v-container style="min-width: 40vw; max-width: 20em; text-align: justify">
          <li>Vela Rodriguez, Marco Antonio <a v-text="`(GitHub)`" href="https://github.com/MarcoVela"/></li><br/>
          <li>Rojas Asparrin, Anthony Daniel</li><br/>
          <li>Ginocchio Manutupa, Rosa Angélica</li>
        </v-container>
      </v-col>

    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
      name: 'Home',
  })
</script>
