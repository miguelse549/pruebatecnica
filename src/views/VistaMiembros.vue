
<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-4 col-lg-2 d-flex">
                <select
                  class="form-select mt-2"
                  aria-label=".form-select-sm example"
                  v-model="seleccionado"
                  @change="ordenarCampos(seleccionado)"
                >
                  <option value="null" disabled>Ordenar Por</option>
                  <option value="name">Nombre</option>
                  <option value="lastname">Apellido</option>
                </select>
              </div>

              <div class="col-12 col-lg-3 ms-2 mt-2 d-flex">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Buscar por Nombre"
                  v-model="nombre"
                />
                <button
                  @click="buscarPorNombre()"
                  type="button"
                  class="btn btn-primary ms-1"
                >
                  Buscar
                </button>
                <button
                  @click="limpiarBusqueda()"
                  type="button"
                  class="btn btn-primary ms-2"
                >
                  Limpiar
                </button>
              </div>

              <div class="col col-lg-2">
                <button
                  @click="regresar()"
                  type="button"
                  class="btn btn-light ms-2"
                  sty
                >
                  Regresar
                </button>
              </div>
            </div>
          </div>
          <div
            class="alert alert-success mt-2 text-center"
            role="alert"
            v-if="resultados !== null"
          >
            {{ "Numero de Registros Encontrados " + this.resultados }}
          </div>
          <div class="card-body">
            <div class="row">
              <div
                class="col-12 col-md-6 col-lg-3"
                v-for="(integrantes, a) in datosintegrantes"
                :key="a"
              >
                <!--Card Personajes-->
                <div class="card mt-5 w-100 shadow-lg persona">
                  <div class="imagen text-center">
                    <img
                      :src="(profilepic = integrantes.image)"
                      alt=""
                      class="card-img-top"
                      style="width: 200px; height: 200px"
                    />
                  </div>
                  <div class="card-body text-center miembros text-white">
                    <h6 class="m-0">
                      <Strong>House: </Strong>{{ integrantes.house }}
                    </h6>
                    <h6 class="m-0">
                      <Strong>Name: </Strong>{{ integrantes.fullname }}
                    </h6>
                    <h6 class="m-0">
                      <Strong>Blood Status: </Strong>{{ integrantes.ancestry }}
                    </h6>

                    <h6 class="m-0">
                      <Strong>Species: </Strong>{{ integrantes.species }}
                    </h6>
                    <h6 class="m-0">
                      <Strong>Gender: </Strong>{{ integrantes.gender }}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import vistamiembros from "./VistaMiembros";
const urlImagen = "";
const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": " *",
  },
});
export default {
  name: "VistaCasas",
  props: ["nombreCasa"],

  data() {
    return {
      datosintegrantes() {},
      arregloNuevo: [],
      profilepic: null,
      seleccionado: null,
      nombre: null,
      resultados: null,
      nuevojson: null,
    };
  },
  components: {
    vistamiembros,
  },
  methods: {
    /**Metodo para listar interandes de cada escuela */
    obtenerDatosPorEscuela() {
      axios
        .get(
          "http://hp-api.herokuapp.com/api/characters/house/" + this.nombreCasa
        )
        .then((response) => {
          this.datosintegrantes = response.data;

          for (let persona of this.datosintegrantes) {
            let nombreApellido = persona.name.split(" "); //Variable utilizada para separar la cadena del nombre
            let nombre = nombreApellido[0]; //Variable que almacena el nombre
            let apellido = nombreApellido[1]; //Variable que almacena el apellido

            /**Json que almacena los dos nuevos datos el name, el lastname y el fullname*/
            (this.nuevojson = {
              fullname: persona.name,
              name: nombre,
              lastname: apellido,
              actor: persona.actor,
              alive: persona.alive,
              ancestry: persona.ancestry,
              dateOfBirth: persona.dateOfBirth,
              eyeColour: persona.eyeColour,
              gender: persona.gender,
              hairColour: persona.hairColour,
              hogwartsStaff: persona.hogwartsStaff,
              hogwartsStudent: persona.hogwartsStudent,
              house: persona.house,
              image: persona.image,
              patronus: persona.patronus,
              species: persona.species,
              wand: persona.wand,
              yearOfBirth: persona.yearOfBirth,
            }),
              this.arregloNuevo.push(this.nuevojson);
          }
          this.datosintegrantes = this.arregloNuevo;

          //console.log(JSON.stringify(this.datosintegrantes));
        });
    },

    obtenerImagen() {
      axios;
      this.profilepic = "";
      return axios.get({ responseType: "arraybuffer" });
    },

    ordenarCampos(seleccionado) {
      //alert(seleccionado);
      this.datosintegrantes.sort(this.obtenerNombre(seleccionado));
      //console.log("Ordenado" + JSON.stringify(this.datosintegrantes));
    },

    obtenerNombre(prop) {
      return function (a, b) {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      };
    },

    buscarPorNombre() {
      let texto = this.nombre.toLowerCase();
      console.log(texto);
      let arregloBusqueda = [];

      for (let personas of this.datosintegrantes) {
        if (personas.name.toLowerCase().indexOf(texto) !== -1) {
          arregloBusqueda.push(personas);
        }
      }
      this.datosintegrantes = arregloBusqueda;
      this.resultados = this.datosintegrantes.length;
    },

    limpiarBusqueda() {
      this.nombre = "";
      this.arregloNuevo = [];
      this.resultados = null;
      this.obtenerDatosPorEscuela();
    },

    regresar() {
      this.$router.push({ name: "VistaPrincipal" });
    },
  },
  created() {
    this.obtenerImagen();
    this.obtenerDatosPorEscuela();
    // alert("Vista miembros"+this.nombreCasa)
  },
};
</script>







