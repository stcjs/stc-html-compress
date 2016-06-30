# stc-html-compress

Compress html for stc, support template syntax

## Install

```sh
npm install stc-html-compress
```

## How to use

```js
// stc.config.js

var htmlCompress = require('stc-html-compress');

stc.workflow({
  compressHtml: {plugin: htmlCompress, include: {type: 'tpl'}, options: {}}
})

```

## options

```js
{
  'trim': false,  //去除首尾空白字符 
  'removeComment': true,  //移除注释
  'simpleDoctype': true,  //简化doctype
  'simpleCharset': true,  //简化charset
  'tagToLower': true,  //小写标签名
  'removeHtmlXmlns': true,  //移除html的命名空间
  'removeInterTagSpace': false,  //移除标签之间的空格，非安全
  'removeEmptyScript': false,  //移除空的script标签
  'removeEmptyStyle': false,  //移除空的style标签
  'removeOptionalAttrs': true,  //移除可选的属性
  'removeAttrsQuote': true,  //移除属性值的引号
  'removeAttrsOptionalValue': true,  //移除可选属性的值
  'removeHttpProtocol': false,  //移除http协议
  'removeHttpsProtocol': false,  //移除https协议
  'removeOptionalEndEag': true,  //移除可选的结束标签
  'optionalEndTagList': null,  //结束标签列表，数组
  'removeVoidElementSlash': true, //移除单一标签最后的 /
  'compressStyleValue': true,  //压缩标签的style值 
  'compressInlineCss': true,  //压缩内联的CSS
  'compressInlineJs': true,  //压缩内联的JS
  'removeInlineJsCdata': true,  //
  'compressJsTpl': true,  //压缩前端模版
  'compressTag': true  //压缩标签
}
```
