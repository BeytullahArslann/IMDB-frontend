<!-- eslint-disable -->
<template>
  <div class="row">
    <movie-header class="col-12" :headerData="movie" />
    <div class="col-12">
      <swiper
        class="swiper-responsive-breakpoints px-4 py-2"
        :options="swiperOptions"
      >
        <swiper-slide v-for="(cast, index) in casts" :key="index">
          <b-link
            :to="{
              name: 'people',
              params: {
                id: cast.id,
              },
            }"
          >
            <div class="item-heading">
              <h5 class="text-truncate mb-0">
                {{ cast.original_name }}
              </h5>
              <small class="text-body">{{ cast.character }}</small>
            </div>
            <div class="img-container w-50 mx-auto py-75">
              <b-img :src="imgUrl + cast.profile_path" fluid />
            </div>
          </b-link>
        </swiper-slide>

        <!-- Add Arrows -->
        <div slot="button-next" class="swiper-button-next" />
        <div slot="button-prev" class="swiper-button-prev" />
      </swiper>
    </div>
    <div class="col-12">
      <reviews-component :reviews="Reviews" />
    </div>
    <div class="col-12 d-flex justify-content-center mb-2">
      <b-button
        v-if="!showSimiliarMovies"
        @click="showSimiliarMovies = !showSimiliarMovies"
        variant="primary"
        style="color: red"
        >Show Similiar Movies</b-button
      >
      <b-button
        v-if="showSimiliarMovies"
        @click="showSimiliarMovies = !showSimiliarMovies"
        variant="danger"
        style="color: red"
        >Hide Similiar Movies</b-button
      >
    </div>
    <div class="row col-12" v-if="showSimiliarMovies">
      <movie-card
        class="col-lg-3 col-md-6 col-sm-12"
        v-for="movie in similiarMovies"
        :key="movie.id"
        :movie="movie"
        :genres="genres"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { HTTP } from "@/main-source";
import axios from "axios";
import Reviews from "@/views/components/movie/Reviews.vue";
import MovieHeader from "@/views/components/movie/MovieHeader.vue";
import movieCard from "@/views/components/movie/cardMovie.vue";
import {
  BCard,
  BCardText,
  BLink,
  BButton,
  BPagination,
  BFormGroup,
  BFormInput,
  BImg,
} from "bootstrap-vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ReviewsComponent from "./components/movie/Reviews.vue";

export default {
  /* eslint-disable */
  name: "movies",
  data() {
    return {
      imgUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2",
      showSimiliarMovies: false,
      movieId: this.$route.params.id,
      asd: "ASD",
      movie: null,
      similiarMovies: [],
      genres: null,
      Reviews: null,
      swiperOptions: {
        slidesPerView: 5,
        spaceBetween: 55,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1600: {
            slidesPerView: 4,
            spaceBetween: 55,
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 55,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 55,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 55,
          },
        },
      },
    };
  },
  components: {
    BImg,
    MovieHeader,
    movieCard,
    BCard,
    BCardText,
    BLink,
    BButton,
    BPagination,
    BFormGroup,
    BFormInput,
    Swiper,
    SwiperSlide,
    Reviews,
    ReviewsComponent,
  },
  created() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          this.movieId +
          "/credits?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US"
      )
      .then((result) => {
        console.log(result.data.cast);
        this.casts = result.data.cast;
      })
      .catch((err) => {});
    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          this.movieId +
          "/reviews?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US&page=1"
      )
      .then((result) => {
        this.Reviews = result.data.results;
      })
      .catch((err) => {});
    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          this.movieId +
          "/similar?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US&page=1"
      )
      .then((result) => {
        axios
          .get(
            "https://api.themoviedb.org/3/genre/movie/list?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US"
          )
          .then((genres) => {
            this.genres = genres.data.genres;
            result.data.results.forEach((element) => {
              this.similiarMovies.push({
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
            //console.log("similiar", this.similiarMovies);
          });
      })

    // axios
    //   .get(
    //     "https://api.themoviedb.org/3/movie/" +
    //       this.movieId +
    //       "?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US"
    //   )
    //   .then((result) => {
    //     console.log("axios", result.data);
    //   })
    //   .catch((err) => {});
    HTTP.get("api/movies/getMovieById/" + this.movieId)
      .then((result) => {
        console.log("myApi", result.data);
        this.movie = result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>
<style lang="scss">
@import "@core/scss/vue/libs/swiper.scss";
@import "~swiper/css/swiper.css";
</style>