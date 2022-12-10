<template>
  <v-container class="navContainer" fluid>
    <v-row cols="12" class="navBar" align="center" justify="center">
      <v-col>
        <v-img
          contain
          max-width="230"
          src="../../public/icons/lg.png"
          class="logo"
        >
        </v-img>
      </v-col>

      <v-col
        v-for="rota in rotas"
        :key="rota.name"
        :href="rota.link"
        class="navItem"
      >
        <v-card-subtitle class="navItem text-center font-weight-medium">
          <v-icon left class="navIcon">{{ rota.icon }}</v-icon>
          <span class="navText">{{ rota.name }}</span>
        </v-card-subtitle>
      </v-col>
      <v-col>
        <v-btn color="#242640" dark><strong>Download App!</strong> </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  
  <script>
export default {
  data() {
    return {
      rotas: [
        { name: "Home", icon: "mdi-home", link: "/home" },
        { name: "Funcionalidades", icon: "mdi-information", link: "/sobre" },
        { name: "Ajuda", icon: "mdi-phone", link: "/contato" },
      ],
    };
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