<!-- components/TheVideoSection.vue -->
<template>
  <!-- <section
    id="howItWorks"
    class="py-16 bg-gradient-to-r from-gray-800 to-gray-700"
  > -->

  <section
    id="howItWorks"
    class="py-16 bg-gradient-to-r from-[#1D2F27] to-[#243932]"
  >
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4 text-white">
          {{ $t("video.title") }}
        </h2>
        <p class="text-xl text-gray-300">{{ $t("video.description") }}</p>
      </div>

      <div class="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl">
        <iframe
          :src="videoUrl"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="w-full h-full"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
const { locale } = useI18n();

const videos = {
  en: "https://www.youtube.com/embed/P8tTc-WHtEo",
  fr: "https://www.youtube.com/embed/NVvvWsjyNJI",
  ar: "https://www.youtube.com/embed/P8tTc-WHtEo",
};

const videoUrl = computed(() => videos[locale.value] || videos.en);
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
}

.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
