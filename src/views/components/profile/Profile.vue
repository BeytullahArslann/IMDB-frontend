<template>
  <div id="user-profile" class="row">
    <div class="col-12">
      <profile-header :header-data="userData" />
    </div>
    <div class="col-3">
      <profile-about :about-data="userData" />
    </div>
    <div class="col-9">
      <div class="col-2 offset-10">
        <b-button variant="primary" v-b-modal.modal-prevent-closing>
          Add New List
        </b-button>
      </div>
    </div>
    <!-- lists  -->
    <div class="col-3" v-for="list in lists" :key="list.id">
      <movie-list :pages-data="list" />
    </div>
    <!--/ profile info  -->
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
  </div>
</template>

<script>
/* eslint-disable*/
import { BRow, BCol, BButton,BModal,
    VBModal,
    BFormGroup,
    BFormInput,
    BListGroup, } from "bootstrap-vue";
import { HTTP } from '@/main-source'
import ProfileHeader from "./Header.vue";
import ProfileAbout from "./ProfileAbout.vue";
import movieList from './Lists.vue';
// import ProfileTwitterFeed from './ProfileTwitterFeed.vue'
// import ProfilePost from './ProfilePost.vue'
// import ProfileLatestPhotos from './ProfileLatestPhotos.vue'
// import ProfileSuggestion from './ProfileSuggestion.vue'
// import ProfilePolls from './ProfilePolls.vue'
// import profileBottom from './profileBottom.vue'

export default {
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userInfo")),
      lists: null,
      movieList: null,
      listName:null
    };
  },
  components: {
    BRow,
    BCol,
    movieList,
    ProfileHeader,
    ProfileAbout,
    BButton,
    BModal,
    VBModal,
    BFormGroup,
    BFormInput,
    BListGroup,
  },
  async created() {
    await HTTP.post("api/MovieList/getListsMovie?userId="+this.userData.id).then(result => {
      this.lists = result.data
      console.log(result.data)
    })
    
  },
  methods: {
    getMovie: function(id){
      console.log(this.movieList.filter(z => z.listId == id ? true : false))
      return this.movieList.filter(z => z.listId == id)
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
        this.lists.push({list:result.data,movies:null});
      });
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal'].toggle('#toggle-btn')
      })
    },
  },
};
/* eslint-disable global-require */
</script>

<style lang="scss" >
@import "@core/scss/vue/pages/page-profile.scss";
</style>
