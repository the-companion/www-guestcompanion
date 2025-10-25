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
          class="md:w-1/2 bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 text-white"
        >
          <!-- <h3 class="text-lg font-medium mb-2">{{ $t("contact.title") }}</h3> -->
          <h2 class="text-3xl font-bold mb-12">{{ $t("contact.subtitle") }}</h2>

          <div class="space-y-8">
            <div
              v-for="(item, index) in contactInfo"
              :key="index"
              class="flex items-center gap-4"
              :class="{
                'flex-row-reverse': $i18n.locale.dir === 'rtl',
              }"
            >
              <div
                class="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center"
              >
                <Icon :name="item.icon" class="w-6 h-6" />
              </div>
              <div>
                <h4 class="font-semibold text-xl">{{ $t(item.title) }}</h4>
                <p class="text-gray-300" :class="{ 'ltr': item.icon === 'mdi:phone' }">{{ $t(item.value) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="md:w-1/2">
          <form method="POST" @submit.prevent="handleSubmit" class="space-y-8">
            <input type="hidden" name="access_key" :value="accessKey" />
            <input
              type="checkbox"
              name="botcheck"
              class="hidden"
              style="display: none"
            />

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
                  :name="field.name"
                  v-model="formData[field.name]"
                  class="w-full p-2 border-b border-gray-300 focus:border-gray-800 outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-gray-800">{{
                $t("contact.form.message")
              }}</label>
              <textarea
                name="message"
                v-model="formData.message"
                rows="4"
                class="w-full p-2 border-b border-gray-300 focus:border-gray-800 outline-none transition-colors resize-none"
                required
              >
              </textarea>
            </div>

            <div
              v-if="submitStatus"
              :class="submitStatus.success ? 'text-green-600' : 'text-red-600'"
              class="mt-2"
            >
              {{ submitStatus.message }}
            </div>

            <!-- <button
              type="submit"
              class="bg-[#1D2F27] text-white px-8 py-3 rounded-lg hover:bg-[#3B5146] transition duration-300"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? "Sending..." : $t("contact.form.send") }}
            </button> -->

            <button
              type="submit"
              class="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-black transition duration-300"
              :disabled="isSubmitting"
            >
              {{
                isSubmitting
                  ? $t("contact.form.sending")
                  : $t("contact.form.send")
              }}
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
    value: "contact@guestcompanion.com",
  },
  {
    icon: "mdi:phone",
    title: "contact.phone",
    value: "+1 (514) 419 3322",
  },
];
const formFields = [
  { name: "firstName", type: "text" },
  { name: "lastName", type: "text" },
  { name: "email", type: "email" },
  { name: "phone", type: "tel" },
];

const accessKey = "34c19f58-6198-41f0-b274-2ceb852f87a0"; // Replace with your Web3Forms access key
const isSubmitting = ref(false);
const submitStatus = ref(null);

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  subject: "New Contact Form Submission from Guest Companion",
  from_name: "Guest Companion Website",
});

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        ...formData.value,
        botcheck: undefined,
      }),
    });

    const result = await response.json();

    if (response.status === 200) {
      submitStatus.value = {
        success: true,
        message: "Message sent successfully!",
      };
      // Reset form
      formData.value = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        subject: "New Contact Form Submission from Guest Companion",
        from_name: "Guest Companion Website",
      };
    } else {
      submitStatus.value = {
        success: false,
        message: result.message || "Something went wrong!",
      };
    }
  } catch (error) {
    submitStatus.value = {
      success: false,
      message: "Failed to send message. Please try again.",
    };
  } finally {
    isSubmitting.value = false;
    // Hide status message after 3 seconds
    setTimeout(() => {
      submitStatus.value = null;
    }, 3000);
  }
};
</script>

<style scoped>
.ltr {
  direction: ltr;
  text-align: left;
}
</style>
