<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Index',
  data: () => ({
    tasks: [
      {
        title: 'Implement Product Search Functionality',
        description: 'Add a search bar that allows users to filter the product list based on title or description.',
      },
      {
        title: 'Optimize for Mobile Devices',
        description: 'Refactor the existing code to ensure that the app is fully responsive and provides an excellent user experience on mobile devices.',
      },
      {
        title: 'Implement Internationalization (i18n)',
        description: 'Integrate internationalization into the application so that it can be easily translated into different languages.',
      },
      {
        title: 'Add Wishlist Feature 50/50',
        description: 'Implement a wishlist feature where users can add products they want to save for later. Include an interface for viewing and managing the wishlist.',
      },
      {
        title: 'Refactor the Currency Filter to a Global Utility',
        description: 'Since the currency formatting is used in multiple places, refactor it into a global utility or plugin.',
      },
      {
        title: 'Create Unit Tests for Key Components',
        description: 'Write unit tests for critical components such as the cart, product list, and checkout process.',
      },
      {
        title: 'Refactor Product Structure and Componentization',
        description: 'Review the existing product structure and naming conventions, identifying areas that can be optimized. Split repetitive code into reusable child components and ensure that naming is consistent and descriptive throughout the application.',
      },
    ]
  })
});
</script>

<template>
    <v-list two-line subheader>
      <v-subheader>Tasks</v-subheader>
      <v-list-item-group>
        <v-list-item v-for="(task, index) in tasks" :key="index">
          <v-list-item-content>
            <v-list-item-title :style="{ fontWeight: 'bold' }">Task: {{ task.title }}</v-list-item-title>
            <v-list-item-subtitle>Description: {{ task.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
</template>
