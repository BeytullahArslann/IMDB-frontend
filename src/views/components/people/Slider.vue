<template>
  <swiper
    class="swiper-multiple"
    :options="swiperOptions"
    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
  >
    <swiper-slide
      v-for="(data,index) in swiperData"
      :key="index"
    >
      <b-img
        :src="data.img"
        fluid
      />
    </swiper-slide>

    <div
      slot="pagination"
      class="swiper-pagination"
    />
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { BImg } from 'bootstrap-vue'
import 'swiper/css/swiper.css'

export default {
/*eslint-disable */
  components: {
    Swiper,
    SwiperSlide,
    BImg,
  },
  data() {
    return {
      imgUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/",
      swiperData: [],
      /* eslint-disable global-require */

      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    }
  },
  created() {
      setTimeout(() => {
      this.img.forEach(element => {
          this.swiperData.push(
              {img: this.imgUrl + element.file_path}
          )
      });
       
      }, 500);
      
  },
  props: ['img']
}
</script>