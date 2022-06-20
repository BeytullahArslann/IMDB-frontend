<!-- eslint-disable -->
<template>
  <div class="row">
    <!-- Topbar -->
    <page-header class="col-12" :peopleData="people" :accounts="accounts" />
    <!-- Details -->
    <b-card>
      <b-card-body>
        <b-card-title> Biography </b-card-title>
        <b-card-text>
          {{ people.biography }}
        </b-card-text>
      </b-card-body>
    </b-card>
    <!-- Images -->
    <b-card class="col-12">
        <b-card-body class="col-12">
            <poster-slider class="col-12" :img="images.profiles" />
        </b-card-body>
    </b-card>
    
    <!-- Movie and Tv Shows Buttons -->
    <b-card class="col-12">
        <b-card-body>
            <div class="col-12">
        <div class="col-12 d-flex justify-content-center mt-3 mb-2">
        <b-button
          v-if="!showMovies"
          @click="showMovies = !showMovies"
          variant="primary"
          >Show Movies</b-button
        >
        <b-button
          v-if="showMovies"
          @click="showMovies = !showMovies"
          variant="danger"
          >Hide Movies</b-button
        >
        <b-button
        class="ml-1"
          v-if="!showTvShows"
          @click="showTvShows = !showTvShows"
          variant="primary"
          >Show Tv Shows</b-button
        >
        <b-button
        class="ml-1"
          v-if="showTvShows"
          @click="showTvShows = !showTvShows"
          variant="danger"
          >Hide Tv Shows</b-button
        >
      </div>
    </div>
        </b-card-body>
    </b-card>
    
    <!-- Movies -->
    <div class="col-12">
      <div class="row col-12" v-if="showMovies">
        <movie-card
          class="col-lg-3 col-md-6 col-sm-12"
          v-for="movie in Movies"
          :key="movie.id"
          :movie="movie"
          :genres="genres"
        />
      </div>
    </div>
    <!-- Tv Shows -->
    <div class="col-12">
      <div class="row col-12" v-if="showTvShows">
        <show-card
          class="col-lg-3 col-md-6 col-sm-12"
          v-for="movie in tvMovies"
          :key="movie.id"
          :movie="movie"
          :genres="genres"
        />
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import {
  BCard,
  BCardText,
  BCardTitle,
  BLink,
  BButton,
  BPagination,
  BFormGroup,
  BFormInput,
  BImg,
} from "bootstrap-vue";
import PageHeader from "@/views/components/people/Header.vue";
import PosterSlider from "@/views/components/people/Slider.vue";
import MovieCard from "@/views/components/movie/cardMovie.vue";
import ShowCard from "@/views/components/tvShow/TvShowCard.vue"
import axios from "axios";
export default {
  data() {
    return {
        showTvShows:false,
      showMovies: false,
      peopleId: this.$route.params.id,
      people: null,
      accounts: null,
      images: null,
      Movies: [],
      tvMovies: [],
      genres: null,
    };
  },
  components: {
    PageHeader,
    BCard,
    BCardText,
    BCardTitle,
    PosterSlider,
    MovieCard,
    BLink,
    BButton,
    BPagination,
    BFormGroup,
    BFormInput,
    BImg,
    ShowCard,
  },
  async created() {
    //   Person Details
    axios
      .get(
        "https://api.themoviedb.org/3/person/" +
          this.peopleId +
          "?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US"
      )
      .then((result) => {
        this.people = result.data;
      })
      .catch((err) => {});
    // Movies
    await axios
      .get(
        "https://api.themoviedb.org/3/person/" +
          this.peopleId +
          "/movie_credits?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US"
      )
      .then((result) => {
        this.movies = result.data;
        axios
          .get(
            "https://api.themoviedb.org/3/genre/movie/list?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US"
          )
          .then((genres) => {
            this.genres = genres.data.genres;
            result.data.cast.forEach((element) => {
              this.Movies.push({
                id: element.id,
                originalTitle: element.original_title,
                releaseDate: element.release_date,
                posterPath: element.poster_path,
                adult: element.adult,
                genreIds: element.genre_ids,
                originalLanguage: element.original_language,
                voteAverage: element.vote_average,
              });
            });
          });
      })
      .catch((err) => {});

    //   Tv Credits
    axios
      .get(
        "https://api.themoviedb.org/3/person/" +
          this.peopleId +
          "/tv_credits?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US"
      )
      .then((result) => {
        console.log(result.data);
        result.data.cast.forEach((element) => {
          this.tvMovies.push({
            id: element.id,
            name: element.name,
            first_air_date: element.first_air_date,
            poster_path: element.poster_path,
            adult: false,
            genre_ids: element.genre_ids,
            original_language: element.original_language,
            vote_average: element.vote_average,
          });
        });
        console.log(this.tvMovies);
      })
      .catch((err) => {});

    // Images
    axios
      .get(
        "https://api.themoviedb.org/3/person/" +
          this.peopleId +
          "/images?api_key=dbf838417cf64de0dbe2a81c2318610e"
      )
      .then((result) => {
        this.images = result.data;
      })
      .catch((err) => {});

    // Accounts
    axios
      .get(
        "https://api.themoviedb.org/3/person/" +
          this.peopleId +
          "/external_ids?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US"
      )
      .then((result) => {
        this.accounts = result.data;
      })
      .catch((err) => {});
  },
};
</script>

<style>
</style>