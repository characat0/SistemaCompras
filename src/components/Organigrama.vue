<template>
  <div :style="`height: ${height}`">
    <organization-chart :datasource="ds" zoom :zoomin-limit="2" :zoomout-limit="0.5" @node-click="selectModule" :style="`height: ${height}`">
      <template slot-scope="{ nodeData }">
        <v-layout flex align-center justify-center>
          <v-flex :style="`${nodeData.color ? 'border-radius: 8px;' : ''} box-shadow: 0 0 0 2pt ${nodeData.color ? nodeData.color : 'red'}; display: table; text-align: center`">
            <p v-text="nodeData.name" style="display: table-cell; vertical-align: center; padding-top: 7px; padding-bottom: 7px"></p>
          </v-flex>
        </v-layout>
      </template>
    </organization-chart>
  </div>
</template>

<script lang="js">
    import Vue from 'vue'
    import OrganizationChart from 'vue-organization-chart'
    
    import 'vue-organization-chart/dist/orgchart.css'
    export default Vue.extend({
        name: "Organigrama",
        props: {
            'height': { type: String }
        },
        components: {
            OrganizationChart
        },
        data () {
            return {
                ds: {
                    id: 'GERENCIAL',
                    name: 'MÓDULO GERENCIAL',
                    children: [
                        { id: 'PARAMETROS', name: 'MTO. DE PARÁMETROS', color: 'green', children:
                            [
                                { id: 'COMPRAS', name: 'CATÁLOGO DE COMPRAS', color: 'green' },
                                { id: 'REGLAS', name: 'CATÁLOGO DE REGLAS', color: 'green' },
                                { id: 'PROTOCOLOS', name: 'CATÁLOGO DE PROTOCOLOS', color: 'green', children:
                                  [
                                      { id: 'TRANSACCIONES', name: 'TRANSACCIONES', color: 'green', children:
                                        [
                                            { id: 'ACCIONES', name: 'ACCIONES', color: 'green' }
                                        ]
                                      }
                                  ]
                                }
                            ]
                        },
                        { id: 'CONSULTA', name: 'CONSULTA', children:
                            [
                                { id: 'INDICADORES', name: 'INDICADORES' }
                            ]
                        },
                    ]
                }
            }
        },
        methods: {
            selectModule(nodo) {
                if (!nodo.color) return;
                this.changeRoute(`/modulos/${nodo.id.toLowerCase()}`)
            },
            changeRoute(desiredRoute) {
                console.log(this.$route.fullPath, desiredRoute);
                if (this.$route.fullPath !== desiredRoute) {
                    this.$router.push(desiredRoute);
                }
            }
        }
    })
</script>

<style scoped>
  .orgchart-container {
    height: 40em;
  }
</style>