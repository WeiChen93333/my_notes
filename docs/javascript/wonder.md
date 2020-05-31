> 获取给定范围的随机数

Math.ceil(Math.random()*(this.wordBase.length-1)) 似乎取不到 0, Math.ceil(0) 的结果是 0 啊, 为什么取不到呢
parseInt(Math.random()*(this.wordBase.length)) 这样就没问题了