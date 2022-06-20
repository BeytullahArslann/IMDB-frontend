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
            :src="imgUrl + peopleData.profile_path"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ peopleData.name }}
              </h4>
              <span class="card-text">{{ peopleData.birthday }}</span>
            </div>
            <div class="d-flex flex-wrap">
              <div class="row">
                <a
                  v-if="accounts.twitter_id"
                  :href="twitterUrl + accounts.twitter_id"
                  class="col-3"
                >
                  <feather-icon icon="TwitterIcon" class="mr-75" size="30"
                /></a>
                <a
                  v-if="accounts.facebook_id"
                  :href="facebookUrl + accounts.facebook_id"
                  class="col-3"
                >
                  <feather-icon icon="FacebookIcon" class="mr-75" size="30"
                /></a>
                <a
                  v-if="accounts.instagram_id"
                  :href="instangramUrl + accounts.instagram_id"
                  class="col-3"
                >
                  <feather-icon icon="InstagramIcon" class="mr-75" size="30"
                /></a>
              </div>
              <!-- <b-button
                :to="{ name: 'apps-users-edit', params: { id: userData.id } }"
                variant="primary"
              >
                Edit
              </b-button> -->
              <!-- <b-button
                variant="outline-danger"
                class="ml-1"
              >
                Delete
              </b-button> -->
            </div>
          </div>
        </div>

        <!-- User Stats -->
      </b-col>

      <!-- Right Col: Table -->
      <b-col cols="12" xl="6">
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon icon="UserIcon" class="mr-75" />
              <span class="font-weight-bold">Name</span>
            </th>
            <td class="pb-50">
              {{ peopleData.name }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="FlagIcon" class="mr-75" />
              <span class="font-weight-bold">Country</span>
            </th>
            <td class="pb-50">
              {{ peopleData.place_of_birth }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon icon="StarIcon" class="mr-75" />
              <span class="font-weight-bold">Gender</span>
            </th>
            <td>
              {{ peopleData.gender == 2 ? "Male" : "Woman" }}
            </td>
          </tr>
          <tr></tr>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
/*eslint-disable*/
import { BCard, BButton, BAvatar, BRow, BCol } from "bootstrap-vue";

export default {
  data() {
    return {
      imgUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/",
      twitterUrl: "https://twitter.com/",
      instangramUrl: "https://instangram.com/",
      facebookUrl: "https://www.facebook.com/",
    };
  },
  components: {
    BCard,
    BButton,
    BRow,
    BCol,
    BAvatar,
  },
  props: {
    peopleData: {
      type: Object,
      required: true,
    },
    accounts: {},
  },
};
</script>

<style>
</style>
