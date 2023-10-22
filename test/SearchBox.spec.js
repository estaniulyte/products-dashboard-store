import SearchBox from "@/components/SearchBox";
import { mount } from "@vue/test-utils";
import Vuetify from "vuetify";

describe("SearchBox", () => {
  let vuetify;
  let wrapper;
  let input;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(SearchBox, {
      vuetify,
      mocks: {
        $t: (msg) => msg,
      },
    });
    input = wrapper.find('input[type="text"]');
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders a SearchBox component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a search input field", () => {
    expect(input.exists()).toBe(true);
  });

  it('emits a "search" event when input changes', async () => {
    await input.setValue("search term");

    expect(wrapper.emitted().search).toBeTruthy();
  });

  it('emits a "search" event with correct input', async () => {
    await input.setValue("search term");

    expect(wrapper.emitted().search[0]).toEqual(["search term"]);
  });

  it('emits a "search" event with incorrect input', async () => {
    await input.setValue("search term");

    expect(wrapper.emitted().search[0]).not.toEqual(["search term33"]);
  });

  it("clears the query when the clear icon is clicked", async () => {
    await input.setValue("search term");
    const clearIcon = wrapper.find("button.mdi-close");

    await clearIcon.trigger("click");

    expect(wrapper.vm.query).toBe(null);
  });
});
