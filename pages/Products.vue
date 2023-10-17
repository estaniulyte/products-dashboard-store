<template>
  <v-container>
    <h1 class="mb-4">Products</h1>
    <SearchBox class="mb-4" @search="handleSearch" />
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="product in paginatedProducts"
        :key="product.id"
      >
        <ProductItem
          :product="product"
          :isWishlisted="checkIfWishlisted(product.id)"
          @addToCart="addProductToCart"
          @addToWishlist="addProductToWishlist"
          @removeFromWishlist="removeProductFromWishlist"
        />
      </v-col>
      <v-col v-if="!filteredProducts.length && searchQuery.length">
        <InfoBox>
          <template v-slot:header>
            Unfortunately, your search for ' <b>{{ searchQuery }}</b> ' returned
            no results..
          </template>
          <template v-slot:description>
            Try again using a different term.
          </template>
        </InfoBox>
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
import InfoBox from "../components/InfoBox.vue";

export default defineComponent({
  name: "Products",
  components: {
    ProductItem,
    SearchBox,
    InfoBox,
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
    addProductToWishlist(product) {
      this.$store.dispatch("addProductToWishlist", product);
    },
    removeProductFromWishlist(item) {
      this.$store.dispatch("removeProductFromWishlist", item.id);
    },
    changePage(value) {
      this.currentPage = value;
    },
    handleSearch(query) {
      this.searchQuery = query;
      this.currentPage = 1;
    },
    checkIfWishlisted(id) {
      if (this.$store.state.wishlist.filter((item) => item.id === id).length)
        return true;
      else return false;
    },
  },
});
</script>
