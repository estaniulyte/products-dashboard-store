<template>
  <GenericCard>
    <template v-slot:title>
      {{ $t("product.title." + title) }}
    </template>
    <template v-slot:top-actions>
      <v-btn v-if="!isWishlisted" icon @click="$emit('addToWishlist', product)">
        <v-icon> mdi-heart-outline </v-icon>
      </v-btn>
      <v-btn
        v-else
        icon
        color="red"
        @click="$emit('removeFromWishlist', product)"
      >
        <v-icon> mdi-heart </v-icon>
      </v-btn>
    </template>
    <template v-slot:subtitle>
      {{ $formatCurrency(price) }}
    </template>
    <template v-slot:description> {{ description }}. </template>
    <template v-slot:actions>
      <v-btn
        width="100%"
        color="primary"
        @click="$emit('addToCart', product)"
        :disabled="!isAvailable"
      >
        <span v-if="isAvailable">{{ $t("cart.Add to Cart") }}</span>
        <span v-else> {{ $t("cart.Out of stock") }}</span>
      </v-btn>
    </template>
  </GenericCard>
</template>

<script>
import { defineComponent } from "vue";
import GenericCard from "./GenericCard.vue";

export default defineComponent({
  name: "ProductCard",
  comments: {
    GenericCard,
  },
  props: {
    product: {
      type: Object,
    },
    isWishlisted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: "",
      price: "",
    };
  },
  computed: {
    description() {
      const locale = this.$i18n.locale;

      if (locale !== "en") {
        return this.product[`description_${locale}`];
      } else {
        return this.product.description;
      }
    },
    isAvailable() {
      if (this.product.availability === "In Stock") return true;
      else if (this.product.availability === "Out of Stock") return false;
      else return false;
    },
  },
  mounted() {
    ({ title: this.title, price: this.price } = this.product);
  },
});
</script>
