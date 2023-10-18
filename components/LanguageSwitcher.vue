<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn depressed v-bind="attrs" v-on="on">
          {{ locale }}
          <v-icon small> mdi-chevron-down </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" link>
          <v-list-item-title @click="changeLocale(item.slug)" class="px-2">
            {{ item.title }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LanguageSwitcher",
  data: () => ({
    items: [
      { slug: "en", title: "English", short: "EN" },
      { slug: "lt", title: "Lithuanian", short: "LT" },
    ],
  }),
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    },
  },
});
</script>
