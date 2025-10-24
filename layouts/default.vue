<!-- layouts/default.vue -->
<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <TheNavbar />
    <main>
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
const { locale } = useI18n();
const isRTL = computed(() => locale.value === "ar");
</script>
