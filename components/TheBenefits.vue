<!-- components/TheBenefits.vue -->
<template>
  <section id="benefits" class="py-16 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4">
      <div
        class="flex flex-col md:flex-row items-center"
        :class="{ 'md:flex-row-reverse': isRTL }"
      >
        <div class="md:w-1/2 mb-8 md:mb-0">
          <img
            src="@/assets/images/demo-1.png"
            alt="Hotel Benefits"
            class="rounded-lg"
          />
        </div>
        <div
          class="md:w-1/2"
          :class="{ 'md:pl-12': !isRTL, 'md:pr-12': isRTL }"
        >
          <h2 class="text-3xl font-bold mb-6 text-gray-800">
            {{ $t("benefits.title") }}
          </h2>
          <div class="space-y-4">
            <div
              v-for="(benefit, index) in benefits"
              :key="index"
              class="flex items-start"
              :class="{ 'flex-row-reverse text-right': isRTL }"
            >
              <div
                class="flex-shrink-0 h-6 w-6 bg-gray-800 rounded-full"
                :class="{ 'ml-4': isRTL, 'mr-4': !isRTL }"
              ></div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800">
                  {{ $t(`benefits.${benefit}.title`) }}
                </h3>
                <p class="text-gray-600">
                  {{ $t(`benefits.${benefit}.desc`) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { locale } = useI18n();
const isRTL = computed(() => locale.value.dir === "rtl");
const benefits = ["experience", "efficiency", "analytics"];
</script>
