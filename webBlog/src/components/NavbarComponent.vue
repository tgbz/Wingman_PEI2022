<template>
  <v-container class="navContainer" fluid>
    <v-row cols="12" class="navBar" align="center">
      <v-col cols="10'">
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

      <v-col cols="1" class="text-right">
        <!-- download button with icon-->
        <v-btn color="#FFCB52">
          <strong>Download</strong>
          <v-icon> mdi-download </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="1" class="text-right">
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
</style>