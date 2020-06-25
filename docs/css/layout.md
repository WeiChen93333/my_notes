### 布局

#### 改变布局 (正常文档流) 的方式

##### 浮动
##### 定位

##### Flex
Flex-item包含有固定尺寸的子元素,比如图片时,设置flex-shrink等无效,需要将图片设为width:100%(此时图片height也会同比缩小),如果将图片设为height:100%,则图片高度和flex-item内容高度一样，如果flex-item还有其他子元素，其他子元素会被挤出去。
Flex布局中, 块级元素宽度在不设置的情况下由子元素撑开
如果设置 line-height, flex-shrink 会无效, 也就是由 line-height 撑开的高度不会缩小; 如果设置 height, 会缩小, 但也不会无限缩小到刚刚放在flex-container的程度, 而是缩小到包裹文字内容就停下(由字体大小决定)


#### 经典布局实践

##### 圣杯布局
**要求:**
- 上部(header)和下部(footer)各自占领屏幕所有宽度。
- 上下部之间的部分(container)是一个三栏布局。
- 三栏布局两侧宽度不变，中间部分自动填充整个区域。
- 中间部分的高度是三栏中最高的区域的高度。

##### 双飞翼布局