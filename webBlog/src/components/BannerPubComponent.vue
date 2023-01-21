<template>
  <div class="bannerPub">
    <v-row no-gutters>
      <v-col cols="12" lg="6" class="py-0">
        <v-card class="leftCard" max-height="700" min-height="700">
          <v-card-title
            class="
              titleText
              
            "
            >Revolucione a forma como encara o seu dinheiro
            tome controlo da sua carteira!</v-card-title
          >

          <!-- empty space 200px -->
          <v-spacer></v-spacer>

          <v-card-subtitle
            class="subText"
          >
            O teu assistente financeiro pessoal, onde quiseres e quando
            quiseres.
          </v-card-subtitle>
          <v-spacer> </v-spacer>
          <div class="imgContainer">
           
              <v-img
                class="imgStores"
                max-width="250"
                src="../../public/stores.png"
              ></v-img>
            
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6">
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

.titleText {
  color: white;
  font-size: 20px;
  font-weight: 600!important;
  /* uppercase */
  text-transform: uppercase;
  /* force text to only break on full words*/
  word-break: break-word;
  /*center text */
  text-align: left;
  padding-top: 50px;
  padding-bottom: 50px;
}

.subText {
  color: white!important;
  font-size: 16px;
  font-weight: 400!important;
  /* uppercase */
  text-transform: uppercase;
  /* force text to only break on full words*/
  word-break: break-word;
  /*center text */
  text-align: left;
  padding-top: 90px;
}

.imgContainer {
  color: white!important;
  width: 100%!important;
  /* align child image to center */
  display: flex!important;
   /* align container to bottom of parent container */
  padding-top: 15%;
}

.imgStores {
 /* align image to center */
  margin: auto!important;
  /* center image */
  display: block!important;
  /* center image */
  margin-left: auto!important;
  /* center image */
  margin-right: auto!important;
  
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

@media only screen and (max-width: 600px) {
.imgContainer {
    display: none;
  }
}
</style>