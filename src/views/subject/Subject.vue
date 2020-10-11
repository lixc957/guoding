<template>
  <div class="subject" v-if="totalCount">
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item ref="dropdownItem">
        <template #title>
          <!-- 标题部分 -->
          <div class="dropdown-item-title">面试宝典</div>
          <p>{{ city }}</p>
        </template>
        <template #default>
          <van-index-bar>
            <div v-for="(value, key) in cityList" :key="key">
              <van-index-anchor style="background-color: #eee" :index="key" />
              <van-cell
                :title="item"
                v-for="(item, index) in value"
                :key="index"
                @click="changeCity(item)"
              />
            </div>
          </van-index-bar>
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>
    <div class="position-list">
      <ul>
        <li 
          v-for="(item, index) in cityPosition" 
          :key="index"
          :class="{active: currentIndex === index}"
          @click="changeIndex(index)">{{ item.name }}</li>
      </ul>
    </div>
    <div class="subject-content">
      <div class="subject-content-item error">
        <i class="iconfont iconicon_mine_cuoti"></i>
        <p>常错题库</p>
      </div>
      <div class="subject-content-item collect">
        <i class="iconfont iconicon_mine_tikushoucang"></i>
        <p>收藏题库</p>
      </div>
      <div class="subject-content-item compony">
        <i class="iconfont iconicon_mine_qiyeshoucang"></i>
        <p>企业题库</p>
      </div>
      <div class="subject-content-item answer">
        <i class="iconfont iconicon_mine_mianjing"></i>
        <p>已答题库</p>
      </div>
      <!-- 中间的圆 -->
      <van-circle
        class="subject-content-circle"
        size="120px"
        layer-color="transparent"
        v-model="currentRate"
        :color="{
          '0%': 'rgba(228,1,55,0.3)',
          '100%': 'rgba(228,1,55,0.7) 99%) 13 13'
        }"
        :stroke-width="60"
        :rate="rate"
        :speed="100"
      >
        <template #default>
          <div class="content-circle-text">
            <div class="circle-title">顺序刷题</div>
            <div class="circle-total">
              {{ correctCount }} / {{ totalCount }}
            </div>
          </div>
        </template>
      </van-circle>
    </div>
    <div class="total-sum">
      <h3>累计记录</h3>
      <div class="total-count">{{ totalCount }}</div>
    </div>
    <div class="subject-btn-submit">
      <van-button color="#00b8d4" size="large" @click="goInnerView">模拟面试</van-button>
    </div>
  </div>
</template>

<script>
import { getCityList } from 'network/subject'

export default {
  name: 'Subject',
  data () {
    return {
      city: '全国',
      cityList: {},
      cityPositionList: {},
      cityPosition: [],
      currentIndex: 0,
      currentRate: 0,
      totalCount: 0,
      correctCount: this.$store.state.userInfo.correctQuestions.length
    }
  },
  created() {
    this.getCityList()
  },
  methods: {
    async getCityList() {
      const res = await getCityList()
      this.cityList = res.data.citys
      this.cityPositionList = res.data.cityPositions
      this.cityPosition = res.data.cityPositions[this.city]
      this.totalCount = res.data.totalCount
    },
    changeCity(item) {
      this.city = item
      this.$refs.dropdownItem.toggle()
      this.currentIndex = 0
    },
    changeIndex (index) {
      this.currentIndex = index
    },
    goInnerView() {
      this.$router.push({
        path: '/subject/inter',
        query: {
          type: this.cityPosition[this.currentIndex].id,
          city: this.city
        }
      })
    }
  },
  computed: {
    rate() {
      return Math.ceil(this.correctCount / this.totalCount * 100)
    }
  },
  watch: {
    city(newVal) {
      this.cityPosition = this.cityPositionList[newVal]
    }
  }
}
</script>

<style scoped lang="scss">
.subject {
  /deep/ .van-dropdown-menu__bar {
    box-shadow: 0 0px 0px;
  }
  /deep/ .van-ellipsis {
    display: flex;
    .dropdown-item-title {
      font-size: 18px;
      color: #222;
      font-weight: 600;
      font-family: PingFangSC, PingFangSC-Semibold;
    }
    > p {
      margin-left: 5px;
      margin-top: 2px;
      height: 100%;
      font-size: 12px;
      font-weight: 400;
      color: #545671;
    }
  }
  .position-list {
    background: #ffffff;
    box-shadow: 0px 4px 8px 0px rgba(24, 26, 57, 0.04);
    ::-webkit-scrollbar {
      display: none;
    }
    ul {
      display: flex;
      padding: 10px 0;
      overflow: scroll;
      li {
        flex-shrink: 0;
        align-self: center;
        padding: 6px 12px;
        margin: 0 15px;
        border-radius: 14px;
        font-size: 14px;
        color: #545671;
        background: #f7f4f5;
        &.active {
          background: #00b8d4;
          color: #ffffff;
        }
      }
    }
  }
  .subject-content {
    height: 200px;
    margin-top: 15px;
    background: #ffffff;
    position: relative;
    .subject-content-item {
      text-align: center;
      i {
        display: inline-block;
        width: 44px;
        height: 44px;
        box-sizing: border-box;
        font-size: 26px;
        color: #fff;
        line-height: 44px;
        border-radius: 50%;
      }
      p {
        margin-top: 6px;
        color: #545671;
        font-size: 14px;
      }
      &.error {
        position: absolute;
        top: 15px;
        left: 40px;
        i {
          background: linear-gradient(180deg, #ff8080, #ff4949);
        }
      }
      &.collect {
        position: absolute;
        top: 15px;
        right: 40px;
        i {
          background: linear-gradient(180deg, #ffda05, #ffb302);
        }
      }
      &.compony {
        position: absolute;
        bottom: 15px;
        left: 40px;
        i {
          background: linear-gradient(180deg, #00ddec, #00b8d4);
        }
      }
      &.answer {
        position: absolute;
        bottom: 15px;
        right: 40px;
        i {
          background: linear-gradient(180deg, #3ee5b1, #1dc779);
        }
      }
    }
    .subject-content-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      background: url(~assets/img/subject/circleBg.png);
      background-size: cover;
      .content-circle-text {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100px;
        height: 100px;
        padding: 30px 0;
        border-radius: 50%;
        color: #fff;
        font-size: 16px;
        background: linear-gradient(180deg, #ff6f92, #e40137);
        .circle-title {
          margin-bottom: 10px;
        }
      }
    }
  }
  .total-sum {
    margin-top: 15px;
    padding-top: 25px;
    background: #ffffff;
    height: 130px;
    text-align: center;
    h3 {
      color: #545671;
      font-size: 18px;
      font-weight: 600;
    }
    .total-count {
      margin-top: 25px;
      color: #545671;
      font-size: 30px;
      font-weight: 600;
    }   
  }
  .subject-btn-submit {
    padding: 15px;
    button {
      border-radius: 8px;
    }
  }
}
</style>