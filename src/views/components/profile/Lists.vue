<template>
  <b-card :title="pagesData.list.name">
    <!-- suggested pages -->
    <div
      v-for="data in pagesData.movies"
      :key="data.id"
      class="d-flex justify-content-start align-items-center mt-1"
    >
      <div class="mr-1">
        <b-avatar size="40" :src="imgUrl + data.moviePosterPath" />
      </div>
      <div class="profile-user-info">
        <h6 class="mb-0">
          {{ data.movieName }}
        </h6>
        <small class="text-muted">{{
          data.type == 0 ? "Movie" : "Tv Show"
        }}</small>
      </div>
      <div @click="deleteItem(data.movieId, data.listId)" class="ml-auto">
        <feather-icon icon="DeleteIcon" size="18" />
      </div>
    </div>
    <!--/ suggested pages -->
  </b-card>
</template>

<script>
/*eslint-disable*/
import { BCard, BAvatar , BLink} from "bootstrap-vue";
import { HTTP } from "@/main-source";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";

export default {
  data() {
    return {
      imgUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/",
      userData: JSON.parse(localStorage.getItem("userInfo")),
    };
  },
  components: {
    BCard,
    BAvatar,
    BCardActions,
  },
  props: ["pagesData"],
  methods: {
    deleteList: function () {
      alert("asd");
    },
    deleteItem: function (movieId, listId) {
      HTTP.post(
        "api/MovieList/deleteMovie?movieId=" +
          movieId +
          "&userId=" +
          this.userData.id +
          "&listId=" +
          listId
      )
        .then((result) => {
          this.pagesData.movies = this.pagesData.movies.filter((element) => {
            if (!(element.listId == listId && movieId == element.movieId)) {
              return true;
            } else {
              return false;
            }
          });
        })
        .catch((err) => {});
    },
  },
};
</script>
