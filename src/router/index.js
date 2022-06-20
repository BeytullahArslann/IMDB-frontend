import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/profile/:id/edit',
      name: 'editProfile',
      component: () => import('@/views/components/profile/account-setting/AccountSetting.vue'),
      meta: {
        pageTitle: 'Edit Profile',
        breadcrumb: [
          {
            text: 'Edit Profile',
            active: true,
          },
        ],
      },
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import('@/views/components/profile/Profile.vue'),
      meta: {
        pageTitle: 'Profile',
        breadcrumb: [
          {
            text: 'Profile',
            active: true,
          },
        ],
      },
    },
    {
      path: '/profile/:id/movieList',
      name: 'movieList',
      component: () => import('@/views/components/profile/Profile.vue'),
      meta: {
        pageTitle: 'My Lists',
        breadcrumb: [
          {
            text: 'My Lists',
            active: true,
          },
        ],
      },
    },
    {
      path: '/people/:id',
      name: 'people',
      component: () => import('@/views/components/people/People.vue'),
      meta: {
        pageTitle: 'People',
        breadcrumb: [
          {
            text: 'People',
            active: true,
          },
        ],
      },
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('@/views/Movie.vue'),
      meta: {
        pageTitle: 'Movie',
        breadcrumb: [
          {
            text: 'Movie',
            active: true,
          },
        ],
      },
    },
    {
      path: '/tvShow/:id',
      name: 'tvShow',
      component: () => import('@/views/components/tvShow/TvShow.vue'),
      meta: {
        pageTitle: 'TV Show',
        breadcrumb: [
          {
            text: 'TV Show',
            active: true,
          },
        ],
      },
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/tvShows',
      name: 'tvShows',
      component: () => import('@/views/TvShows.vue'),
      meta: {
        pageTitle: 'Tv Shows',
        breadcrumb: [
          {
            text: 'Tv Shows',
            active: true,
          },
        ],
      },
    },
    {
      path: '/actors',
      name: 'actors',
      component: () => import('@/views/Actors.vue'),
      meta: {
        pageTitle: 'Actors',
        breadcrumb: [
          {
            text: 'Actors',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
