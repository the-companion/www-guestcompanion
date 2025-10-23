<!-- components/TheFooter.vue -->
<template>
  <footer class="bg-gradient-to-r from-[#1D2F27] to-[#243932] text-white py-12">
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
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">
            {{ $t("footer.quickLinks") }}
          </h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link">
              <NuxtLink
                :to="`/#${link}`"
                class="text-gray-400 hover:text-white transition duration-300"
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
              :class="{ 'flex-row-reverse space-x-reverse': isRTL }"
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
  { icon: "mdi:email", value: "contact@digiways.io" },
  { icon: "mdi:phone", value: "+213 560 58 92 26" },
  { icon: "mdi:map-marker", value: "BOIS DES CARS 01, Dely Brahim, ALGERIE" },
];

const socials = [
  // { name: "Twitter", icon: "mdi:twitter", url: "#" },
  {
    name: "LinkedIn",
    icon: "mdi:linkedin",
    url: "https://www.linkedin.com/company/digiways-io",
  },
  {
    name: "Facebook",
    icon: "mdi:facebook",
    url: "https://www.facebook.com/digiways.io",
  },
];
</script>
