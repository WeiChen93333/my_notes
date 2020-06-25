### 将一个网站的内容嵌入另一个网站的页面中
有些通用的内容可集中放在一个页面文件中，其它要用到这些内容的页面只需要包含（引用）这个通用文件即可。这样便于维护，如果有很多网页，当通用内容需要修改时，只改一个文件就可以了，不需要每个文件单独修改。

#### iframe
```js
<iframe 
  src="http://120.79.214.0/music/#/music" 
  height="400" 
  width="700" 
  name="music" 
  frameborder="0" 
  scrolling="no" 
  sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts" 
></iframe>
```