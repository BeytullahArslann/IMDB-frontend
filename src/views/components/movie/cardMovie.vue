<!-- eslint-disable -->
<template>
  <router-link
    :to="{
      name: 'movie',
      params: {
        id: movie.id,
      },
    }"
  >
    <b-row class="match-height match-width">
      <b-col md="12" lg="12">
        <b-card no-body>
          <b-card-body>
            <b-card-title>{{ movie.originalTitle }}</b-card-title>
            <b-card-sub-title
              >Release Date: {{ movie.releaseDate.slice(0, 10) }}</b-card-sub-title
            ><b-img
              fluid
              class="mt-1"
              :src="imgUrl + movie.posterPath"
              alt="Card image cap"
            />
            <b-card-text v-if="movie.adult"
              ><b style="color: red">+18</b></b-card-text
            >
            <b-card-text
              ><b>Genres:</b>
              <a v-for="genre in genre" :key="genre.id">
                {{ genre.name }}
              </a></b-card-text
            >
            <b-card-text
              ><b style="font-size: 15px">Original Language:</b>
              {{ movie.originalLanguage.toUpperCase() }}
            </b-card-text>
            <b-card-text
              ><b style="font-size: 15px">Vote Average:</b>
              {{ movie.voteAverage.toFixed(1) }}
            </b-card-text>

            <!-- <b-card-text style="height: 250px; max-height: 300px;" class="mt-1">{{ movie.overview }}</b-card-text> -->
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
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  data() {
    return {
      imgUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/",
      genre: [],
    };
  },
  created() {
    setTimeout(() => {
      
      this.genre = this.genres.filter((z) =>
        this.movie.genreIds.includes(z.id)
      );
    }, 200);
    
  },
  methods: {
  },
  props: ["movie", "genres"],
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
  },
  directives: {
    Ripple,
  },
};
</script>
