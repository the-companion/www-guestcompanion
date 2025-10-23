<!-- layouts/default.vue -->
<template>
  <div :dir="$i18n.locale.dir">
    <TheNavbar />
    <main>
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
const { locale } = useI18n();
</script>
