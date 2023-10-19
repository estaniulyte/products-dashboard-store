<template>
  <v-container>
    <h1 class="mb-4">{{ $t("heading.Cart") }}</h1>
    <div v-if="cartItems.length">
      <v-simple-table class="elevation-1">
        <template v-slot:default>
          <thead>
            <tr>
              <th>{{ $t("table.Title") }}</th>
              <th>{{ $t("table.Price") }}</th>
              <th class="pl-9">{{ $t("table.Amount") }}</th>
              <th>{{ $t("table.Actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id">
              <td>{{ $t("product.title." + item.title) }}</td>
              <td>{{ $formatCurrency(item.price) }}</td>
              <td>
                <div class="">
                  <v-btn icon @click="decrementProductQuantity(item)">
                    <v-icon small>mdi-minus</v-icon>
                  </v-btn>

                  {{ item.quantity }}
                  <v-btn icon @click="incrementProductQuantity(item)">
                    <v-icon small>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </td>
              <td>
                <v-btn icon @click="removeProductFromCart(item)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">{{ $t("table.Total") }}:</td>
              <td class="font-weight-bold">{{ $formatCurrency(total) }}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <br />
      <div class="d-flex flex-row-reverse">
        <v-btn @click="checkout" color="primary py-5 px-9 ml-5">{{
          $t("cart.Checkout")
        }}</v-btn>
        <v-btn @click="clearCart" text color="red">{{
          $t("cart.Clear Cart")
        }}</v-btn>
      </div>
    </div>
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
