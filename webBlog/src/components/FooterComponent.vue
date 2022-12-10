<template>
  <div class="footer">
    <v-row>
      <v-col cols="8">
        <v-card-subtitle
          class="
            font-weight-bold
            text-center text-h6 text-uppercase
            white--text
            textY
          "
        >
          Torna-te um gestor financeiro mais eficiente e eficaz com a ajuda do
          Wingman
          <br />
          o teu assistente financeiro pessoal.
        </v-card-subtitle>
      </v-col>
      <v-col cols="4" class="bottomCol">
        <v-card-subtitle
          class="font-weight-bold text-center text-uppercase white--text"
        >
          Com o apoio:
        </v-card-subtitle>
        <v-img
          contain
          src="../../public/um.png"
          max-width="100"
          class="imgIcon"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>


<style>
.footer {
  background-color: #242640 !important;
  padding: 0px !important;
  margin-top: 0px;
}

.imgIcon {
  text-align: center !important;
  margin: auto !important;
}

.textY {
  padding-top: 5% !important;
}
</style>