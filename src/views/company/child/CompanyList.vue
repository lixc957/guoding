<template>
  <div class="company-list">
    <div class="company-item" v-for="(item, index) in companyList" :key="index">
      <div class="company-item-logo">
        <img :src="item.logo" alt="" />
      </div>
      <div class="company-item-word">
        <div class="item-word-title">
          <div class="title-left-info">
            <p>{{ item.name }}</p>
            <p>
              <span>{{ item.region }}</span>
              &nbsp;&nbsp;
              <span>{{ item.distance }}</span>
            </p>
          </div>
          <div class="title-right-score">
            {{ item.score }}
          </div>
        </div>
        <div class="company-item-tags">
          <span>{{ item.type }}</span>
          <span>{{ item.step }}</span>
          <span>{{ item.scale }}</span>
        </div>
        <div class="company-item-msg">
          在招职位：{{ item.positions }} / 最后更新时间：
          {{ item.updated_at | showTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timeFormatMixin } from 'common/mixin'

export default {
  name: 'CompanyList',
  props: {
    companyList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mixins: [timeFormatMixin]
}
</script>

<style scoped lang="scss">
.company-list {
  padding: 20px 15px 0;
  background: #ffffff;
  .company-item {
    display: flex;
    margin-bottom: 40px;
    .company-item-logo {
      img {
        width: 60px;
        height: 60px;
        margin-right: 10px;
      }
    }
    .company-item-word {
      flex: 1;
      .item-word-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title-left-info p {
          margin: 0;
          &:first-child {
            font-size: 18px;
            font-weight: 600;
            color: #19232b;
          }
          &:last-child {
            margin-top: 5px;
            color: #545671;
            font-size: 14px;
          }
        }
        .title-right-score {
          font-size: 14px;
          color: #545671;
        }
      }
    }
    .company-item-tags {
      margin: 15px 0px;
      span {
        display: inline-block;
        background: #f7f4f5;
        padding: 6px;
        margin-right: 10px;
        border-radius: 6px;
        color: #b4b4bd;
        font-size: 14px;
      }
    }
    .company-item-msg {
      color: #b4b4bd;
      font-size: 14px;
    }
  }
}
</style>