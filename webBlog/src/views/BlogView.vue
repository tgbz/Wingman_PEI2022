<template>
  <div>
    <NavbarComponent />
    <ArticlesComponent/>
    <FooterComponent />
  </div>
</template>
  
  <script>
export default {
  name: "HomeView",
  components: {
    NavbarComponent: () => import("@/components/NavbarComponent.vue"),
    ArticlesComponent: () => import("@/components/ArticlesComponent.vue"),
    FooterComponent: () => import("@/components/FooterComponent.vue"),
  },
};
</script>