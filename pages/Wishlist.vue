<template>
  <v-container>
    <h1 class="mb-4">{{ $t("heading.Wishlist") }}</h1>
    <ProductGrid v-if="wishlistItems.length" :products="wishlistItems" />
    <InfoBox v-else>
      <template v-slot:header
        >{{ $t("wishlist.No items in wishlist") }}.
      </template>
      <template v-slot:description>
        {{ $t("wishlist.Browse") }}
        <router-link to="/products"
          >{{ $t("wishlist.in produts section") }}
        </router-link>
        {{ $t("wishlist.to add items to favourites") }}.
      </template>
    </InfoBox>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import ProductCard from "../components/ProductCard.vue";
import ProductGrid from "../components/ProductGrid.vue";
import InfoBox from "../components/InfoBox.vue";

export default defineComponent({
  name: "Wishlist",
  components: {
    ProductCard,
    InfoBox,
    ProductGrid,
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
      this.$store.dispatch("addProductToCart", product);
    },
    checkIfWishlisted(id) {
      if (this.$store.state.wishlist.filter((item) => item.id === id).length)
        return true;
      else return false;
    },
  },
});
</script>
