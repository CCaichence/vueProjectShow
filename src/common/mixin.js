import {NEW, POP, SELL} from './const'

export const backTopMixin = {
  data () {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
}

// export const tabControlMixin = {
//   data: function () {
//     return {
//       currentType: POP
//     }
//   },
//   methods: {
//     tabClick(index) {
//       switch (index) {
//         case 0:
//           this.currentType = POP
//           break
//         case 1:
//           this.currentType = NEW
//           break
//         case 2:
//           this.currentType = SELL
//           break
//       }
//       console.log(this.currentType);
//       // this.$refs.tabContrtrol2.currentIndex = index
//       // this.$refs.tabContrtrol3.currentIndex = index
//     }
//   }
// }
