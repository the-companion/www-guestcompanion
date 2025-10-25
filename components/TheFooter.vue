<!-- components/TheFooter.vue -->
<template>
  <footer class="bg-gradient-to-r from-gray-900 to-black text-white py-12">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <!-- <h3 class="text-xl font-bold mb-4">The Companion</h3> -->
          <img
            src="@/assets/images/logo-white.png"
            alt="Hotel Benefits"
            class="h-8 w-auto mb-3"
          />

          <p class="text-gray-400">{{ $t("footer.description") }}</p>
          
          <!-- Company Attribution -->
          <div class="mt-4 pt-4 border-t border-gray-600">
            <p class="text-sm text-gray-500">
              {{ $t("footer.companyAttribution") }}
              <a 
                href="https://bewisee.com" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
              >
                bewisee.com
              </a>
            </p>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">
            {{ $t("footer.quickLinks") }}
          </h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link">
              <NuxtLink
                :to="`/#${link}`"
                class="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                @click.prevent="scrollToSection(link)"
              >
                {{ $t(`nav.${link}`) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">{{ $t("footer.contact") }}</h4>
          <ul class="space-y-2 text-gray-400">
            <li
              v-for="(contact, index) in contacts"
              :key="index"
              class="flex items-center space-x-2"
            >
              <Icon :name="contact.icon" class="w-5 h-5" />
              <span>{{ contact.value }}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">
            {{ $t("footer.followUs") }}
          </h4>
          <div class="flex space-x-4" :class="{ 'space-x-reverse': isRTL }">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              class="text-gray-400 hover:text-white transition duration-300"
            >
              <Icon :name="social.icon" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <div
          class="mb-4 flex justify-center items-center space-x-4"
          :class="{ 'space-x-reverse': isRTL }"
        >
          <NuxtLink
            to="/privacy-policy"
            class="hover:text-white transition duration-300"
          >
            {{ $t("footer.privacy") }}
          </NuxtLink>
        </div>
        <p>{{ $t("footer.copyright", { year: new Date().getFullYear() }) }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { locale } = useI18n();
const isRTL = computed(() => locale.value.dir === "rtl");

const quickLinks = ["features", "benefits", "contact"];

const contacts = [
  { icon: "mdi:email", value: "contact@guestcompanion.com" },
  { icon: "mdi:phone", value: "+1 (514) 419 3322" },
  { icon: "mdi:map-marker", value: "30 N Gould St, STE R, Sheridan, WYOMING, 82801" },
];

const socials = [
  // { name: "Twitter", icon: "mdi:twitter", url: "#" },
  {
    name: "LinkedIn",
    icon: "mdi:linkedin",
    url: "https://www.linkedin.com/company/guestcompanion",
  },
  {
    name: "Facebook",
    icon: "mdi:facebook",
    url: "https://www.facebook.com/guestcompanion.com",
  },
];

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
</script>
