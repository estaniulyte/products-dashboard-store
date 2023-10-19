<template>
  <v-container>
    <h1 class="mb-4">{{ $t("heading.Cart") }}</h1>
    <v-simple-table v-if="cartItems.length">
      <template v-slot:default>
        <thead>
          <tr>
            <th>{{ $t("table.Title") }}</th>
            <th>{{ $t("table.Price") }}</th>
            <th>{{ $t("table.Actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ $t("product.title." + item.title) }}</td>
            <td>{{ $formatCurrency(item.price) }}</td>
            <td>
              <v-btn icon @click="incrementProductQuantity(item)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn icon @click="decrementProductQuantity(item)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-btn icon @click="$emit('removeFromCart', item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
          <tr>
            <td>{{ $t("table.Total") }}:</td>
            <td>{{ $formatCurrency(total) }}</td>
            <td>
              <v-btn @click="checkout" color="primary">{{
                $t("cart.Checkout")
              }}</v-btn>
              <v-btn @click="clearCart" text color="red">{{
                $t("cart.Clear Cart")
              }}</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <InfoBox v-else>
      <template v-slot:header>{{ $t("cart.No items in cart") }}. </template>
      <template v-slot:description>
        {{ $t("wishlist.Browse") }}
        <router-link to="/products"
          >{{ $t("wishlist.in produts section") }}
        </router-link>
        {{ $t("cart.to add items to cart") }}.
      </template>
    </InfoBox>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import InfoBox from "../components/InfoBox.vue";

export default defineComponent({
  name: "Cart",
  computed: {
    cartItems() {
      return this.$store.getters.productsInCart;
    },
    total() {
      return this.$store.getters.cartTotalPrice;
    },
  },
  methods: {
    incrementProductQuantity(item) {
      this.$store.dispatch("incrementProductQuantity", item.id);
    },
    decrementProductQuantity(item) {
      this.$store.dispatch("decrementProductQuantity", item.id);
    },
    removeProductFromCart(item) {
      this.$store.dispatch("removeProductFromCart", item.id);
    },
    checkout() {
      this.$store.dispatch("checkout");
    },
    clearCart() {
      this.$store.dispatch("clearCart");
    },
  },
  components: { InfoBox },
});
</script>
