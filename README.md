# 解析器
* 先按照[文档](https://hsiaosiyuan0.gitbook.io/icj)敲一遍，对整个解析过程：词法分析，语法分析，语义分析 有个大概的了解

## requirements
* node v12.9.0

## dev
* 项目根目录下 `node src/entry.js`

## 其他
### 运算符优先级
* JavaScript 中，运算符 `**` 的优先级比 `*`、`/` 高，[参考这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
* 普通的 `+/-/*//` 是左结合性的，而 `**` 是右结合性的。

## 参考资料
* https://hsiaosiyuan0.gitbook.io/icj
* nodejs 调试 https://www.cnblogs.com/knightreturn/p/6480637.html
