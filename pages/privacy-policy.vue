<!-- pages/privacy-policy.vue -->
<template>
  <div class="bg-white py-16 px-4" :dir="$i18n.locale.dir">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 mb-8">
        {{ $t("privacy.title") }}
      </h1>

      <div class="prose max-w-none">
        <!-- Introduction -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            {{ $t("privacy.intro.title") }}
          </h2>
          <p class="text-gray-600 mb-4">{{ $t("privacy.intro.content") }}</p>
        </section>

        <!-- Collection -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            {{ $t("privacy.collection.title") }}
          </h2>
          <p class="text-gray-600 mb-4">
            {{ $t("privacy.collection.content") }}
          </p>
          <ul class="list-disc pl-6 text-gray-600 mb-4">
            <li>{{ $t("privacy.collection.items.item1") }}</li>
            <li>{{ $t("privacy.collection.items.item2") }}</li>
            <li>{{ $t("privacy.collection.items.item3") }}</li>
            <li>{{ $t("privacy.collection.items.item4") }}</li>
          </ul>
        </section>

        <!-- Usage -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            {{ $t("privacy.usage.title") }}
          </h2>
          <p class="text-gray-600 mb-4">{{ $t("privacy.usage.content") }}</p>
          <ul class="list-disc pl-6 text-gray-600 mb-4">
            <li>{{ $t("privacy.usage.items.item1") }}</li>
            <li>{{ $t("privacy.usage.items.item2") }}</li>
            <li>{{ $t("privacy.usage.items.item3") }}</li>
            <li>{{ $t("privacy.usage.items.item4") }}</li>
          </ul>
        </section>

        <!-- Protection -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            {{ $t("privacy.protection.title") }}
          </h2>
          <p class="text-gray-600 mb-4">
            {{ $t("privacy.protection.content") }}
          </p>
        </section>

        <!-- Rights -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            {{ $t("privacy.rights.title") }}
          </h2>
          <p class="text-gray-600 mb-4">{{ $t("privacy.rights.content") }}</p>
          <ul class="list-disc pl-6 text-gray-600 mb-4">
            <li>{{ $t("privacy.rights.items.item1") }}</li>
            <li>{{ $t("privacy.rights.items.item2") }}</li>
            <li>{{ $t("privacy.rights.items.item3") }}</li>
            <li>{{ $t("privacy.rights.items.item4") }}</li>
            <li>{{ $t("privacy.rights.items.item5") }}</li>
          </ul>
        </section>

        <!-- Contact -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            {{ $t("privacy.contact.title") }}
          </h2>
          <p class="text-gray-600 mb-4">{{ $t("privacy.contact.content") }}</p>
          <ul class="text-gray-600 mb-4">
            <li>{{ $t("privacy.contact.email") }}: contact@guestcompanion.com</li>
            <li>{{ $t("privacy.contact.phone") }}: +1 (514) 419 3322</li>
            <li>
              {{ $t("privacy.contact.address") }}: 30 N Gould St, STE R, Sheridan, WYOMING, 82801
            </li>
          </ul>
        </section>

        <!-- Changes -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            {{ $t("privacy.changes.title") }}
          </h2>
          <p class="text-gray-600 mb-4">{{ $t("privacy.changes.content") }}</p>
          <p class="text-gray-600">{{ $t("privacy.changes.lastUpdated") }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();

useHead({
  title:
    locale.value === "ar"
      ? "سياسة الخصوصية - ديجيوايز"
      : locale.value === "fr"
      ? "Politique de Confidentialité - Guest Companion"
      : "Privacy Policy - Guest Companion",
  meta: [
    {
      name: "description",
      content:
        locale.value === "ar"
          ? "سياسة الخصوصية لموقع وخدمات ديجيوايز"
          : locale.value === "fr"
          ? "Politique de confidentialité pour le site web et les services de Guest Companion"
          : "Privacy Policy for Guest Companion website and services",
    },
  ],
});
</script>

<style>
.prose {
  max-width: none;
}

[dir="rtl"] .prose ul {
  padding-right: 1.5rem;
  padding-left: 0;
}
</style>
