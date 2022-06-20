<template>
  <b-card>
    <!-- about -->
    <div
      :class="index ? 'mt-2':''"
    >
      <h5 class="text-capitalize mb-75">
        E-mail
      </h5>
      <b-card-text>
        {{ aboutData.email }}
      </b-card-text>
    </div>
    <div
      :class="index ? 'mt-2':''"
    >
      <h5 class="text-capitalize mb-75">
        Birthday
      </h5>
      <b-card-text>
        {{ aboutData.birthday.slice(0,10) }}
      </b-card-text>
    </div>
    <div
      :class="index ? 'mt-2':''"
    >
      <h5 class="text-capitalize mb-75">
        Gender
    </h5>
      <b-card-text>
        {{ aboutData.sex == 0 ? 'Male' : 'Female' }}
      </b-card-text>
    </div>
    <div
      :class="index ? 'mt-2':''"
    >
      <h5 class="text-capitalize mb-75">
        Approved
      </h5>
      <b-card-text>
        {{ aboutData.approved }}
      </b-card-text>
    </div>
  </b-card>
</template>

<script>
import { BCard, BCardText } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
  },
  props: {
    aboutData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
