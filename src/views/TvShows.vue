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
      <tv-show-card
        class="col-lg-3 col-md-6 col-sm-12 "
        v-for="show in filtredTvShows"
        :key="show.id"
        :movie="show"
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
          @click="getTvShows"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import { BCard, BCardText, BLink , BButton , BPagination ,BFormGroup, BFormInput } from "bootstrap-vue";
import TvShowCard from "@/views/components/tvShow/TvShowCard.vue";

export default {
  data() {
    return {
      movie: null,
      tvShows: [],
      genres: null,
      totalPages: null,
      totaltvShows: null,
      currentPage: 1,
      perPage: 1,
      searchTerm: '',
      filtredTvShows: [],
    };
  },
  async created() {
    this.getTvShows();
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US"
      )
      .then((res) => {
        this.genres = res.data.genres;
      });
  },
  methods: {
    getTvShows : function (){
      //this.currentPage++
      axios.get("https://api.themoviedb.org/3/tv/popular?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US&page="+this.currentPage).then((result) => {
          this.tvShows = result.data.results
        this.filtredTvShows = this.tvShows
    });
    },
  },
  watch: {
    "currentPage" : function() {
      this.getTvShows();
    },
    "searchTerm" : function() {
      if(this.searchTerm == ''){
        this.filtredTvShows = this.tvShows
      }else {
        axios.get("https://api.themoviedb.org/3/search/tv?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US&page=1&query=" + this.searchTerm + "&include_adult=false").then((result) => {
        this.filtredTvShows = result.data.results
      }).catch((err) => {
        
      });
      }
    }
  },
  components: {
    BCard,
    BCardText,
    BLink,
    TvShowCard,
    BButton,
    BPagination,
    BFormGroup,
    BFormInput
  },
};
</script>

<style>
</style>
