import dayjs from 'dayjs'

export const timeFormatMixin = {
  filters: {
    showTime(value) {
      return dayjs(value).format('YYYY-MM-DD')
    }
  }
}