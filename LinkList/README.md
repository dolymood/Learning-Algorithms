## 链表

链表就是一种递归的数据结构，它要么为空，要么指向一个节点 Node 的引用。

链表不单单都是单向的，还有双向的——双向链表（操作效率更高，但是占用空间变大）。

## 题目

### 删除当前节点

首先能想到的是删除当前节点的思路就是：找到当前节点的上一个节点，然后把上一个节点的 `next` 指向当前节点的下一个即可。但是这种会有一个问题就是需要从头遍历链表（对于双向链表就没这个问题了），效率会受到影响。

除去遍历的方法，还有另外一种比较好的思路：那就是拷贝当前节点的下一个节点的全部拷贝到当前节点，然后删除下一个节点即可。

如同下边的例子，假设要删除 `b` 节点，那么步骤如下：

```
a -> b -> c -> d

// 1 拷贝
a -> c(copy) -> c -> d

// 2 删除 c
a -> c(copy) -> d
```

转换成代码就是（注：不能删除最后一个节点）：

```js
function delNode (node) {
  const next = node.next
  // 完全拷贝 next 指向 以及 item 的值
  node.next = next.next
  node.item = next.item
}
```

### 删除从尾部数的第 N 个节点

这种情况呢，既不能从尾部开始遍历，也不能知道长度（也可以遍历一遍完整，然后再遍历），那该如何下手？

有个思路就是利用两个指针，都先在链表头部，然后让一个先走 N 步，之后让两个一块走，当先走的指针到达尾部的时候，此时也就意味着后走的指针就是指向的倒数第 N 个节点的前一个节点。

例如说下边的示例中，要删除倒数第2个节点 `c` ，则需要经过如下步骤：

```
a -> b -> c -> d

// 1 初始 一个先走 2 步
p1 = c // (2步 b c)
p2 = a

// 2 向后移
p1 = d
p2 = b

// 此时 p1 已经到达了最后一个
// p2 则是在目标节点 c 的前一个位置
```

剩下的就好办了，直接把 `p2` 的下一个删除就好了；完整代码如下：

```js
function removeNthFromEnd (head, n) {
  let p1 = head
  let p2 = head
  let i = 0
  while (p1 && i < n) {
    p1 = p1.next
    i++
  }
  if (!p1) {
    // 此时还没到倒数第 n 个呢 也就意味着链表长度还是小于要移除的第 N 的值的
    // 就走删除第一个逻辑
    return head.next
  }
  while (p1.next) {
    // 一直让 p1 走到最后
    p1 = p1.next
    p2 = p2.next
  }
  // 删除 p2 的下一个即可
  p2.next = p2.next.next
  return head
}
```

### 反转一个链表

有两种做法：迭代式和递归式。

迭代式呢，基本思路就是创建一个结果变量，初始值为 `null` ，然后依次去交换其和链表中节点位置。整个过程类似于下边的样子：

```
a -> b -> c -> null
ret = null

// 1
b = a.next
a.next = ret
ret = a
// 此时
ret(a) -> null

// 2
c = b.next
b.next = ret(a)
ret = b
// 此时
ret(b) -> ret(a) -> null

// 3
d = c.next
c.next = ret(b)
ret = c
// 此时
ret(c) -> ret(b) -> ret(a) -> null
```

转换成代码就是：

```js
function reverse (head) {
  let ret = null
  while (head) {
    // 这里将 head 和 ret 交换
    let next = head.next
    head.next = ret
    ret = head
    // 继续下一个
    head = next
  }
  return ret
}
```

而递归式式的逻辑则是先找到最后的，然后直接把他当做链表的头，依次把当前的和下一个做交换即可：

```js
function reverse2 (head) {
  if (!head) {
    return null
  }
  if (!head.next) {
    return head
  }
  const next = head.next
  // 找到最后一个作为反转后链表的开始
  const newHead = reverse2(next)
  // 把 next 和 当前的作交换
  next.next = head
  // 当前 head 的 next 肯定是 null 了
  head.next = null
  return newHead
}
```