<template>
  <v-card>
    <v-card-title>{{ product.title }}</v-card-title>
    <v-card-subtitle>{{ $formatCurrency(product.price) }}</v-card-subtitle>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="$emit('addToCart', product)"
        >Add to Cart
      </v-btn>
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
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductItem",
  props: {
    product: {
      type: Object,
    },
    isWishlisted: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
