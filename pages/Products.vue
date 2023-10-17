<template>
  <v-container>
    <h1 class="mb-4">Products</h1>
    <SearchBox class="mb-4" @search="handleSearch" />
    <ProductGrid v-if="paginatedProducts.length" :products="paginatedProducts">
    </ProductGrid>
    <div v-else>Loading products...</div>
    <v-pagination
      v-if="filteredProducts.length"
      v-model="currentPage"
      :length="totalPages"
      @input="changePage"
    ></v-pagination>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import ProductCard from "../components/ProductCard.vue";
import SearchBox from "../components/SearchBox.vue";
import InfoBox from "../components/InfoBox.vue";
import ProductGrid from "../components/ProductGrid.vue";

export default defineComponent({
  name: "Products",
  components: {
    ProductCard,
    SearchBox,
    InfoBox,
    ProductGrid,
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
    currentPage: {
      get() {
        return this.$store.state.currentPage;
      },
      set(value) {
        this.$store.commit("SET_CURRENT_PAGE", value);
      },
    },
    pageSize() {
      return 3;
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.pageSize);
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
    changePage(value) {
      this.currentPage = value;
    },
    handleSearch(query) {
      this.searchQuery = query;
      this.currentPage = 1;
    },
  },
});
</script>
