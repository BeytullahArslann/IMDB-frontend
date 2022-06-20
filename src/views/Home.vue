<!-- eslint-disable -->
<template>
  <div>
    <div class="row">
      <b-form-group class="col-12">
        <div class="d-flex align-items-end col-4">
          <label class="mr-1">Search</label>
          <b-form-input
            v-model="searchTerm"
            placeholder="Search"
            type="text"
            class="d-inline-block"
          />
        </div>
      </b-form-group>
      <!-- <movie-card class="col-lg-4 col-md-6 col-sm-12" :movie="movie"></movie-card> -->
      <movie-card
        class="col-lg-3 col-md-6 col-sm-12 "
        v-for="movie in filtredMovies"
        :key="movie.id"
        :movie="movie"
        :genres="genres"
      />
      <div class="col-12 d-flex justify-content-center mt-3 mb-2">
        <b-pagination
          class="justify-content: center;"
          v-model="currentPage"
          :total-rows="500"
          :per-page="perPage"
          first-number
          last-number
          @click="getMovies"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { HTTP } from "@/main-source";
import axios from "axios";
import { BCard, BCardText, BLink , BButton , BPagination ,BFormGroup, BFormInput } from "bootstrap-vue";
import movieCard from "@/views/components/movie/cardMovie.vue";

export default {
  data() {
    return {
      movie: null,
      movies: null,
      genres: null,
      totalPages: null,
      totalMovies: null,
      currentPage: 1,
      perPage: 1,
      searchTerm: '',
      filtredMovies: [],
    };
  },
  async created() {
    this.getMovies();
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US"
      )
      .then((res) => {
        this.genres = res.data.genres;
      });
  },
  methods: {
    getMovies : function (){
      //this.currentPage++
      HTTP.get("/api/movies/trendMovie/"+this.currentPage).then((result) => {
        this.movies = result.data;
        this.filtredMovies = this.movies
    });
      // axios
      // .get(
      //   "https://api.themoviedb.org/3/movie/popular?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US&page="+this.currentPage
      // )
      // .then((res) => {
      //   // console.log(`axios atti`);
      //   // console.log(res.data);
        
      // });
    },
  },
  watch: {
    "currentPage" : function() {
      this.getMovies();
    },
    "searchTerm" : function() {
      if(this.searchTerm == ''){
        this.filtredMovies = this.movies
      }else {
        axios.get("https://api.themoviedb.org/3/search/movie?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US&query=" + this.searchTerm + "&page=1&include_adult=false").then((result) => {
        this.filtredMovies = []
        result.data.results.forEach((element) => {
              this.filtredMovies.push({
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
      }).catch((err) => {
        
      });
      }
    }
  },
  components: {
    BCard,
    BCardText,
    BLink,
    movieCard,
    BButton,
    BPagination,
    BFormGroup,
    BFormInput
  },
};
</script>

<style>
</style>
