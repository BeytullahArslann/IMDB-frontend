<!-- eslint-disable -->
<template>
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
    <people-card
      class="col-lg-3 col-md-6 col-sm-12"
      v-for="people in filtredPeoples"
      :key="people.id"
      :people="people"
    />
    <div class="col-12 d-flex justify-content-center mt-3 mb-2">
      <b-pagination
        class="justify-content: center;"
        v-model="currentPage"
        :total-rows="500"
        :per-page="perPage"
        first-number
        last-number
        @click="getPeoples()"
      />
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import {
  BCard,
  BCardText,
  BLink,
  BButton,
  BPagination,
  BFormGroup,
  BFormInput,
} from "bootstrap-vue";
import PeopleCard from "@/views/components/people/PeopleCard.vue";
import axios from "axios";

export default {
  data() {
    return {
      peoples: null,
      totalPages: null,
      totalActor: null,
      currentPage: 1,
      perPage: 1,
      searchTerm: "",
      filtredPeoples: [],
    };
  },
  components: {
    BCard,
    BCardText,
    PeopleCard,
    BLink,
    BButton,
    BPagination,
    BFormGroup,
    BFormInput,
  },
  created() {
    this.getPeoples();
  },
  methods: {
    getPeoples: function () {
      axios
        .get(
          "https://api.themoviedb.org/3/person/popular?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US&page=" +
            this.currentPage
        )
        .then((result) => {
          this.peoples = result.data.results;
          this.filtredPeoples = this.peoples;
        })
        .catch((err) => {});
    },
  },
  watch: {
    "currentPage" : function() {
      this.getPeoples();
    },
    searchTerm: function () {
      if (this.searchTerm == "") {
        this.filtredPeoples = this.peoples;
      } else {
        axios
          .get(
            "https://api.themoviedb.org/3/search/person?api_key=dbf838417cf64de0dbe2a81c2318610e&language=en-US&query=" +
              this.searchTerm +
              "&page=1&include_adult=false"
          )
          .then((result) => {
            this.filtredPeoples = result.data.results;
          })
          .catch((err) => {});
      }
    },
  },
};
</script>

<style>
</style>
