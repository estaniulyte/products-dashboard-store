<template>
  <v-container>
    <SearchBox class="my-4" @search="handleSearch" />
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="product in paginatedProducts"
        :key="product.id"
      >
        <ProductItem :product="product" @addToCart="addProductToCart" />
      </v-col>
    </v-row>
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
import ProductItem from "~/pages/ProductItem.vue";
import SearchBox from "../components/SearchBox.vue";

export default defineComponent({
  name: "Products",
  components: {
    ProductItem,
    SearchBox,
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
    addProductToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    },
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
