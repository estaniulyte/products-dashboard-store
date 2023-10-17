<template>
  <v-container>
    <h1 class="mb-4">Wishlist</h1>
    <v-row v-if="wishlistItems.length">
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="product in wishlistItems"
        :key="product.id"
      >
        <ProductItem
          :product="product"
          :isWishlisted="checkIfWishlisted(product.id)"
          @addToCart="addProductToCart"
          @removeFromWishlist="removeProductFromWishlist"
        />
      </v-col>
    </v-row>
    <InfoBox v-else>
      <template v-slot:header> No items in wishlist. </template>
      <template v-slot:description>
        Browse <router-link to="/products">produts list</router-link> to add
        items to favourites.
      </template>
    </InfoBox>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import ProductItem from "~/pages/ProductItem.vue";
import InfoBox from "../components/InfoBox.vue";

export default defineComponent({
  name: "Wishlist",
  components: {
    ProductItem,
  },
  computed: {
    wishlistItems() {
      return this.$store.getters.productsInWishlist;
    },
  },
  methods: {
    removeProductFromWishlist(item) {
      this.$store.dispatch("removeProductFromWishlist", item.id);
    },
    addProductToCart(product) {
      console.log(product);
      this.$store.dispatch("addProductToCart", product);
    },
    checkIfWishlisted(id) {
      if (this.$store.state.wishlist.filter((item) => item.id === id).length)
        return true;
      else return false;
    },
  },
  components: { ProductItem, InfoBox },
});
</script>
