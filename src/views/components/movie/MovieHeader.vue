<!-- eslint-disable -->
<template>
  <b-card>
    <b-row>
      <!-- User Info: Left col -->
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :src="imgUrl + headerData.posterPath"
            :text="avatarText(headerData.originalTitle)"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ headerData.originalTitle }}
              </h4>
              <span class="card-text">{{
                headerData.releaseDate.slice(0, 10)
              }}</span>
            </div>
            <div class="d-flex flex-wrap">
              <b-navbar-nav
                v-if="userData"
                class="nav align-items-center ml-auto"
              >
                <b-nav-item-dropdown
                  right
                  toggle-class="d-flex align-items-center dropdown-user-link"
                  class="dropdown-user"
                >
                  <template #button-content>
                    <b-button variant="primary" class="ml-auto">
                      <feather-icon icon="EditIcon" class="d-block d-md-none" />
                      <span class="font-weight-bold d-none d-md-block"
                        >Add To List</span
                      >
                    </b-button>
                  </template>
                  <b-dropdown-item
                    v-for="list in lists"
                    :key="list.id"
                    link-class="d-flex align-items-center"
                  >
                    <div
                      v-if="isAdded(list.id)"
                      class=""
                      @click="deleteFromList(list.id)"
                    >
                      <feather-icon size="16" icon="DeleteIcon" class="mr-50" />
                      <span>{{ list.name }}</span>
                    </div>
                    <div v-else class="" @click="addList(list.id)">
                      <feather-icon
                        size="16"
                        icon="PlusCircleIcon"
                        class="mr-50"
                      />
                      <span>{{ list.name }}</span>
                    </div>
                  </b-dropdown-item>
                  <b-dropdown-divider />
                  <b-dropdown-item v-b-modal.modal-prevent-closing>
                    <feather-icon
                      size="16"
                      icon="PlusCircleIcon"
                      class="mr-50"
                    />
                    <span>Create New List</span>
                  </b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
              <a :href="headerData.homepage">
                <b-button variant="outline-danger" class="ml-1">
                  Movie Homepage
                </b-button>
              </a>
            </div>
          </div>
        </div>

        <!-- User Stats -->
        <div class="d-flex align-items-center mt-2">
          <div class="d-flex align-items-center mr-2">
            <b-avatar variant="light-primary" rounded>
              <feather-icon icon="DollarSignIcon" size="18" />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                {{ headerData.revenue }}
              </h5>
              <small>Revenue</small>
            </div>
          </div>
          <div class="d-flex align-items-center mr-2">
            <b-avatar variant="light-danger" rounded>
              <feather-icon icon="DollarSignIcon" size="18" />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                {{ headerData.budget }}
              </h5>
              <small>Budget</small>
            </div>
          </div>

          <div class="d-flex align-items-center">
            <b-avatar variant="light-success" rounded>
              <feather-icon icon="StarIcon" size="18" />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                {{ headerData.voteAverage }}
              </h5>
              <small>Vote Average</small>
            </div>
          </div>
        </div>
      </b-col>

      <!-- Right Col: Table -->
      <b-col cols="12" xl="6">
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon icon="FlagIcon" class="mr-75" />
              <span class="font-weight-bold">Language: </span>
            </th>
            <td class="pb-50">
              {{ headerData.originalLanguage.toUpperCase() }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="CheckIcon" class="mr-75" />
              <span class="font-weight-bold">Status: </span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ headerData.status }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="StarIcon" class="mr-75" />
              <span class="font-weight-bold">Genres: </span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ getGenres() }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon icon="TagIcon" class="mr-75" />
              <span class="font-weight-bold">Tagline: </span>
            </th>
            <td>
              {{ headerData.tagline }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="AlignLeftIcon" class="mr-75" />
              <span class="font-weight-bold">Overview: </span>
            </th>
            <td class="pb-50">
              {{ headerData.overview }}
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>
    <b-modal
      id="modal-prevent-closing"
      ref="my-modal"
      title="Create New List"
      ok-title="Create"
      cancel-variant="outline-secondary"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="List Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="listName"
            :state="nameState"
            required
          />
        </b-form-group>
      </form>
    </b-modal>
  </b-card>
</template>

<script>
/*eslint-disable*/
import {
  BCard,
  BImg,
  BNavbar,
  BNavbarToggle,
  BCollapse,
  BTabs,
  BNavItem,
  BButton,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
  BRow,
  BCol,
  BModal,
  VBModal,
  BFormGroup,
  BFormInput,
  BListGroup,
} from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import { HTTP } from "@/main-source";
import { list } from "postcss";

export default {
  data() {
    return {
      imgUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/",
      userData: JSON.parse(localStorage.getItem("userInfo")),
      lists: null,
      movieList: null,
      listName: null,
    };
  },
  created() {
    HTTP.get("api/List/" + this.userData.id)
      .then((result) => {
        this.lists = result.data;
        console.log(result.data);
      })
      .catch((err) => {});
    HTTP.get("api/MovieList/lists/" + this.userData.id)
      .then((result) => {
        this.movieList = result.data;
        console.log(result.data);
      })
      .catch((err) => {});
  },
  components: {
    BCard,
    BRow,
    BCol,
    BImg,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BTabs,
    BNavItem,
    BButton,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BModal,
    VBModal,
    BFormGroup,
    BFormInput,
    BListGroup,
  },
  methods: {
    getGenres: function () {
      return "genres";
    },
    addList: function (listId) {
      console.log("add calisti");
      let data = {
        userId: this.userData.id,
        movieId: this.headerData.id,
        movieName: this.headerData.originalTitle,
        moviePosterPath: this.headerData.posterPath,
        listId: listId,
        isDeleted: false,
        type: false,
      };
      HTTP.post("api/MovieList/addMovie", data).then((result) => {
        this.movieList.push(data);
        console.log(this.movieList);
      });
    },
    deleteFromList: function (listId) {
      console.log("delete calisti");
      HTTP.post(
        "api/MovieList/deleteMovie?movieId=" +
          this.headerData.id +
          "&userId=" +
          this.userData.id +
          "&listId=" +
          listId
      )
        .then((result) => {
          this.movieList = this.movieList.filter((element) => {
            if (
              !(
                element.listId == listId &&
                this.headerData.id == element.movieId
              )
            ) {
              return true;
            } else {
              return false;
            }
          });
        })
        .catch((err) => {});
    },
    isAdded: function (listId) {
      return (
        this.movieList,
        this.movieList.filter((element) => {
          if (
            element.listId == listId &&
            this.headerData.id == element.movieId
          ) {
            return true;
          } else {
            return false;
          }
        }).length == 0
          ? false
          : true
      );
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.listName = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      let data = {
        name: this.listName,
        userId: this.userData.id,
        isDeleted: false,
      };
      HTTP.post("api/List/createList", data).then((result) => {
        this.lists.push(result.data);
      });
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal'].toggle('#toggle-btn')
      })
    },
  },
  computed: {},
  props: ["headerData"],
  setup() {
    return {
      avatarText,
    };
  },
};
</script>

<style>
</style>
