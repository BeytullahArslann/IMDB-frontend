<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Register v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <vuexy-logo />
          <h2 class="brand-text text-primary ml-1">IMDB</h2>
        </b-link>

        <b-card-title class="mb-1"> Discover starts here 🚀 </b-card-title>

        <!-- form -->
        <validation-observer ref="registerForm">
          <b-form
            class="auth-register-form mt-2"
            @submit.prevent="validationForm"
          >
            <!-- Nick Name -->
            <b-form-group label="Nick Name" label-for="nickname">
              <validation-provider
                #default="{ errors }"
                name="nickname"
                rules="required"
              >
                <b-form-input
                  id="nickname"
                  v-model="nickName"
                  :state="errors.length > 0 ? false : null"
                  name="register-nickname"
                  placeholder="Nick Name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
                <small v-if="nickNameStatus" class="text-danger"
                  >This nickname address has been used.</small
                >
              </validation-provider>
            </b-form-group>

            <!-- username -->
            <b-form-group label="Name" label-for="Name">
              <validation-provider
                #default="{ errors }"
                name="Name"
                rules="required"
              >
                <b-form-input
                  id="Name"
                  v-model="name"
                  :state="errors.length > 0 ? false : null"
                  name="register-Name"
                  placeholder="Name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- surname -->
            <b-form-group label="surname" label-for="surname">
              <validation-provider
                #default="{ errors }"
                name="surname"
                rules="required"
              >
                <b-form-input
                  id="surname"
                  v-model="surname"
                  :state="errors.length > 0 ? false : null"
                  name="register-surname"
                  placeholder="Surname"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- email -->
            <b-form-group label="Email" label-for="email">
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="email"
                  v-model="userEmail"
                  :state="errors.length > 0 ? false : null"
                  name="register-email"
                  placeholder="john@example.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>
                <small v-if="emailStatus" class="text-danger"
                  >This e-mail address has been used.</small
                >
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group label="Password" label-for="password">
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    :state="errors.length > 0 ? false : null"
                    class="form-control-merge"
                    name="register-password"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIcon"
                      class="cursor-pointer"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- checkbox -->
            <b-form-group>
              <b-form-checkbox
                id="register-privacy-policy"
                v-model="status"
                name="checkbox-1"
              >
                I agree to
                <b-link>privacy policy & terms</b-link>
              </b-form-checkbox>
            </b-form-group>

            <!-- submit button -->
            <b-button variant="primary" block type="submit"> Sign up </b-button>
          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <span>Already have an account? </span>
          <b-link :to="{ name: 'login' }">
            <span>Sign in instead</span>
          </b-link>
        </b-card-text>
      </b-card>
      <!-- /Register v1 -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  BCard,
  BLink,
  BCardTitle,
  BCardText,
  BForm,
  BButton,
  BFormInput,
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
  BFormCheckbox,
} from "bootstrap-vue";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { HTTP } from "@/main-source";

export default {
  components: {
    VuexyLogo,
    // BSV
    BCard,
    BLink,
    BCardTitle,
    BCardText,
    BForm,
    BButton,
    BFormInput,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      nickNameStatus: false,
      emailStatus: false,
      nickName: "",
      name: "",
      surname: "",
      userEmail: "",
      password: "",
      status: false,

      // validation rules
      required,
      email,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  methods: {
    validationForm() {
      this.$refs.registerForm.validate().then((success) => {
        if (success && !this.emailStatus && !this.nickNameStatus) {
          if (!this.status) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "Please accept the privacy policy and terms.",
                icon: "EditIcon",
                variant: "warning",
              },
            });
            return;
          }
          HTTP.post("api/User", {
            name: this.name,
            surname: this.surname,
            nickName: this.nickName,
            email: this.userEmail,
            password: this.password,
            lists: [],
            movieLists: [],
            sex: null,
          })
            .then((result) => {
              console.log(result);
              if (result.status == 200) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: "Register Success",
                    icon: "EditIcon",
                    variant: "success",
                  },
                });
              } else {
                console.log("asdasdsad");
              }
            })
            .catch((err) => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: "Register Error",
                  icon: "EditIcon",
                  variant: "warning",
                },
              });
            });
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Please check your information.",
              icon: "EditIcon",
              variant: "warning",
            },
          });
        }
      });
    },
  },
  watch: {
    userEmail: function () {
      HTTP.post("api/User/emailControl?value=" + this.userEmail)
        .then((result) => {
          this.emailStatus = result.data;
        })
        .catch((err) => {});
    },
    nickName: function () {
      HTTP.post("api/User/nicknameControl?value=" + this.nickName)
        .then((result) => {
          this.nickNameStatus = result.data;
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
