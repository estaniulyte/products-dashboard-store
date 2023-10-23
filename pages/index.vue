<template>
  <v-list two-line subheader>
    <v-subheader>{{ $tc("heading.Task", 2) }}</v-subheader>
    <v-list-item-group>
      <v-list-item v-for="(task, index) in translatedTasks" :key="index">
        <v-list-item-content>
          <v-list-item-title :style="{ fontWeight: 'bold' }"
            >{{ $tc("heading.Task", 1) }}: {{ task.title }}</v-list-item-title
          >
          <v-list-item-subtitle
            >{{ $tc("heading.Description", 1) }}:
            {{ task.description }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Index",
  data: () => ({
    tasks: [
      {
        title: "Implement Product Search Functionality",
        title_lt: "Sukurkite produktų paieškos funkciją",
        description:
          "Add a search bar that allows users to filter the product list based on title or description.",
        description_lt:
          "Pridėkite paiešką, leidžiančią vartotojams filtruoti produktų sąrašą pagal pavadinimą arba aprašymą.",
      },
      {
        title: "Optimize for Mobile Devices",
        title_lt: "Optimizuokite mobiliesiems įrenginiams",
        description:
          "Refactor the existing code to ensure that the app is fully responsive and provides an excellent user experience on mobile devices.",
        description_lt:
          "Pertvarkykite esamą kodą, kad užtikrintumėte, jog programa reaguoja į skirtingus ekranus ir suteiktų puikią vartotojo patirtį mobiliuosiuose įrenginiuose.",
      },
      {
        title: "Implement Internationalization (i18n)",
        title_lt: "Įgyvendinkite internacionalizavimą (i18n)",
        description:
          "Integrate internationalization into the application so that it can be easily translated into different languages.",
        description_lt:
          "Integruokite internacionalizavimą į programą, kad ją būtų galima lengvai išversti į skirtingas kalbas.",
      },
      {
        title: "Add Wishlist Feature",
        title_lt: "Pridėkite pageidavimų sąrašo funkciją",
        description:
          "Implement a wishlist feature where users can add products they want to save for later. Include an interface for viewing and managing the wishlist.",
        description_lt:
          "Įdiekite pageidavimų sąrašo funkciją, kurioje vartotojai gali pridėti produktų, kuriuos nori išsaugoti vėliau. Įtraukite sąsają pageidavimų sąrašui peržiūrėti ir tvarkyti.",
      },
      {
        title: "Refactor the Currency Filter to a Global Utility",
        title_lt: "Perrašykite valiutos filtravimo funkciją į globalią",
        description:
          "Since the currency formatting is used in multiple places, refactor it into a global utility or plugin.",
        description_lt:
          "Kadangi valiutos formatavimas naudojamas keliose vietose, pakeiskite jį į visuotinę funkciją arba papildinį.",
      },
      {
        title: "Create Unit Tests for Key Components",
        title_lt: "Sukurkite pagrindinių komponentų vienetų testus",
        description:
          "Write unit tests for critical components such as the cart, product list, and checkout process.",
        description_lt:
          "Parašykite svarbiausių komponentų, tokių kaip krepšelis, produktų sąrašas ir atsiskaitymo procesas, vienetų testus.",
      },
      {
        title: "Refactor Product Structure and Componentization",
        title_lt: "Pertvarkykite produkto puslapio struktūrą ir komponentus",
        description:
          "Review the existing product structure and naming conventions, identifying areas that can be optimized. Split repetitive code into reusable child components and ensure that naming is consistent and descriptive throughout the application.",
        description_lt:
          "Peržiūrėkite esamą produkto struktūrą ir pavadinimų suteikimo taisykles, nustatydami sritis, kurias galima optimizuoti. Padalinkite pasikartojantį kodą į daugkartinio naudojimo antrinius komponentus ir užtikrinkite, kad pavadinimai būtų nuoseklūs ir apibūdinantys.",
      },
    ],
  }),
  computed: {
    translatedTasks() {
      const locale = this.$i18n.locale;

      let translatedTasks = this.tasks.map((item) => {
        let description = "";
        let title = "";

        if (locale !== "en") {
          description = item[`description_${locale}`];
          title = item[`title_${locale}`];
        } else {
          title = item.title;
          description = item.description;
        }

        return {
          title,
          description,
        };
      });

      return translatedTasks;
    },
  },
});
</script>
