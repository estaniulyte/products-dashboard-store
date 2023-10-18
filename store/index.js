function fetchProductsFromAPI() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Laptop",
          description: "High-performance laptop with 16GB RAM and 512GB SSD",
          description_lt:
            "Didelio našumo nešiojamas kompiuteris su 16 GB RAM ir 512 GB SSD",
          price: 1200,
          availability: "In Stock",
        },
        {
          id: 2,
          title: "Smartphone",
          description:
            "Latest model smartphone with a stunning camera and fast processor",
          description_lt:
            "Naujausio modelio išmanusis telefonas su nuostabia kamera ir greitu procesoriumi",
          price: 800,
          availability: "Out of Stock",
        },
        {
          id: 3,
          title: "Headphones",
          description:
            "Wireless over-ear headphones with noise-canceling feature",
          description_lt: "Belaidės ausinės su triukšmo slopinimo funkcija",
          price: 250,
          availability: "In Stock",
        },
        {
          id: 4,
          title: "Smartwatch",
          description:
            "Water-resistant smartwatch with heart rate and sleep tracking",
          description_lt:
            "Vandeniui atsparus išmanusis laikrodis su širdies ritmo ir miego stebėjimu",
          price: 300,
          availability: "In Stock",
        },
        {
          id: 5,
          title: "Tablet",
          description: "10-inch tablet with powerful multitasking capabilities",
          description_lt:
            "10 colių planšetinis kompiuteris su galingomis daugiafunkcinėmis galimybėmis",
          price: 600,
          availability: "Out of Stock",
        },
      ]);
    }, 1000);
  });
}

function processCheckout(cartItems) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      for (const item of cartItems) {
        if (item.quantity <= 0) {
          reject(new Error(`Product with ID ${item.id} has invalid quantity!`));
          return;
        }

        if (item.availability === "Out of Stock") {
          reject(new Error(`Product with ID ${item.id} is out of stock!`));
          return;
        }
      }

      resolve(true);
    }, 2000);
  });
}

export const state = () => ({
  products: [],
  cart: [],
  wishlist: [],
  currentPage: 1,
  itemsPerPage: 3,
});

export const getters = {
  cartTotalPrice: (state) => {
    let total = 0;
    state.cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  },
  productsInCart: (state) => {
    return state.cart;
  },
  productsInWishlist: (state) => {
    return state.wishlist;
  },
};

export const mutations = {
  ADD_PRODUCT_TO_WISHLIST(state, product) {
    const existingProduct = state.wishlist.find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      return;
    } else {
      state.wishlist.push({ ...product });
    }
  },
  ADD_PRODUCT_TO_CART(state, product) {
    const existingProduct = state.cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
  },
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page;
  },
  SET_ITEMS_PER_PAGE(state, page) {
    state.itemsPerPage = page;
  },
  UPDATE_PRODUCT_AVAILABILITY(state, product) {
    const productIndex = state.products.findIndex((p) => p.id === product.id);
    if (productIndex !== -1) {
      state.products[productIndex].availability =
        product.quantity > 0 ? "In Stock" : "Out of Stock";
    }
  },

  REMOVE_PRODUCT_FROM_CART(state, productId) {
    const productIndex = state.cart.findIndex((item) => item.id === productId);
    if (productIndex !== -1) {
      const product = state.cart[productIndex];
      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.cart.splice(productIndex, 1);
      }
    }
  },
  REMOVE_PRODUCT_FROM_WISHLIST(state, productId) {
    const productIndex = state.wishlist.findIndex(
      (item) => item.id === productId
    );
    if (productIndex !== -1) {
      const product = state.wishlist[productIndex];
      if (product) {
        state.wishlist.splice(productIndex, 1);
      }
    }
  },
  CLEAR_CART(state) {
    state.cart = [];
  },
  CLEAR_WISHLIST(state) {
    state.wishlist = [];
  },
  UPDATE_PRODUCT_DETAILS(state, product) {
    const productIndex = state.products.findIndex((p) => p.id === product.id);
    if (productIndex !== -1) {
      state.products[productIndex] = {
        ...state.products[productIndex],
        ...product,
      };
    }
  },
  SET_CART_ITEMS(state, items) {
    state.cart = items;
  },
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  INCREMENT_PRODUCT_QUANTITY(state, productId) {
    const product = state.cart.find((item) => item.id === productId);
    if (product) product.quantity += 1;
  },
  DECREMENT_PRODUCT_QUANTITY(state, productId) {
    const product = state.cart.find((item) => item.id === productId);
    if (product && product.quantity > 1) product.quantity -= 1;
  },
};

export const actions = {
  addProductToCart({ commit, state }, product) {
    if (!state.cart.includes(product)) {
      commit("ADD_PRODUCT_TO_CART", product);
    }

    if (product.quantity > 0) {
      commit("UPDATE_PRODUCT_AVAILABILITY", product);
    }
  },
  addProductToWishlist({ commit, state }, product) {
    if (!state.wishlist.includes(product)) {
      commit("ADD_PRODUCT_TO_WISHLIST", product);
    }
  },
  removeProductFromCart({ commit }, productId) {
    commit("REMOVE_PRODUCT_FROM_CART", productId);
  },
  removeProductFromWishlist({ commit }, productId) {
    commit("REMOVE_PRODUCT_FROM_WISHLIST", productId);
  },
  clearCart({ commit }) {
    commit("CLEAR_CART");
  },
  updateProductDetails({ commit }, product) {
    commit("UPDATE_PRODUCT_DETAILS", product);
  },
  async loadProducts({ commit }) {
    try {
      const products = await fetchProductsFromAPI(); // Using the previously mocked function
      commit("SET_PRODUCTS", products);
    } catch (error) {
      console.error("An error occurred while fetching products:", error);
    }
  },
  async checkout({ commit, state }) {
    const success = await processCheckout(state.cart); // Define this function as per your process
    if (success) {
      commit("CLEAR_CART");
    }
  },
  incrementProductQuantity({ commit }, productId) {
    commit("INCREMENT_PRODUCT_QUANTITY", productId);
  },
  decrementProductQuantity({ commit }, productId) {
    commit("DECREMENT_PRODUCT_QUANTITY", productId);
  },
  setCartItems({ commit }, items) {
    commit("SET_CART_ITEMS", items);
  },
};
