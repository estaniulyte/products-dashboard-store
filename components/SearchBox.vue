<template>
  <v-text-field
    v-model="query"
    @input="handleInput"
    prepend-inner-icon="mdi-magnify"
    :label="$t('search.Search')"
    hide-details
    single-line
    justify-sm
    clearable
    solo
  />
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "SearchBox",
  data() {
    return {
      query: "",
    };
  },
  computed: {
    label() {
      return this.$t("search");
    },
  },
  methods: {
    handleInput() {
      this.$emit("search", this.query);
    },
  },
});
</script>
