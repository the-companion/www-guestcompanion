<!-- components/TheFeatures.vue -->
<!-- <template>
  <section id="features" class="py-16 bg-white text-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
        {{ $t("features.title") }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(feature, key) in features"
          :key="key"
          class="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition duration-300"
        >
          <div
            class="w-16 h-16 mb-4 bg-gray-800 rounded-lg flex items-center justify-center"
          >
            <Icon :name="feature.icon" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-800">
            {{ $t(`features.${key}.title`) }}
          </h3>
          <p class="text-gray-600">
            {{ $t(`features.${key}.desc`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template> -->

<template>
  <section id="features" class="py-16 bg-white text-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
        {{ $t("features.title") }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <!-- Changed this line -->
        <div
          v-for="(feature, key) in features"
          :key="key"
          class="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition duration-300"
        >
          <div
            class="w-16 h-16 mb-4 bg-gradient-to-r from-[#1D2F27] to-[#243932] rounded-lg flex items-center justify-center"
          >
            <Icon :name="feature.icon" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-800">
            {{ $t(`features.${key}.title`) }}
          </h3>
          <p class="text-gray-600 text-sm">
            <!-- Added text-sm for better fit -->
            {{ $t(`features.${key}.desc`) }}
          </p>
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
  sentiment: { icon: "mdi:emoticon-cool-outline" }, // Added new feature
};
</script>
