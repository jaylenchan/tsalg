# 思路

1. 利用一个队列存放扁平化后的数据，接口next和hashNext都是对队列数据情况的使用
2. flatten函数用于扁平化嵌套数据，我们遍历数组发现如果是数字，我们加入当前层的结果数组中，否则递归扁平化数据
3， 返回结果