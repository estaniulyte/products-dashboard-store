<template>
  <div>
    <v-list>
      <v-list-item v-for="item in cartItems" :key="item.id">
        <v-list-item-content>
          <p>
            {{ $t("product.title." + item.title) }} -
            {{ $formatCurrency(item.price) }} ({{ item.quantity }})
          </p>
        </v-list-item-content>
      </v-list-item>
        <p>{{ $t("table.Total") }}: {{ $formatCurrency(total) }}</p>
        <v-btn to="/cart" color="primary" depressed width="100%">{{
          $t("cart.View Cart")
        }}</v-btn>
    </v-list>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CartDetails',
  computed: {
    ...mapGetters(['productsInCart', 'cartTotalPrice']),
    cartItems() {
      return this.productsInCart;
    },
    total() {
      return this.cartTotalPrice;
    },
  },
});
</script>
