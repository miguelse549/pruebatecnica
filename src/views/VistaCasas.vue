
<template>
  <div
    class="container d-flex align-items-center d-flex justify-content-center alto-100"
  >
    <!-- CARDS VISTA PRINCIPAL TErminada-->
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-3"
        v-for="(casas, i) in arregloCasas"
        :key="i"
      >
        <div class="card mt-5 shadow-lg">
          <img class="imagenCard m-0" :src="imagen" />
          <div class="card-header text-white">
            <div class="mt-4">
              <strong>{{ "Casa " + casas[0] }}</strong>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text text-center">
              Descripción de los Intregrates de la casa
              <strong>{{ casas[0] }}</strong>
            </p>

            <p class="card-text text-center">
              Cantidad Intregrates: <strong>{{ casas[1] }}</strong>
            </p>

            <a href="#" class="btn btn-primary" @click="vistaMiembros(casas[0])"
              >Ver Integrantes</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import vistamiembros from "./VistaMiembros";
import imagen from "../assets/fondo.jpg";

export default {
  name: "VistaCasas",
  props: {
    msg: String,
  },
  data() {
    return {
      datos() {},
      cantidadIntegrantes: null,
      nombreCasa: null,
      imagen: imagen,
      arregloCasas: null,
    };
  },
  components: {
    vistamiembros,
  },
  methods: {
    /**Metodo para obtener los datos del servicio */
    obtenerDatos() {
      axios
        .get("http://hp-api.herokuapp.com/api/characters")
        .then((response) => {
          this.datos = response.data;
          this.agregarCasa(this.datos);
        });
    },

    /*Metod encargado de filtrar las casas por nombre eliminar las que que el dato house 
    esta vacio y de relizar el conteo de los integrantes por cada casa*/

    agregarCasa(casa) {
      console.log(casa);
      var casasMiembros = new Map();

      casa.filter((v) => v.house !== "").map((v) => contarCasas(v.house));

      function contarCasas(casa) {
        if (casasMiembros.get(casa) === undefined) {
          casasMiembros.set(casa, 1);
          return;
        }
        casasMiembros.set(casa, casasMiembros.get(casa) + 1);
      }
      this.arregloCasas = casasMiembros;
    },

    /**Metodo Encargado de Redirigir a la vista de miembros por casa */
    vistaMiembros(casa) {
      this.$router.push({
        name: "VistaMiembros",
        params: {
          nombreCasa: casa,
        },
      });
    },
  },
  created() {
    this.obtenerDatos();
  },
};
</script>
