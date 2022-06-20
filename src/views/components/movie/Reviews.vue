<!-- eslint-disable -->
<template>
  <b-card>
    <h3>Reviews</h3>

    <!-- Reviews -->
    <div
      v-for="(data, index) in reviews"
      :key="data.avatar"
      class="profile-twitter-feed"
      :class="index != 0 ? 'mt-2' : 'mt-1'"
    >
      <div class="d-flex justify-content-start align-items-center mb-1">
        <b-avatar size="40" :src="data.avatar_path" class="mr-1" />
        <div class="profile-user-info">
          <h6 class="mb-0">
            {{ data.author }}
          </h6>

          <feather-icon icon="CalendarIcon" />
          <small class="text-muted"> {{ data.updated_at.slice(0,10) }}</small>
        </div>
        <div class="profile-star ml-auto">
          <feather-icon
            icon="StarIcon"
            size="18"
            :class="data.favorite ? 'profile-favorite' : ''"
          />
        </div>
      </div>
      <b-card-text class="mb-50">
        {{ data.content }}
      </b-card-text>
    </div>
    <!-- Reviews -->
  </b-card>
</template>

<script>
/*eslint-disable*/
import { BCard, BAvatar, BLink, BCardText } from "bootstrap-vue";

export default {
  components: {
    BCard,
    BAvatar,
    BLink,
    BCardText,
  },
  props: {
    reviews: {
      type: Array,
      default: () => {},
    },
  },
};
</script>
