<template lang="pug">
.Calendar_Input(
  v-click-outside="closeCalendar"
)
  input.Calendar_Input_inp(
    @click.self="isOpen = !isOpen"
    :value="output.str",
    type="text"
    readonly
  )
  .Calendar(v-show="isOpen")
    .Cr-Head
      .Cr-Head_ltMonth.ripple(@click="ltMonth()") «
      .Cr-Head_current {{months[currMonth]}} {{currYear}}
      .Cr-Head_gtMonth.ripple(@click="gtMonth()") »
    .Cr-Week
      .Cr-Week_day(v-for="day in days") {{day}}
    .Cr-Days
      .Cr-Days_blank(v-for="blank in daysOfPrevMonth") {{blank}}
      .Cr-Days_day(
        v-for="d in daysInMonth",
        :class="{Today: d == Today, clickedDay: d == clickedDay}",
        @click.stop.prevent="setDate(d)"
      ) {{d}}
      .Cr-Days_blank(v-for="_,i in qtyDaysNextMonth") {{i+1}}
</template>

<script>
const NOW = new Date();
export default {
  props: {
    /*
      установка даты
      # для вчера норм
      propSetDateFrom:="( d => new Date(d.setDate(d.getDate()-1)) )(new Date)"
      https://stackoverflow.com/questions/5511323/calculate-the-date-yesterday-in-javascript
    */
    propSetDateFrom: {
      type: Date,
      default: null
    },
    propSetDateTo: {
      type: Date,
      default: null
    }
  },
  data() {
    return {
      isOpen: false,
      inst_date: this.propSetDateFrom ? this.propSetDateFrom : NOW,
      days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      months: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек"
      ],
      clickedDay: null,
      output: {
        str: "", //1 Апр 2018
        format: "" //2018-04-01
      }
    };
  },
  computed: {
    currYear() {
      return this.inst_date.getFullYear();
    },
    currMonth() {
      return this.inst_date.getMonth();
    },
    currWD() {
      return this.inst_date.getDay();
    },
    Today() {
      return this.inst_date.getMonth() === NOW.getMonth() &&
        this.inst_date.getFullYear() === NOW.getFullYear()
        ? NOW.getDate()
        : false;
    },
    daysInMonth() {
      return new Date(this.currYear, this.currMonth + 1, 0).getDate();
    },
    _lastDateOfPrevMonth() {
      return new Date(this.currYear, this.currMonth, 0).getDate();
    },
    _qtyDaysPrevMonth() {
      return new Date(this.currYear, this.currMonth, 0).getDay();
    },
    daysOfPrevMonth() {
      return (
        this._qtyDaysPrevMonth &&
        Array.from(
          { length: this._qtyDaysPrevMonth },
          (v, k) => this._lastDateOfPrevMonth - this._qtyDaysPrevMonth + (k + 1)
        )
      );
    },
    qtyDaysNextMonth() {
      return 42 - (this.daysInMonth + this._qtyDaysPrevMonth);
    }
  },
  watch: {
    propSetDateTo(newVal) {
      this.inst_date = this.propSetDateTo;
      const setDate = this.propSetDateTo.getDate();
      this.setDate(setDate);
    }
  },
  //первый старт
  created() {
    // console.dir(this.inst_date)

    this.setDate(this.inst_date.getDate());
  },
  methods: {
    closeCalendar() {
      this.isOpen = false;
    },
    ltMonth() {
      this.clickedDay = null;
      this.inst_date = new Date(this.currYear, this.currMonth - 1);
    },
    gtMonth() {
      this.clickedDay = null;
      this.inst_date = new Date(this.currYear, this.currMonth + 1);
    },
    setDate(day) {
      this.clickedDay = day;
      /**готовим output
        output: {
          str: "1 Апреля 2018"
          format: "2018-04-01"
        }
      */
      const fixDay = day < 10 ? "0" + day : day;
      const { output, months, currMonth, currYear } = this;
      const fixMonth =
        currMonth + 1 < 10 ? "0" + (currMonth + 1) : currMonth + 1;
      output.str = `${day} ${months[currMonth]} ${currYear}`;
      output.format = `${currYear}-${fixMonth}-${fixDay}T00:00`;

      this.$emit("setdate", this.output.format);
      this.isOpen = false;
    }
  }
  // mounted() {
  //   document.addEventListener("click", this.closeCalendar.bind(this), true);
  // },
  // beforeDestroy() {
  //   document.removeEventListener("click", this.closeCalendar);
  // }
};
</script>

<style lang="stylus">
$width = 280px
$time = ($width / 7)
$M = ($width / 4)

.Calendar_Input
  position relative
  // display inline-block
  input
    border-color #bdc3c7
    //
    cursor pointer
    padding-left 2.4em !important
    background #FFF url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 16' fill='Silver'><path d='M13 2h-1v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H6v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H2c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h11c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H2V5h11v9zM5 3H4V1h1v2zm6 0h-1V1h1v2zM6 7H5V6h1v1zm2 0H7V6h1v1zm2 0H9V6h1v1zm2 0h-1V6h1v1zM4 9H3V8h1v1zm2 0H5V8h1v1zm2 0H7V8h1v1zm2 0H9V8h1v1zm2 0h-1V8h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1zm2 0h-1v-1h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1z' /></svg>") 0 center / contain no-repeat
  .Calendar
    position absolute
    z-index 5

.Calendar
  background #FFF
  box-shadow 0 1px 8px rgba(#000, .25)
  width $width
  text-align center
  user-select none
  font-weight normal

.Cr
  &-Head, &-Week, &-Days
    display flex
  &-Head, &-Week
    font-weight bold
  &-Week
    line-height 2em
    &_day
      width $time
  &-Head
    background rgba(#9b4dca, .2)
    justify-content space-between
    line-height $time
    &_current
      flex 1
    &_ltMonth, &_gtMonth
      color #FFF
      background #9b4dca
      cursor pointer
      width $time
      &:hover
        background #9b4dca + 10%
  &-Days
    flex-wrap wrap
    line-height $time
    &_blank, &_day
      width $time
    &_blank
      color #dee2e6
    &_day
      cursor pointer
      border-radius 50%
      &:hover:not(.Today):not(.clickedDay)
        background #dee2e6
    .Today
      background aliceblue
    .clickedDay
      color #FFF
      font-weight bold
      background #9b4dca
</style>
