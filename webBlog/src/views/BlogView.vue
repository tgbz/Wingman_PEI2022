<template>
  <div>
    <NavbarComponent />

    <FooterComponent />
  </div>
</template>
  
  <script>
export default {
  name: "HomeView",
  components: {
    NavbarComponent: () => import("@/components/NavbarComponent.vue"),

    FooterComponent: () => import("@/components/FooterComponent.vue"),
  },
};
</script>