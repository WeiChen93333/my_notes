### custom directives  
https://vuejs.org/v2/guide/custom-directive.html  

**自定义指令初体验**
- 情景描述: 
  有一个通过点击控制其显示和隐藏的 div, 这个 div 包含一个 input 输入框, 需要在 div 显示时 input 输入框自动聚焦
- 方案:
  ```
  <div class="search-box" v-if="searchBoxVisible">
    <input type="text" class="text" v-focus
      v-model="inputWord"
      @keyup.enter="inputSearch(inputWord)">
    <i class="iconfont icon-i-search" @click="inputSearch(inputWord)"></i>
  </div>

  directives: {
    focus: {
      inserted(el){       
        el.focus()
      }
    }
  }
  ```
- 注意:  
  通过 v-show 控制显示和隐藏时, 使用 autofocus 和自定义指令都完全无效;  
  通过 v-if 控制显示和隐藏时, 使用 autofocus 第一次点击出现时, 获取焦点, 之后无效;

**自定义指令使用之二**
- 情景描述: 
  有一个 overflow-y 设置为 auto 的元素, 其子元素的高度随传入的数据而变化; 当子元素高度超过父元素且使用滚轮滚动后, 改变数据, 滚动依然停留着原来的位置, 而不是回到顶部, 也就是子元素的内容改变, 而位置不变; 需要让数据改变的时候子元素回到初始位置
- 方案:
  ```
  <div id="word-info-display"  v-backtotop>
    <p class="not-found" v-if="!wordInfo">查 无 此 词</p>
    <div class="word-info-container" v-else>
      <div class="word">{{wordInfo.word}}</div>
      <div class="meaning"
        v-for="(item1, index1) in wordInfo.meanings" :key="index1">
        <p class="explanation">{{item1.explanation}}</p>
        <p class="sentence" :class="{property: item2.includes('[part of speech]')}"
          v-for="(item2, index2) in item1.sentences" :key="index2"
          >{{item2}}</p>
      </div>
    </div>
  </div>

  directives: {
    backtotop: {
      componentUpdated(el){      //所在组件的 VNode 及其子 VNode 全部更新后调用。 
        el.scrollTop = 0         
      }
    }
  }
  ```

