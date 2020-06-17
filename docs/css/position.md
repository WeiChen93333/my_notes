> 元素的尺寸及位置，常常会受它的包含块所影响, 确定一个元素的包含块的过程完全依赖于这个元素的 position 属性 (static, relative, absolute, fixed, sticky)

https://developer.mozilla.org/zh-CN/docs/Web/CSS/All_About_The_Containing_Block

#### 确定包含块
- 初始包含块：根元素 html 存在的包含块，指的是以整个 canvas (渲染内容的空间) 的坐标原点(左上)为基准，以 viewport (也就是浏览器视窗内渲染 HTML 的空间)为大小的矩形。It has the dimensions of the viewport (for continuous media) or the page area (for paged media).
- 定位为 static 或者 relative 或者 sticky 时, 最近的祖先块元素的内容区
- 定位为absolute时, 最近的非static定位祖先元素的内边距区
- 定位为fixed，视口
- 定位为absolute或fixed时，也可能是满足某些条件的最近祖先元素
  - 设置为absolute的元素没有最近定位祖先元素和满足某些条件的祖先元素时，初始包含块
  - 通过设置 transform, filter 等不为 none 改变 fixed 元素包含块后, fixed 元素失去其原有特质, 不再固定在某一位置, 而是随着文档流移动, 表现和 absolute 定位一样

### 定位(非 static)引起的改变
- 正常流中, 一个元素如不设置宽高, 宽度继承自父元素, 高度由子元素撑开
- 设置了定位的元素不再继承父元素的宽度, 可将 width 设置为 inherit 强行继承。
- 行内元素设置为绝对定位后可以设置宽高, 同时父元素设置的 text-align 无效


### 定位类型
#### static
正常流, 没什么好说的

#### relative
relative定位的元素是脱标的 但是原来在标准流里的位置会保留  
![](./img/position1.png)

#### absolute
滚动滚轮时发生了什么：好像子元素都是铺在一层“布”上，向下滚动滚轮时，将整块布往上扯动，从而看到下面的内容。这层布是父元素的延伸，因此父元素有定位时子元素的 offsetTop 都不会随着滚轮滚动而变化。绝对定位元素也会随着鼠标滚动而滚动  
- 情景描述: 一个不设置高度的相对定位的元素 A, 拥有正常流子元素 B 和绝对定位元素 C; 当 A 的 overflow 值设置为 auto 或 scroll 时, 如果绝对定位元素超出父元素范围, A 元素将出现滚动条; 滚动滚轮则 B 和 C 都会移动, 同时如果 A 有背景色, 背景色会显露出来; 也就是说, 绝对定位元素虽然不影响 A 元素高度, 但是它会撑开 A 元素的 '布', 会导致滚动条的出现(或者说, 为了满足设置看到它, 提供了滚动条), 然后 A 元素的高度为正常流元素的高度加上 x 轴上的滚动条; overflow 设置对绝对定位元素也是有影响的, 父元素设置了隐藏或是滚动, 它也会被隐藏, 会随滚轮滚动而滚动
*(元素脱标的感觉, 像是用起子把地板起了一块出来, 但是还是放在原来的位置, 只是不在一个平面了哈哈)*
- 情景升级: A 元素添加一个父元素 S, S 设置宽高, A 元素不设置宽高, B 设置高度, 且大于 S 的高度; 当 S 和 A 的 overflow 均不设置时, 不会出现滚动条, 同时 B 元素和 C 元素都能被完全看见; 奇怪的是, 当 S 的 overflow-y 或 overflow-x 设置为 auto 时, x 和 y 方向都会出现滚动条, 同时 A 会随滚轮滚动而滚动....


#### fixed
定位依据的是 containing block，position fixed 的 containing block 是 viewport 建立的(for a fixed positioned box, the containing block is established by the viewport)
transform 是因为其特殊性影响了 fixed 的 containing block
Any computed value other than none for the transform results in the creation of both a stacking context and a containing block. The object acts as a containing block for fixed positioned descendants.

#### sticky


### Z-index
z-index属性只设置给定位元素(非 static 元素), 默认值为 auto，也就是 0。  
(现象：absolute 定位元素如果不设置 top 等则会按文档顺序出现在兄弟元素中间(它脱标后兄弟元素上行)，并产生遮挡，此时，设置 z-index 为 -1，则位于父元素之下)  
0层：正常流元素位于此层，定位元素初始位于此层。层中上下顺序主要取决于文档顺序，定位元素位于正常流元素之上。  
一个定位元素 z-index 设置为 -1 后会位于父元素之下，若父元素背景为透明色，则可以被看见，但是不能“摸”到。