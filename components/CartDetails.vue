<template>
  <div>
    <v-list>
      <v-list-item v-if="cartItems" v-for="item in cartItems" :key="item.id">
        <v-list-item-content>
          <p>
            {{ $t("product.title." + item.title) }} -
            {{ $formatCurrency(item.price) }} ({{ item.quantity }})
          </p>
        </v-list-item-content>
      </v-list-item>
      <InfoBox v-if="!total">
        <template v-slot:header>{{ $t("cart.No items in cart") }}. </template>
      </InfoBox>

      <v-divider></v-divider>
      <v-list-item v-if="total">
        <p>{{ $t("table.Total") }}: {{ $formatCurrency(total) }}</p>
      </v-list-item>
      <v-list-item>
        <v-btn to="/cart" color="primary" depressed width="100%">{{
          $t("cart.View Cart")
        }}</v-btn>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import InfoBox from "./InfoBox.vue";

export default defineComponent({
  name: "CartDetails",
  computed: {
    ...mapGetters(["productsInCart", "cartTotalPrice"]),
    cartItems() {
      return this.productsInCart;
    },
    total() {
      return this.cartTotalPrice;
    },
  },
  components: { InfoBox },
});
</script>
