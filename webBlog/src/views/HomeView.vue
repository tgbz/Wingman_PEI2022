<template>
  <div>
    <NavbarComponent />
    <BannerPubComponent />
    <FeaturesComponent />
    <DownloadComponent />
    <FooterComponent />
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {
    NavbarComponent: () => import("@/components/NavbarComponent.vue"),
    BannerPubComponent: () => import("@/components/BannerPubComponent.vue"),
    FeaturesComponent: () => import("@/components/FeaturesComponent.vue"),
    DownloadComponent: () => import("@/components/DownloadComponent.vue"),
    FooterComponent: () => import("@/components/FooterComponent.vue"),
  },
};
</script>