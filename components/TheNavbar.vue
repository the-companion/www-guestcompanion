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
            class="font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
            :class="[
              isScrolled 
                ? 'text-gray-700 hover:text-gray-900' 
                : 'text-white hover:text-gray-200'
            ]"
            @click.prevent="scrollToSection(item)"
          >
            {{ $t(`nav.${item}`) }}
          </NuxtLink>
        </div>

        <div
          class="flex items-center space-x-4"
          :class="{ 'space-x-reverse': isRTL }"
        >
          <!-- Language Selector -->
          <div class="relative" ref="languageDropdown">
            <button
              @click="toggleLanguageDropdown"
              class="flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              :class="[
                isScrolled 
                  ? 'text-gray-700 bg-white/80 hover:bg-white border border-gray-200' 
                  : 'text-white bg-white/20 hover:bg-white/30 border border-white/30'
              ]"
            >
              <span class="text-lg">{{ getCurrentLanguageFlag() }}</span>
              <span class="text-sm">{{ getCurrentLanguageName() }}</span>
              <Icon 
                :name="isLanguageDropdownOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" 
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': isLanguageDropdownOpen }"
              />
            </button>
            
            <!-- Language Dropdown Menu -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-if="isLanguageDropdownOpen"
                class="absolute top-full mt-2 right-0 bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-lg py-2 min-w-[160px] z-50"
                :class="{ 'right-auto left-0': isRTL }"
              >
                <button
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  @click="switchLanguage(locale.code)"
                  class="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200"
                  :class="{ 'bg-gray-50': locale.code === currentLocale }"
                >
                  <span class="text-lg">{{ getLanguageFlag(locale.code) }}</span>
                  <span class="text-sm font-medium text-gray-700">{{ getLanguageName(locale.code) }}</span>
                  <span class="text-xs text-gray-500 ml-auto">{{ locale.code.toUpperCase() }}</span>
                </button>
              </div>
            </Transition>
          </div>
          
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
            @click="closeMobileMenu(); scrollToSection(item)"
          >
            {{ $t(`nav.${item}`) }}
          </NuxtLink>
          
          <!-- Mobile Language Selector -->
          <div class="border-t border-gray-200 pt-4 mt-4">
            <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              {{ $t('nav.language') }}
            </div>
            <div class="space-y-2">
              <button
                v-for="locale in availableLocales"
                :key="locale.code"
                @click="switchLanguage(locale.code); closeMobileMenu()"
                class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors duration-200"
                :class="{ 'bg-gray-50 border border-gray-200': locale.code === currentLocale }"
              >
                <span class="text-lg">{{ getLanguageFlag(locale.code) }}</span>
                <span class="text-sm font-medium text-gray-700">{{ getLanguageName(locale.code) }}</span>
                <span class="text-xs text-gray-500 ml-auto">{{ locale.code.toUpperCase() }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { locale, locales } = useI18n();
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();

const currentLocale = computed(() => locale.value);

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

// Language dropdown state
const isLanguageDropdownOpen = ref(false);
const languageDropdown = ref(null);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value;
};

// Language helper functions
const getLanguageFlag = (code) => {
  const flags = {
    en: '🇺🇸',
    fr: '🇫🇷',
    ar: '🇸🇦'
  };
  return flags[code] || '🌐';
};

const getLanguageName = (code) => {
  const names = {
    en: 'English',
    fr: 'Français',
    ar: 'العربية'
  };
  return names[code] || code;
};

const getCurrentLanguageFlag = () => {
  return getLanguageFlag(currentLocale.value);
};

const getCurrentLanguageName = () => {
  return getLanguageName(currentLocale.value);
};

// Smooth scroll function
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbarHeight = 64; // Height of the fixed navbar
    const elementPosition = element.offsetTop - navbarHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (languageDropdown.value && !languageDropdown.value.contains(event.target)) {
    isLanguageDropdownOpen.value = false;
  }
};

// Watch for locale changes to ensure persistence
watch(locale, (newLocale, oldLocale) => {
  if (newLocale !== oldLocale) {
    console.log('Locale changed from', oldLocale, 'to', newLocale);
    // Store the locale preference in localStorage
    if (process.client) {
      localStorage.setItem('preferred-locale', newLocale);
    }
  }
});

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
  };
  
  // Restore locale from localStorage if available
  if (process.client) {
    const savedLocale = localStorage.getItem('preferred-locale');
    if (savedLocale && savedLocale !== locale.value) {
      console.log('Restoring saved locale:', savedLocale);
      locale.value = savedLocale;
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('click', handleClickOutside);
  });
});

async function switchLanguage(newLocale) {
  isLanguageDropdownOpen.value = false;
  
  try {
    // Use the setLocale method from i18n for proper locale switching
    const { setLocale } = useI18n();
    await setLocale(newLocale);
    
    // Navigate to the new locale path if needed
    const path = switchLocalePath(newLocale);
    if (path && path !== router.currentRoute.value.path) {
      await router.push(path);
    }
  } catch (error) {
    console.error('Error switching language:', error);
    // Fallback to the original method
    await router.push(switchLocalePath(newLocale));
  }
}
</script>
