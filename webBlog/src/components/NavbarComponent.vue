<template>
  <v-container class="navContainer" fluid>
    <v-row cols="12" lg="6" class="navBar" align="center">
      <v-col cols="6" lg="10">
        <a @click="goToHome()">
          <v-img
            contain
            max-width="230"
            src="../../public/icons/lg.png"
            class="logo"
          >
          </v-img>
        </a>
      </v-col>

      <v-col cols="6" lg="2" class="text-center">
        <v-btn color="#FFCB52" @click="goToBlog()"
          ><strong>Blog</strong>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  
  <script>
export default {
  data() {
    return {
      rotas: [],
    };
  },
  methods: {
    goToBlog() {
      this.$router.push("/blog");
    },
    goToHome() {
      this.$router.push("/wingman");
    },
  },
};
</script>
  
    <style>
* {
  font-family: "Sora", sans-serif !important;
}

.navContainer {
  background-color: #7f9dc4;
}

.navBar {
  margin-left: 50px !important;
  margin-right: 50px !important;

  border-radius: 10px;
}

/* rounded logo */
.logo {
  border-radius: 10px;
}

.navIcon {
  color: #242640 !important;
}

.navText {
  font-weight: 600 !important;
  color: #242640 !important;
}

/* Media query for 600 device width to hide .rightcard */
@media only screen and (max-width: 600px) {
  .rightCard {
    display: none;
  }
}
</style>