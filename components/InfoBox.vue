<template>
  <div class="grey lighten-5 bg:red red rounded text-center py-5 px-1">
    <p class="text-body-1 mb-2">
      <slot name="header"></slot>
    </p>
    <p class="ma-0 text-body-2">
      <slot name="description"></slot>
    </p>
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InfoBox",
});
</script>
