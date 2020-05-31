#### 混入对象中的data数据是共享的
以下混入代码混入两个组件中, 位于一个页面的两个组件通过 v-show 来切换显示隐藏的时候, console.log(this.headlines) 得到的是他们全部的hls, 而通过 v-if 来切换, 就得到的是各自的, 感觉是把两个组件当作了一个整体来处理;
要分别显示各自的 hls, 还有一种方法就是将 headlines: [] 定义在组件各自的data里(也是比较正经的方法哈哈)

如果位于一个页面的两个组件需要一个公共的目录, 这种情景就很适合
```
export const jump = {
  data(){
    return {
      headlines: []         
    }
  },
  mounted(){
    this.getHeadlines()    
  },
  methods:{ 
    getHeadlines(){   
      const headlines = []   
      let hls = document.querySelectorAll('.mo-headline')      
      hls.forEach(item => {        
        if(item.tagName == 'H1') headlines.push(item.innerText)
      })
      this.headlines = headlines
      console.log(this.headlines)
    } 
  }
}
```