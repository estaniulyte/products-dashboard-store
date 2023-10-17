<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between">
      <slot name="title"></slot>
      <slot name="top-actions"></slot>
    </v-card-title>
    <v-card-subtitle>
      <slot name="subtitle"></slot>
    </v-card-subtitle>
    <v-card-text>
      <slot name="description"></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "GenericCard",
});
</script>
