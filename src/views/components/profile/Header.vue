<template>
  <b-card
    class="profile-header mb-2"
    :img-src="IMGUrl + headerData.backgroundImg"
    img-top
    alt="cover photo"
    body-class="p-0"
  >
    <!-- profile picture -->
    <div class="position-relative">
      <div class="profile-img-container d-flex align-items-center">
        <div class="profile-img">
          <b-img
            :src="IMGUrl + headerData.img"
            rounded
            fluid
            alt="profile photo"
          />
        </div>
        <!-- profile title -->
        <div class="profile-title ml-3">
          <h2 class="text-white">
            {{ headerData.name + " " + headerData.surname }}
          </h2>
          <p class="text-white">
            {{ headerData.nickName }}
          </p>
        </div>
        <!--/ profile title -->
      </div>
    </div>
    <!--/ profile picture -->

    <!-- profile navbar -->
    <div class="profile-header-nav">
      <b-navbar toggleable="md" type="light">
        <!-- toggle button -->
        <b-navbar-toggle class="ml-auto" target="nav-text-collapse">
          <feather-icon icon="AlignJustifyIcon" size="21" />
        </b-navbar-toggle>
        <!--/ toggle button -->

        <!-- collapse -->
        <b-collapse id="nav-text-collapse" is-nav>
          <b-tabs pills class="profile-tabs mt-1 mt-md-0" nav-class="mb-0">
            <template #tabs-start>
              <b-nav-item role="presentation" active class="font-weight-bold">
                <span class="d-none d-md-block">Feed</span>
                <feather-icon icon="RssIcon" class="d-block d-md-none" />
              </b-nav-item>
              <b-nav-item role="presentation" class="font-weight-bold">
                <span class="d-none d-md-block">About</span>
                <feather-icon icon="InfoIcon" class="d-block d-md-none" />
              </b-nav-item>
              <b-nav-item role="presentation" class="font-weight-bold">
                <span class="d-none d-md-block">Photos</span>
                <feather-icon icon="ImageIcon" class="d-block d-md-none" />
              </b-nav-item>
              <b-nav-item role="presentation" class="font-weight-bold">
                <span class="d-none d-md-block">Friends</span>
                <feather-icon icon="UsersIcon" class="d-block d-md-none" />
              </b-nav-item>
            </template>

            <!-- edit buttons -->
            <template #tabs-end>
              <b-navbar-nav class="nav align-items-center ml-auto">
                <b-nav-item-dropdown
                  right
                  toggle-class="d-flex align-items-center dropdown-user-link"
                  class="dropdown-user"
                >
                  <template #button-content>
                    <b-button variant="primary" class="ml-auto">
                      <feather-icon icon="EditIcon" class="d-block d-md-none" />
                      <span class="font-weight-bold d-none d-md-block"
                        >Edit</span
                      >
                    </b-button>
                  </template>

                  <b-dropdown-item
                    @click="updateImg(false)"
                    link-class="d-flex align-items-center"
                  >
                    <feather-icon size="16" icon="ImageIcon" class="mr-50" />
                    <span>Update Cover</span>
                  </b-dropdown-item>
                  <b-dropdown-divider />
                  <b-dropdown-item
                    @click="updateImg(true)"
                    link-class="d-flex align-items-center"
                  >
                    <feather-icon size="16" icon="ImageIcon" class="mr-50" />
                    <span>Update Profile Photo</span>
                  </b-dropdown-item>
                  <b-dropdown-divider />

                  <b-dropdown-item link-class="d-flex align-items-center">
                    <router-link
                      :to="{
                        name: 'editProfile',
                        params: {
                          id: userId,
                        },
                      }"
                    >
                      <feather-icon size="16" icon="UserIcon" class="mr-50" />
                      <span>Update Profile</span>
                    </router-link>
                  </b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </template>
            <!-- edit buttons -->
          </b-tabs>
        </b-collapse>
        <!--/ collapse -->
      </b-navbar>
    </div>
    <!--/ profile navbar -->
    <input type="file" @change="uploadImg" ref="file" style="display: none" />
  </b-card>
</template>

<script>
/*eslint-disable */
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
} from "bootstrap-vue";
import DarkToggler from "@core/layouts/components/app-navbar/components/DarkToggler.vue";
import Ripple from "vue-ripple-directive";
import { HTTP } from "@/main-source";

export default {
  data() {
    return {
      IMGUrl: "https://localhost:7084/api/User/Img/Storage%5C",
      imgStatus: null,
      userId: JSON.parse(localStorage.getItem("userInfo")).id,
    };
  },
  components: {
    BCard,
    BTabs,
    BButton,
    BNavItem,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BImg,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    DarkToggler,
  },
  directives: {
    Ripple,
  },
  methods: {
    updateImg: function (value) {
      this.$refs.file.click();
      this.imgStatus = value;
      console.log(value);
    },
    uploadImg(event) {
      console.log(event.target.files);
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      HTTP.post(
        "api/User/updateImg?userId=" +
          this.headerData.id +
          "&type=" +
          this.imgStatus,
        formData
      )
        .then((result) => {
          if (result.status == 200) {
            console.log(result.data);
            if (this.imgStatus) {
              this.headerData.img = result.data;
            } else {
              this.headerData.backgroundImg = result.data;
            }
            localStorage.setItem("userInfo", JSON.stringify(this.headerData));
          }
        })
        .catch((err) => {});
    },
  },
  computed: {},
  props: {
    headerData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
