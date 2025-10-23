<!-- components/TheNavbar.vue -->
<template>
  <nav 
    class="fixed w-full z-50 transition-all duration-300"
    :class="[
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20' 
        : 'bg-transparent backdrop-blur-sm'
    ]"
  >
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- <NuxtLink to="/" class="text-2xl font-bold text-gray-800">
          {{ $t("nav.title") }}
        </NuxtLink> -->
        <NuxtLink to="/" class="flex items-center">
          <img
            :src="logoUrl"
            alt="Hotel Benefits"
            class="h-10 w-auto transition-all duration-300"
          />
        </NuxtLink>

        <div
          class="hidden md:flex space-x-8"
          :class="{ 'space-x-reverse': isRTL }"
        >
          <NuxtLink
            v-for="item in navItems"
            :key="item"
            :to="`/#${item}`"
            class="font-medium transition-all duration-300 hover:scale-105"
            :class="[
              isScrolled 
                ? 'text-gray-700 hover:text-gray-900' 
                : 'text-white hover:text-gray-200'
            ]"
          >
            {{ $t(`nav.${item}`) }}
          </NuxtLink>
        </div>

        <div
          class="flex items-center space-x-4"
          :class="{ 'space-x-reverse': isRTL }"
        >
          <select
            v-model="currentLocale"
            class="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-2 font-medium transition-all duration-300 hover:bg-white/30"
            :class="[
              isScrolled 
                ? 'text-gray-700 border-gray-300 bg-white/80' 
                : 'text-white border-white/30'
            ]"
            @change="switchLanguage"
          >
            <option
              v-for="locale in availableLocales"
              :key="locale.code"
              :value="locale.code"
            >
              {{
                locale.code === "en"
                  ? "English"
                  : locale.code === "fr"
                  ? "Français"
                  : "العربية"
              }}
            </option>
          </select>
          
          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg transition-all duration-300"
            :class="[
              isScrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/20'
            ]"
          >
            <Icon :name="isMobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <!-- Mobile menu dropdown -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20 shadow-lg"
      >
        <div class="px-4 py-4 space-y-4">
          <NuxtLink
            v-for="item in navItems"
            :key="item"
            :to="`/#${item}`"
            class="block text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300"
            @click="closeMobileMenu"
          >
            {{ $t(`nav.${item}`) }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { locale, locales } = useI18n();
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();

const currentLocale = computed({
  get: () => locale.value,
  set: () => {},
});

const availableLocales = computed(() => locales.value);
const isRTL = computed(() => currentLocale.value === "ar");
const navItems = ["home", "features", "howItWorks", "benefits", "contact"];

// Scroll detection for navbar transparency
const isScrolled = ref(false);

// Logo URL computed property
const logoUrl = computed(() => {
  return isScrolled.value 
    ? '/images/logo.png' 
    : '/images/logo-white.png';
});

// Mobile menu state
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
  };
  
  window.addEventListener('scroll', handleScroll);
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

async function switchLanguage(event) {
  const newLocale = event.target.value;
  await router.push(switchLocalePath(newLocale));
}
</script>
