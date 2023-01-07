<template>
  <div class="bannerPub">
    <v-row no-gutters>
      <v-col cols="6">
        <v-card class="leftCard" max-height="700" min-height="700">
          <v-card-title
            class="
              font-weight-bold
              text-left text-h4 text-uppercase
              white--text
              cardTitle
            "
            >Revolucione a forma como encara o seu dinheiro,<br />
            tome controlo da sua carteira!</v-card-title
          >

          <!-- empty space 200px -->
          <v-spacer></v-spacer>

          <v-card-subtitle
            class="cardSub text-legt text-h6 text-uppercase white--text"
          >
            O teu assistente financeiro pessoal, onde quiseres e quando
            quiseres.
          </v-card-subtitle>
          <v-spacer> </v-spacer>
          <v-row class="stores">
            <v-col cols="6">
              <v-img
                max-width="315"
                src="../../public/google-play-badge.png"
              ></v-img>
            </v-col>
            <v-col cols="6">
              <v-img max-width="300" src="../../public/iphon.png"></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card class="rightCard" max-height="700" min-height="700">
          <v-img src="../../public/iphone.png"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<style>
.bannerPub {
  background-color: #7f9dc4;
  padding: 0 !important;
  margin: 0 !important;
}

.cardTitle {
  padding: 10% 5% 0% 5% !important;
  margin: 0 !important;
}

.cardSub {
  padding: 20% 5% 0% 5% !important;
  margin: auto !important;
}

.leftCard {
  background-color: #242640 !important;
  padding: 5% !important;
}

.rightCard {
  background-color: #f3deb1 !important;
  padding: 0% !important;
  margin: 0 !important;
}

.stores {
  padding: 10% !important;
  margin: 0 !important;
}
</style>