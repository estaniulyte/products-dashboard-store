import { mount } from "@vue/test-utils";
import InfoBox from "@/components/InfoBox.vue";

describe("InfoBox", () => {
  it("renders InfoBox component", () => {
    const wrapper = mount(InfoBox);

    expect(wrapper.exists()).toBe(true);
  });
  it("renders header and description slots", () => {
    const wrapper = mount(InfoBox, {
      slots: {
        header: "<p>Header Slot Content</p>",
        description: "<div>Description Slot Content</div>",
      },
    });

    const headerSlot = wrapper.find("p").text();
    const descriptionSlot = wrapper.find("div").text();

    expect(headerSlot).toContain("Header Slot Content");
    expect(descriptionSlot).toContain("Description Slot Content");
  });

  it("renders default content slot", () => {
    const wrapper = mount(InfoBox, {
      slots: {
        default: "<div>Default Slot Content</div>",
      },
    });
    const defaultSlot = wrapper.find("div").text();

    expect(defaultSlot).toContain("Default Slot Content");
  });
});
