<template>
  <GenericCard>
    <template v-slot:title>
      {{ title }}
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
    <template v-slot:description>
      {{ description }}
    </template>
    <template v-slot:actions>
      <v-btn color="primary" @click="$emit('addToCart', product)"
        >Add to Cart
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
      description: "",
      price: "",
    };
  },
  mounted() {
    ({
      title: this.title,
      description: this.description,
      price: this.price,
    } = this.product);
  },
});
</script>
