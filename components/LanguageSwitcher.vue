<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="text-body-1 grey--text text--darken-2 font-weight-medium px-0"
          depressed
          v-bind="attrs"
          v-on="on"
        >
          {{ locale }}
          <v-icon small> mdi-chevron-down </v-icon>
        </v-btn>
      </template>
      <v-list class="pa-0">
        <v-list-item
          class="pa-0"
          v-for="(item, index) in items"
          :key="index"
          link
        >
          <v-btn
            class="px-6 py-1"
            :class="{ 'primary--text': item.slug === $i18n.locale }"
            @click="changeLocale(item.slug)"
            width="100%"
            plain
            block
          >
            {{ item.title }}</v-btn
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
