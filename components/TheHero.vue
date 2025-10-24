<!-- components/TheHero.vue -->
<template>
  <section id="home" class="relative h-screen overflow-hidden">
    <!-- Full-screen image slider -->
    <HeroImageSlider class="absolute inset-0" />
    
    <!-- Text overlay -->
    <div 
      class="absolute inset-0 flex items-center"
      :class="isRTL ? 'bg-gradient-to-l from-black/50 via-black/30 to-transparent' : 'bg-gradient-to-r from-black/50 via-black/30 to-transparent'"
    >
      <div class="max-w-6xl mx-auto px-4 w-full">
        <div 
          class="text-white text-center"
          :class="isRTL ? 'md:text-right' : 'md:text-left'"
        >
          <div class="animate-fade-in-up">
            <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
              {{ $t("hero.title") }}
            </h1>
            <p 
              class="text-xl md:text-3xl mb-8 text-gray-200 leading-relaxed max-w-3xl drop-shadow-lg"
              :class="isRTL ? 'mx-auto md:mr-0 md:ml-auto' : 'mx-auto md:mx-0'"
            >
              {{ $t("hero.subtitle") }}
            </p>
            <a
              href="https://calendly.com/mehdi-atmani/30min"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block bg-white text-gray-800 px-10 py-5 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105"
            >
              {{ $t("hero.bookDemo") }}
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div 
      class="absolute bottom-8 text-white animate-bounce"
      :class="isRTL ? 'right-8' : 'left-1/2 transform -translate-x-1/2'"
    >
      <div class="flex flex-col items-center">
        <span class="text-sm mb-2 opacity-75">Scroll to explore</span>
        <Icon name="heroicons:chevron-down" class="w-6 h-6" />
      </div>
    </div>
  </section>
</template>

<script setup>
const { locale } = useI18n();
const isRTL = computed(() => locale.value === "ar");
</script>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}
</style>
