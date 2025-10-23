<!-- components/TheContact.vue -->
<template>
  <section id="contact" class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
        {{ $t("contact.title") }}
      </h2>
      <div class="flex flex-col md:flex-row gap-12">
        <!-- Contact Info -->
        <div
          class="md:w-1/2 bg-gradient-to-r from-[#1D2F27] to-[#243932] rounded-lg p-8 text-white"
        >
          <!-- <h3 class="text-lg font-medium mb-2">{{ $t("contact.title") }}</h3> -->
          <h2 class="text-3xl font-bold mb-12">{{ $t("contact.subtitle") }}</h2>

          <div class="space-y-8">
            <div
              v-for="(item, index) in contactInfo"
              :key="index"
              class="flex items-center space-x-4"
              :class="{
                'flex-row-reverse space-x-reverse': $i18n.locale.dir === 'rtl',
              }"
            >
              <div
                class="w-12 h-12 rounded-full bg-[#3B5146] flex items-center justify-center"
              >
                <Icon :name="item.icon" class="w-6 h-6" />
              </div>
              <div>
                <h4 class="font-semibold text-xl">{{ $t(item.title) }}</h4>
                <p class="text-gray-300">{{ $t(item.value) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="md:w-1/2">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="field in formFields"
                :key="field.name"
                class="space-y-2"
              >
                <label class="block text-gray-800">{{
                  $t(`contact.form.${field.name}`)
                }}</label>
                <input
                  :type="field.type"
                  v-model="formData[field.name]"
                  class="w-full p-2 border-b border-gray-300 focus:border-gray-800 outline-none transition-colors"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-gray-800">{{
                $t("contact.form.message")
              }}</label>
              <textarea
                v-model="formData.message"
                rows="4"
                class="w-full p-2 border-b border-gray-300 focus:border-gray-800 outline-none transition-colors resize-none"
              >
              </textarea>
            </div>

            <button
              type="submit"
              class="bg-[#1D2F27] text-white px-8 py-3 rounded-lg hover:bg-[#3B5146] transition duration-300"
            >
              {{ $t("contact.form.send") }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { locale } = useI18n();

const contactInfo = [
  {
    icon: "mdi:map-marker",
    title: "contact.office",
    value: "contact.location",
  },
  {
    icon: "mdi:email",
    title: "contact.email",
    value: "contact@digiways.io",
  },
  {
    icon: "mdi:phone",
    title: "contact.phone",
    value: "+213 560 58 92 26",
  },
];

const formFields = [
  { name: "firstName", type: "text" },
  { name: "lastName", type: "text" },
  { name: "email", type: "email" },
  { name: "phone", type: "tel" },
];

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
});

const handleSubmit = () => {
  console.log("Form submitted:", formData.value);
};
</script>
