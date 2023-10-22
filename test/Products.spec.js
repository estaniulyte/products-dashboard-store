import { mount } from "@vue/test-utils";
import Products from "@/pages/Products.vue";
import Vuetify from "vuetify";

const defaultMock = {
  $t: (msg) => msg,
  $store: {
    state: {
      products: [],
      currentPage: 1,
      itemsPerPage: 3,
      wishlist: [],
    },
    commit: jest.fn(),
  },
};

const defaultWithProductsMock = {
  ...defaultMock,
  $store: {
    state: {
      ...defaultMock.$store.state,
      products: [
        {
          id: 1,
          title: "Product",
          description: "some description",
          price: 10,
          availability: "In Stock",
        },
        {
          id: 2,
          title: "Product2",
          description: "description",
          price: 1200,
          availability: "Out of Stock",
        },
        {
          id: 3,
          title: "Product3",
          description: "description",
          price: 120,
          availability: "In Stock",
        },
        {
          id: 4,
          title: "Product4",
          description: "description",
          price: 100,
          availability: "Out of Stock",
        },
      ],
    },
  },
};

const createProductsWrapper = (options) => {
  const defaultOptions = {
    vuetify: new Vuetify(),
    mocks: {
      ...defaultMock,
      ...options,
    },
  };

  return mount(Products, { ...defaultOptions, ...options });
};

describe("Products", () => {
  it("renders Products view", () => {
    const wrapper = createProductsWrapper();

    expect(wrapper.exists()).toBe(true);
  });

  it("renders empty Products view with 'No items found' message", () => {
    const wrapper = createProductsWrapper();

    const infoBox = wrapper.findComponent({ name: "InfoBox" });

    const infoBoxContent = infoBox.text();

    expect(infoBoxContent).toContain("No items found");
  });

  it("while loading products do not show 'No items found' message", () => {
    const wrapper = createProductsWrapper({
      mocks: {
        ...defaultMock,
        $store: {
          state: {
            ...defaultMock.$store.state,
            loading: true,
          },
        },
      },
    });

    const infoBox = wrapper.findComponent({ name: "InfoBox" });

    const infoBoxContent = infoBox.text();

    expect(infoBoxContent).not.toContain("No items found");
  });

  it("renders loading spinner while loading state is true", () => {
    const wrapper = createProductsWrapper({
      mocks: {
        ...defaultMock,
        $store: {
          state: {
            ...defaultMock.$store.state,
            loading: true,
          },
        },
      },
    });

    const loadingSpinner = wrapper.findComponent({
      name: "v-progress-circular",
    });
    expect(loadingSpinner.exists()).toBe(true);
  });

  it("not renders loading spinner while loading state is false", () => {
    const wrapper = createProductsWrapper({
      mocks: {
        ...defaultMock,
        $store: {
          state: {
            ...defaultMock.$store.state,
            loading: false,
          },
        },
      },
    });

    const loadingSpinner = wrapper.findComponent({
      name: "v-progress-circular",
    });
    expect(loadingSpinner.exists()).not.toBe(true);
  });

  it("not renders products grid when products list empty", () => {
    const wrapper = createProductsWrapper();

    const productGrid = wrapper.findComponent({
      name: "ProductGrid",
    });
    expect(productGrid.exists()).not.toBe(true);
  });

  it("renders search box", () => {
    const wrapper = createProductsWrapper();

    const searchBox = wrapper.findComponent({
      name: "SearchBox",
    });
    expect(searchBox.exists()).toBe(true);
  });

  it("not render pagination component when products list empty", () => {
    const wrapper = createProductsWrapper();

    const pagination = wrapper.findComponent({
      name: "Pagination",
    });
    expect(pagination.exists()).toBe(false);
  });

  it("renders products grid when products list not empty", () => {
    const wrapper = createProductsWrapper({
      mocks: {
        ...defaultWithProductsMock,
      },
    });

    const productGrid = wrapper.findComponent({
      name: "ProductGrid",
    });

    expect(productGrid.exists()).toBe(true);
  });

  it("renders products cards when products list not empty", () => {
    const wrapper = createProductsWrapper({
      mocks: {
        ...defaultWithProductsMock,
      },
    });

    const productCard = wrapper.findComponent({
      name: "ProductCard",
    });
    expect(productCard.exists()).toBe(true);
  });

  it("renders correct number of product cards when page includes less products than itemsPerPage variable", () => {
    const wrapper = createProductsWrapper({
      mocks: {
        ...defaultMock,
        $store: {
          state: {
            ...defaultMock.$store.state,
            itemsPerPage: 5,
            products: [
              {
                id: 1,
                title: "Product",
                description: "some description",
                price: 10,
                availability: "In Stock",
              },
              {
                id: 2,
                title: "Product2",
                description: "description",
                price: 1200,
                availability: "Out of Stock",
              },
              {
                id: 3,
                title: "Product3",
                description: "description",
                price: 120,
                availability: "In Stock",
              },
              {
                id: 4,
                title: "Product4",
                description: "description",
                price: 100,
                availability: "Out of Stock",
              },
            ],
          },
        },
      },
    });

    const productCards = wrapper.findAllComponents({ name: "ProductCard" });

    expect(productCards.length).toBe(4);
  });

  it("renders correct number of product cards per page", () => {
    const wrapper = createProductsWrapper({
      mocks: {
        ...defaultMock,
        $store: {
          state: {
            ...defaultMock.$store.state,
            itemsPerPage: 3,
            products: [
              {
                id: 1,
                title: "Product",
                description: "some description",
                price: 10,
                availability: "In Stock",
              },
              {
                id: 2,
                title: "Product2",
                description: "description",
                price: 1200,
                availability: "Out of Stock",
              },
              {
                id: 3,
                title: "Product3",
                description: "description",
                price: 120,
                availability: "In Stock",
              },
              {
                id: 4,
                title: "Product4",
                description: "description",
                price: 100,
                availability: "Out of Stock",
              },
            ],
          },
        },
      },
    });

    const productCards = wrapper.findAllComponents({ name: "ProductCard" });

    expect(productCards.length).toBe(3);
  });

  it("renders pagination component when products list exist", () => {
    const wrapper = createProductsWrapper({
      mocks: {
        ...defaultWithProductsMock,
      },
    });

    const pagination = wrapper.findComponent({
      name: "Pagination",
    });
    expect(pagination.exists()).toBe(true);
  });
});
