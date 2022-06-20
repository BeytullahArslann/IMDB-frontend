<template>
  <b-card>
    <!-- form -->
    <b-form class="mt-2">
      <b-row>
        <b-col sm="6">
          <b-form-group
            label="Nickname"
            label-for="account-username"
          >
            <b-form-input
              v-model="userData.nickName"
              placeholder="Nickname"
              name="username"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Name"
            label-for="account-name"
          >
            <b-form-input
              v-model="userData.name"
              name="name"
              placeholder="Name"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Surname"
            label-for="account-surname"
          >
            <b-form-input
              v-model="userData.surname"
              name="surname"
              placeholder="Surname"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="E-mail"
            label-for="account-e-mail"
          >
            <b-form-input
              v-model="userData.email"
              name="email"
              placeholder="Email"
            />

          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-2 mr-1"
            @click="updateUser"
          >
            Save changes
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
/*eslint-disable*/
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  BFormFile, BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BAlert, BCard, BCardText, BMedia, BMediaAside, BMediaBody, BLink, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { HTTP } from '@/main-source'

export default {
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userInfo"))
    }
  },
  components: {
    BButton,
    BForm,
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BAlert,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
    ToastificationContent
  },
  directives: {
    Ripple,
  },
  methods: {
    updateUser: function(){
      HTTP.put("api/User/"+this.userData.id,this.userData).then((result) => {
        localStorage.setItem("userInfo",JSON.stringify(result.data))
        this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Update successful',
              icon: 'ThumbsUpIcon',
              variant: 'success',
            },
          })
      }).catch((err) => {
        this.$toast({
            component: ToastificationContent,
            props: {
              title: 'E-mail or nickname already taken',
              icon: 'AlertCircleIcon',
              variant: 'warning',
            },
          })
      });
    }
  },
}
</script>
