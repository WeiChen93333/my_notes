### custom directives  
https://vuejs.org/v2/guide/custom-directive.html  

**全局注册**
```
Vue.directive(  
  focus, {
    inserted(el){       
      el.focus()
    }
  }
)
```

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
  //当 autofocus 与 v-focus 一起使用: Autofocus processing was blocked because a document already has a focused element.
  ```
- 注意:  
  通过 v-show 控制显示和隐藏时, 使用 autofocus 和自定义指令都完全无效;  
  通过 v-if 控制显示和隐藏时, 使用 autofocus 第一次点击出现时, 获取焦点, 之后无效;
  (autofocus 只在模板加载完成时起作用)

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

**自定义指令使用之三**
- 情景描述: 一个表单, 包含三个 mo-input 组件; 如果在 mo-input 组件内部的 input 元素上加 v-focus, 自动聚焦在第三个, 而不是第一个 (inserted 钩子是执行了三次的, 估计是只能聚焦一个, 所以后面有聚焦, 就把前面取消了); 这三个 input 元素都嵌套在 div 内, 如何确定谁是表单中的第一个 input 呢?
- 方案
  ```
  Vue.directive(  
    'focus', {
      inserted(el, binding){      
          if(el.tagName == 'INPUT')  return el.focus()    
          if(el.tagName == 'FORM'){
            el.firstElementChild.firstElementChild.childNodes.forEach(item =>{
              if(item.tagName == 'INPUT') item.focus()
            })
          }
      }      
    }
  )
  ```

**自定义指令使用之四**  
- 情景描述: p 标签包含一段应为你文本, 要将其中某个单词高亮显示
- 方案
  ```
  const highlight = Vue.directive(  
    'highlight', {
      inserted(el, binding, vnode){        
        const keyword = binding.value
        const reg = eval(`/\\b${keyword}\\b/ig`)      
        el.innerHTML = el.innerHTML.replace(reg, `<span style="color:#008000; font-weight:600">${keyword}</span>`)     
      }    
    }
  )
  ```
- 当前存在的问题: 重新请求数据时, 显示不刷新的问题  
  - 如果改变每页显示的条数, 是没有问题的; 而如果改变了页码, 也即是要用新请求到的新数据完全**替换**原有数据, 视图不会刷新   
  原因: v-for 的就地复用机制  
  - 解决:  
  自定义指令钩子函数的第三个参数vnode：Vue 编译生成的虚拟节点。只要给他赋一个唯一的值，就可以强制 dom 刷新了 (vnode.key = 'unique')
