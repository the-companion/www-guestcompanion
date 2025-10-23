<!-- components/TheFeatures.vue -->
<template>
  <section id="features" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Hero Header -->
      <div class="text-center mb-16">
        <div class="inline-block px-6 py-2 bg-gray-200 rounded-full mb-6">
          <span class="text-gray-700 text-sm font-medium tracking-wider uppercase">Key Features</span>
        </div>
        <h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          {{ $t("features.title") }}
        </h2>
        <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover the powerful features that transform your hotel into a digital-first experience
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div
          v-for="(feature, key, index) in features"
          :key="key"
          class="group relative"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <!-- Visa-Style Card -->
          <div class="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-gray-200 overflow-hidden card-contour">
            <!-- Card Background Pattern -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-50 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            
            <!-- Card Content -->
            <div class="relative z-10">
              
              <!-- Content -->
              <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                {{ $t(`features.${key}.title`) }}
              </h3>
              <p class="text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors duration-300 mb-6">
                {{ $t(`features.${key}.desc`) }}
              </p>
              
              <!-- Card Action Button -->
              <div class="flex items-center justify-between">
                <div class="flex items-center text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                  <span class="text-sm font-medium mr-2">Learn More</span>
                  <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                
                <!-- Feature Icon Badge -->
                <div class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon :name="feature.icon" class="w-8 h-8 text-gray-600" />
                </div>
              </div>
            </div>
            
            <!-- Card Shine Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center">
        <div class="inline-block bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 card-contour">
          <h3 class="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Hotel?</h3>
          <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
            Experience the future of hotel management with our comprehensive suite of features designed for luxury hospitality.
          </p>
          <a
            href="https://calendly.com/mehdi-atmani/30min"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block bg-gray-900 text-white px-10 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = {
  foodOrdering: { icon: "mdi:food-fork-drink" },
  incidents: { icon: "mdi:alert-circle-outline" },
  activities: { icon: "mdi:calendar-blank" },
  facilities: { icon: "mdi:key-variant" },
  sentiment: { icon: "mdi:emoticon-cool-outline" },
};

// Intersection Observer for animations
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe all feature cards
  document.querySelectorAll('.group').forEach((card) => {
    observer.observe(card);
  });
});
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
  animation: fade-in-up 0.8s ease-out forwards;
}

/* Card hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* Card shine animation */
@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.group:hover .group-hover\:translate-x-full {
  animation: shine 1s ease-out;
}

/* Enhanced shadows for card depth */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Card contour border effect */
.card-contour {
  position: relative;
}

.card-contour::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #e5e7eb, #f3f4f6, #e5e7eb, #d1d5db);
  border-radius: 24px;
  z-index: -1;
  opacity: 0.6;
}

.card-contour:hover::before {
  background: linear-gradient(45deg, #d1d5db, #e5e7eb, #f3f4f6, #d1d5db);
  opacity: 0.8;
}

/* Card border subtle effect */
.border-gray-100 {
  border-color: rgba(243, 244, 246, 0.8);
}

/* Smooth transitions for all interactive elements */
.group {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Card number styling */
.font-mono {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  letter-spacing: 0.05em;
}

/* Gradient backgrounds for subtle depth */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.bg-gradient-to-tr {
  background-image: linear-gradient(to top right, var(--tw-gradient-stops));
}
</style>
