import Vue from "vue/dist/vue.js";

Vue.config.productionTip = false;

new Vue({
    data: {
        n: 0,
        history: [],
        inUndoMode: false
    },
    watch: {
        n: function (newValue, oldValue) {
            console.log(this.inUndoMode);
            if (!this.inUndoMode) {
                this.history.push({from: oldValue, to: newValue});
            }
        }
    },
    // 不如用 computed 来计算 displayName
    template: `
      <div>
      {{ n }}
      <hr/>
      <button @click="add1">+1</button>
      <button @click="add2">+2</button>
      <button @click="minus1">-1</button>
      <button @click="minus2">-2</button>
      <hr/>
      <button @click="undo">撤销</button>
      <hr/>

      {{ history }}
      </div>
    `,
    methods: {
        add1() {
            this.n += 1;
        },
        add2() {
            this.n += 2;
        },
        minus1() {
            this.n -= 1;
        },
        minus2() {
            this.n -= 2;
        },
        undo() {
            const last = this.history.pop();
            this.inUndoMode = true;
            console.log("ha" + this.inUndoMode);
            const old = last.from;
            this.n = old; // watch n 的函数会异步调用
            this.$nextTick(() => {
                this.inUndoMode = false;
            });
        }
    }
}).$mount("#app");
