<template>
  <div class="featuresRow">
    <v-row class="fRow">
      <v-col cols="3">
        <v-img
          contain
          src="../../public/icons/poor.png"
          max-height="100"
          class="imgIcon"
        ></v-img>
        <v-card-text class="featureText text-center text-uppercase white--text">
          Pequenas Ações Fazem a diferença! <br />A Wingman está atenta aos
          detalhes.
        </v-card-text>
        <v-card-text class="itemDesc text-uppercase white--text text-center">
          A Wingman não deixa que nenhum detalhe das suas finanças passe
          despercebido.
        </v-card-text>
      </v-col>

      <v-col cols="3">
        <v-img
          contain
          src="../../public/icons/scan.png"
          max-height="100"
          class="imgIcon"
        ></v-img>
        <v-card-text class="featureText text-center text-uppercase white--text">
          Simplifique a sua gestão de despesas com a nossa ferramenta de scan de
          faturas.
        </v-card-text>
        <v-card-text class="itemDesc text-uppercase white--text text-center">
          Gerir despesas nunca foi tão fácil! Disfrute da nossa ferramenta de
          scan de faturas e recibos.
        </v-card-text>
      </v-col>

      <v-col cols="3">
        <v-img
          contain
          src="../../public/icons/investing.png"
          max-height="100"
          class="imgIcon"
        ></v-img>
        <v-card-text class="featureText text-center text-uppercase white--text">
          Uma nova visão da sua gestão financeira! Simples, rápida e cómoda.
        </v-card-text>
        <v-card-text class="itemDesc text-uppercase white--text text-center">
          Gestão financeira descomplicada! Analise os seus rendimentos e
          despesas de forma simples, rápida e cómoda.
        </v-card-text>
      </v-col>
      <v-col cols="3">
        <v-img
          contain
          src="../../public/icons/piggy-bank.png"
          max-height="100"
          class="imgIcon"
        ></v-img>
        <v-card-text class="featureText text-center text-uppercase white--text">
          Poupe para projetos futuros!
          <br />Comece já a poupar para o seu futuro!
        </v-card-text>
        <v-card-text class="itemDesc text-uppercase white--text text-center">
          Projetos futuros e viagens de sonho podem estar mais perto do que
          imagina!
        </v-card-text>
      </v-col>
    </v-row>
  </div>
</template>

<script>
</script>

<style>
.fRow {
  margin: 0% 5% 0% 5% !important;
}

.featuresRow {
  background-color: #7f9dc4;
  padding: 2% !important;
}

.featureText {
  font-weight: 600;
  font-size: 14px;
  font-family: "Sora", sans-serif !important;
}

.itemDesc {
  font-weight: 300;
  font-size: 11px;
  font-family: "Sora", sans-serif !important;
}

.imgIcon {
  padding: 10% !important;
  margin: 0 !important;
}
</style>