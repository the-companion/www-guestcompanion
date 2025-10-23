<!-- components/HeroImageSlider.vue -->
<template>
  <div 
    class="relative w-full h-full overflow-hidden"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @mouseenter="pauseOnHover"
    @mouseleave="resumeOnLeave"
  >
    <!-- Image Container -->
    <div class="relative w-full h-full">
      <Transition
        :name="transitionName"
        mode="out-in"
      >
        <div
          :key="currentImageIndex"
          class="absolute inset-0 w-full h-full"
        >
          <img
            :src="images[currentImageIndex].url"
            :alt="images[currentImageIndex].alt"
            class="w-full h-full object-cover transition-transform duration-700"
            loading="lazy"
            @load="onImageLoad"
            @error="onImageError"
          />
          
          <!-- Loading indicator -->
          <div 
            v-if="isLoading"
            class="absolute inset-0 flex items-center justify-center bg-gray-900/50"
          >
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Navigation Dots -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="goToSlide(index)"
        class="w-4 h-4 rounded-full transition-all duration-300"
        :class="[
          index === currentImageIndex
            ? 'bg-white scale-125'
            : 'bg-white/50 hover:bg-white/75'
        ]"
        :aria-label="`Go to slide ${index + 1}`"
      />
    </div>

    <!-- Navigation Arrows -->
    <button
      @click="previousSlide"
      class="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      aria-label="Previous image"
    >
      <Icon name="heroicons:chevron-left" class="w-8 h-8" />
    </button>
    
    <button
      @click="nextSlide"
      class="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      aria-label="Next image"
    >
      <Icon name="heroicons:chevron-right" class="w-8 h-8" />
    </button>

    <!-- Auto-play indicator -->
    <div class="absolute top-6 right-6">
      <button
        @click="toggleAutoPlay"
        class="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
        :aria-label="isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'"
      >
        <Icon 
          :name="isAutoPlaying ? 'heroicons:pause' : 'heroicons:play'" 
          class="w-5 h-5" 
        />
      </button>
    </div>
  </div>
</template>

<script setup>
// High-quality Unsplash images for luxury hotels
const images = ref([
  {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Luxury hotel lobby with elegant design',
    title: 'Luxury Lobby Experience',
    description: 'Experience the grandeur of our elegant hotel lobby'
  },
  {
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    alt: 'Modern hotel room with premium amenities',
    title: 'Premium Accommodations',
    description: 'Relax in our beautifully designed guest rooms'
  },
  {
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Hotel restaurant with sophisticated atmosphere',
    title: 'Fine Dining Experience',
    description: 'Savor exquisite cuisine in our elegant restaurant'
  },
  {
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Hotel spa and wellness center',
    title: 'Wellness & Spa',
    description: 'Rejuvenate your mind and body in our tranquil spa'
  },
  {
    url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Hotel pool area with luxury amenities',
    title: 'Luxury Pool Area',
    description: 'Unwind by our stunning infinity pool with panoramic views'
  }
]);

const currentImageIndex = ref(0);
const isAutoPlaying = ref(true);
const autoPlayInterval = ref(null);
const transitionName = ref('slide-left');
const isLoading = ref(false);

// Auto-play functionality
const startAutoPlay = () => {
  if (autoPlayInterval.value) return;
  
  autoPlayInterval.value = setInterval(() => {
    nextSlide();
  }, 5000); // Change image every 5 seconds
};

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    autoPlayInterval.value = null;
  }
};

const toggleAutoPlay = () => {
  isAutoPlaying.value = !isAutoPlaying.value;
  if (isAutoPlaying.value) {
    startAutoPlay();
  } else {
    stopAutoPlay();
  }
};

// Navigation functions
const nextSlide = () => {
  transitionName.value = 'slide-left';
  isLoading.value = true;
  currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
};

const previousSlide = () => {
  transitionName.value = 'slide-right';
  isLoading.value = true;
  currentImageIndex.value = currentImageIndex.value === 0 
    ? images.value.length - 1 
    : currentImageIndex.value - 1;
};

const goToSlide = (index) => {
  transitionName.value = index > currentImageIndex.value ? 'slide-left' : 'slide-right';
  isLoading.value = true;
  currentImageIndex.value = index;
};

// Image loading handlers
const onImageLoad = () => {
  isLoading.value = false;
};

const onImageError = () => {
  isLoading.value = false;
  console.warn('Failed to load image:', images.value[currentImageIndex.value].url);
};

// Keyboard navigation
const handleKeydown = (event) => {
  if (event.key === 'ArrowLeft') {
    previousSlide();
  } else if (event.key === 'ArrowRight') {
    nextSlide();
  } else if (event.key === ' ') {
    event.preventDefault();
    toggleAutoPlay();
  }
};

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (event) => {
  touchStartX = event.changedTouches[0].screenX;
};

const handleTouchEnd = (event) => {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide(); // Swipe left - next slide
    } else {
      previousSlide(); // Swipe right - previous slide
    }
  }
};

// Lifecycle
onMounted(() => {
  if (isAutoPlaying.value) {
    startAutoPlay();
  }
  
  // Add keyboard event listener
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  stopAutoPlay();
  document.removeEventListener('keydown', handleKeydown);
});

// Pause on hover
const pauseOnHover = () => {
  stopAutoPlay();
};

const resumeOnLeave = () => {
  if (isAutoPlaying.value) {
    startAutoPlay();
  }
};
</script>

<style scoped>
/* Slide transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.7s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Hover effects */
.group:hover .hover\:scale-105 {
  transform: scale(1.05);
}
</style>
