<template>
  <v-pagination
    v-model="currentPage"
    :length="totalPages"
    @input="changePage"
  ></v-pagination>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    items: {},
  },
  computed: {
    currentPage: {
      get() {
        return this.$store.state.currentPage;
      },
      set(value) {
        this.$store.commit("SET_CURRENT_PAGE", value);
      },
    },
    totalPages() {
      return Math.ceil(this.items.length / this.pageSize);
    },
    pageSize() {
      return this.$store.state.itemsPerPage;
    },
  },
  methods: {
    changePage(value) {
      this.currentPage = value;
    },
  },
});
</script>
