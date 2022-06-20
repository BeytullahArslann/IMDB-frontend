<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div
      class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"
    >
      <dark-Toggler class="d-none d-lg-block" />
    </div>
    <div v-if="!userData" class="d-flex align-items-center row">
      <div class="col-6">
        <b-button variant="success" @click="login">Login</b-button>
      </div>
      <div class="col-6">
        <b-button variant="primary" @click="register">Register</b-button>
      </div>
    </div>
    <b-navbar-nav v-if="userData" class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ userData.name + " " + userData.surname }}
            </p>
            <span class="user-status">{{ userData.nickName }}</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="IMGUrl + userData.img"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center">
          <router-link
            :to="{
              name: 'profile',
              params: {
                id: userData.id,
              },
            }"
            ><feather-icon size="16" icon="UserIcon" class="mr-50" />
            <span>Profile</span></router-link
          >
        </b-dropdown-item>

        <!-- <b-dropdown-item link-class="d-flex align-items-center">
          <router-link
            :to="{
              name: 'movieList',
              params: {
                id: userData.id,
              },
            }"
          >
            <feather-icon size="16" icon="ListIcon" class="mr-50" />
            <span>Movie List</span></router-link
          >
        </b-dropdown-item> -->

        <!-- <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="CheckSquareIcon" class="mr-50" />
          <span>Task</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="MessageSquareIcon" class="mr-50" />
          <span>Chat</span>
        </b-dropdown-item> -->

        <b-dropdown-divider />

        <b-dropdown-item @click="logout" link-class="d-flex align-items-center">
          <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
/* eslint-disable */
import {
  BButton,
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
} from "bootstrap-vue";
import DarkToggler from "@core/layouts/components/app-navbar/components/DarkToggler.vue";
import router from "@/router";

export default {
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userInfo")),
      IMGUrl: "https://localhost:7084/api/User/Img/Storage%5C",
    };
  },
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BButton,

    // Navbar Components
    DarkToggler,
  },
  created() {
    //console.log(this.userData,"asdsadasd")
  },
  methods: {
    login: function () {
      router.push("/login");
    },
    register: function () {
      router.push("/register");
    },
    logout: function () {
      localStorage.setItem("userInfo", null);
      this.userData = null;
    },
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
