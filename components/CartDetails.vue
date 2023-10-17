<template>
  <div>
    <v-list>
      <v-list-item v-for="item in cartItems" :key="item.id">
        <v-list-item-content>
          <p>{{ item.title }} - {{ item.price }} ({{ item.quantity }})</p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <p>Total: {{ total }}</p>
    <v-btn to="/cart" color="primary" depressed>View Cart</v-btn>
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
