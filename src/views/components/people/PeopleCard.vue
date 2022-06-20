<!-- eslint-disable -->
<template>
  <router-link
    :to="{
      name: 'people',
      params: {
        id: people.id,
      },
    }"
  >
    <b-row class="match-height match-width">
      <b-col md="12" lg="12">
        <b-card no-body>
          <b-card-body>
            <b-card-title>{{ people.name }}</b-card-title>
            <b-img
              fluid
              class="mt-1"
              :src="imgUrl + people.profile_path"
              alt="Card image cap"
            />
            <b-card-text
              ><b>Gender:</b>
               {{ people.gender == 2 ? 'Male' : 'Woman'}}
              </b-card-text
            >
            <b-card-text
              >
              <ul>
                  <li v-for="movie in people.known_for" :key="movie.id">{{ movie.original_title == null ? movie.original_name : movie.original_title }}</li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </router-link>
</template>

<script>
/* eslint-disable */
import {
  BCard,
  BCardText,
  BButton,
  BRow,
  BCol,
  BImg,
  BCardBody,
  BCardTitle,
  BCardSubTitle,
  BLink,
  BPagination,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  data() {
    return {
      imgUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/",
    };
  },
  created() {
  },
  methods: {
  },
  props: ["people"],
  components: {
    BCard,
    BCardText,
    BButton,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    BRow,
    BCol,
    BLink,
    BImg,
    BPagination,
  },
  directives: {
    Ripple,
  },
};
</script>
