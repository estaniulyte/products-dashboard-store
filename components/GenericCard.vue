<template>
  <v-card height="100%" class="d-flex flex-column">
    <v-card-title class="d-flex justify-space-between text-h6">
      <v-row>
        <v-col cols="9" max-width="90%" class="text-no-wrap overflow-hidden">
          <slot name="title"></slot>
        </v-col>
        <v-col cols="3" class="d-flex justify-end">
          <slot name="top-actions"></slot>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle class="mt-1">
      <slot name="subtitle"></slot>
    </v-card-subtitle>
    <v-card-text class="overflow-hidden text-wrap hide-text-overflow">
      <slot name="description"></slot>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions class="d-flex pa-3 align-end my-1" width="100%">
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

<style>
.hide-text-overflow {
  overflow: hidden;
  max-height: 45px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: nowrap;
}
</style>
