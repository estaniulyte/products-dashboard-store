<template>
  <v-container>
    <h1 class="mb-4">{{ $t("heading.Products") }}</h1>
    <SearchBox class="mb-4" @search="handleSearch" />
    <ProductGrid
      v-if="paginatedProducts.length"
      :products="paginatedProducts"
    />
    <InfoBox v-else-if="isLoading">
      <v-progress-circular
        class="text-center"
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </InfoBox>
    <InfoBox v-else-if="!isLoading && !searchQuery.length">
      <template v-slot:header>{{ $t("search.No items found") }}</template>
      <template v-slot:description
        >{{ $t("search.Try to reload the page or come back later") }}.</template
      >
    </InfoBox>
    <InfoBox v-else-if="searchQuery.length">
      <template v-slot:header>
        '
        <b>{{ searchQuery }}</b> ' {{ $t("search.returned no results") }}..
      </template>
      <template v-slot:description>
        {{ $t("search.Try again using a different term") }}.
      </template>
    </InfoBox>
    <Pagination
      v-if="filteredProducts.length"
      :items="filteredProducts"
      class="my-3"
    />
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import ProductCard from "../components/ProductCard.vue";
import SearchBox from "../components/SearchBox.vue";
import InfoBox from "../components/InfoBox.vue";
import ProductGrid from "../components/ProductGrid.vue";
import Pagination from "../components/Pagination.vue";

export default defineComponent({
  name: "Products",
  components: {
    ProductCard,
    SearchBox,
    InfoBox,
    ProductGrid,
    Pagination,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    isLoading() {
      return this.$store.state.loading;
    },
    currentPage: {
      get() {
        return this.$store.state.currentPage;
      },
      set(value) {
        this.$store.commit("SET_CURRENT_PAGE", value);
      },
    },
    pageSize() {
      return this.$store.state.itemsPerPage;
    },
    filteredProducts() {
      let tempProducts = [...this.products];
      if (this.searchQuery != "" && this.searchQuery) {
        return tempProducts.filter((product) => {
          const query = this.searchQuery.toLowerCase();
          return (
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
          );
        });
      }
      return tempProducts;
    },
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredProducts.slice(startIndex, endIndex);
    },
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
      this.currentPage = 1;
    },
  },
});
</script>
