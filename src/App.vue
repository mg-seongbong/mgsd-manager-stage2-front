<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script setup>
import Header from './views/layout/HeaderView.vue';
import Footer from './views/layout/FooterView.vue';
</script>
