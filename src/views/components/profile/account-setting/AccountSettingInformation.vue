<template>
  <b-card>
    <!-- form -->
    <b-form>
      <b-row>
        <!-- bio -->
        <b-col md="6" xl="4">
          <b-form-group label="Blocks" label-for="block">
            <cleave
              id="block"
              v-model="userData.identificationNo"
              class="form-control"
              :raw="false"
              :options="identity"
              placeholder="111 111 111 11"
            />
          </b-form-group>
        </b-col>

        <!--/ bio -->

        <!-- birth date -->
        <b-col md="6">
          <b-form-group label-for="example-datepicker" label="Birth date">
            <flat-pickr
              v-model="userData.birthday"
              class="form-control"
              name="date"
              placeholder="Birth date"
            />
          </b-form-group>
        </b-col>
        <!--/ birth date -->

        <!-- Country -->
        <b-col md="6">
          <b-form-group label-for="countryList" label="Country">
            <v-select
              id="countryList"
              v-model="userData.sex"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="sexOptions"
            />
          </b-form-group>
        </b-col>
        <!--/ Country -->

        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            @click="updateUser"
          >
            Save changes
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            class="mt-1"
            variant="outline-secondary"
            @click.prevent="resetForm"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
/*eslint-disable*/
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BCard,
  BFormTextarea,
} from "bootstrap-vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import Ripple from "vue-ripple-directive";
import Cleave from "vue-cleave-component";
import { HTTP } from "@/main-source"
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

// eslint-disable-next-line import/no-extraneous-dependencies
import "cleave.js/dist/addons/cleave-phone.us";

export default {
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userInfo')),
      identity: {
          blocks: [3, 3, 3 ,2],
          uppercase: true,
        },
      sexOptions: ["Male", "Female"],
    }
  },
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BFormTextarea,
    vSelect,
    flatPickr,
    Cleave,
    ToastificationContent
  },
  directives: {
    Ripple,
  },
  props: {
    informationData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.userData.sex = this.userData.sex ? 'Female' : 'Male'
  },
  methods: {
    resetForm() {
      this.localOptions = JSON.parse(JSON.stringify(this.informationData));
    },
    updateUser: function(){
      this.userData.sex = this.userData.sex == 'Male' ? false : true 
      this.userData.identificationNo ? this.userData.identificationNo = this.userData.identificationNo.replace(/ /g , '') : ''
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
              title: 'ID number is being used by someone else.',
              icon: 'AlertCircleIcon',
              variant: 'warning',
            },
          })
      });
    }
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
