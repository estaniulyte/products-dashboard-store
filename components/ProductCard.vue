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
      <v-btn width="100%" color="primary" @click="$emit('addToCart', product)"
        >{{ $t("cart.Add to Cart") }}
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
  },
  mounted() {
    ({ title: this.title, price: this.price } = this.product);
  },
});
</script>
