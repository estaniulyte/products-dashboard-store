<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
      v-for="product in products"
      :key="product.id"
    >
      <ProductCard
        :product="product"
        :isWishlisted="checkIfWishlisted(product.id)"
        @addToCart="addProductToCart"
        @addToWishlist="addProductToWishlist"
        @removeFromWishlist="removeProductFromWishlist"
      />
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from "vue";
import ProductCard from "./ProductCard.vue";

export default defineComponent({
  name: "ProductGrid",
  props: {
    products: {},
  },
  components: {
    ProductCard,
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
    checkIfWishlisted(id) {
      if (this.$store.state.wishlist.filter((item) => item.id === id).length)
        return true;
      else return false;
    },
  },
});
</script>
