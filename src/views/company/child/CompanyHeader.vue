<template>
  <van-sticky>
    <div class="company-header">
      <!-- 头部区域 - 搜索 -->
      <div class="header-search">
        <div>公司</div>
        <van-search
          class="search-box"
          shape="round"
          v-model="searchValue"
          placeholder="请输入搜索关键词"
        />
      </div>
      <!-- 头部区域 - banner -->
      <div class="company-banner" v-show="!isShow">
        <img
          src="http://134.175.59.248/heimamm_mobile/img/ios3x_img_banner@3x.9ed762f2.png"
        />
      </div>
      <!-- 头部区域 - 筛选区域 -->
      <div class="header-filter">
        <div
          class="filter-left filter-left-recommend"
          :class="{ active: !companyData.distance && !companyData.score }"
          @click="recommendClick"
        >
          推荐
        </div>
        <div class="filter-left filter-left-distance" @click="filterClick('distance')">
          距离
          <span>
            <i
              :class="{ active: companyData.distance === 'desc' }"
              class="iconfont rotate iconicon_xuanze_nor"
            ></i>
            <i
              :class="{ active: companyData.distance === 'asc' }"
              class="iconfont iconicon_xuanze_sel"
            ></i>
          </span>
        </div>
        <div class="filter-left filter-left-score" @click="filterClick('score')">
          评分
          <span>
            <i
              :class="{ active: companyData.score === 'desc' }"
              class="iconfont rotate iconicon_xuanze_nor"
            ></i>
            <i
              :class="{ active: companyData.score === 'asc' }"
              class="iconfont iconicon_xuanze_sel"
            ></i>
          </span>
        </div>
        <div class="filter-right" @click="changePopup">筛选</div>
      </div>
    </div>
  </van-sticky>
</template>

<script>
export default {
  name: 'CompanyHeader',
  props: {
    companyData: {
      type: Object,
      default () {
        return {}
      }
    },
    searchValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    filterClick(value) {
      this.$emit('changeFilters', value)
    },
    recommendClick () {
      this.$emit('changeRecommend')
    },
    changePopup () {
      this.$emit('changePopup')
    }
  }
}
</script>

<style scoped lang="scss">
.company-header {
  background: #fff;
  padding: 0 15px;
  .header-search {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    color: #222222;
    line-height: 80px;
    .search-box {
      flex: 1;
    }
  }
  .company-banner {
    img {
      width: 100%;
    }
  }
  .header-filter {
    display: flex;
    align-items: center;
    padding: 20px 0px;
    padding-bottom: 10px;
    font-size: 16px;
    color: #222222;
    .filter-left {
      display: flex;
      align-items: center;
      margin-right: 40px;
      > span {
        display: flex;
        flex-direction: column;
        line-height: 10px;
        .rotate {
          transform: rotate(180deg);
        }
        .iconfont {
          color: #b4b4bd;
        }
      }
    }
    .filter-right {
      flex: 1;
      text-align: right;
    }
    .active {
      color: red !important;
    }
  }
}
</style>