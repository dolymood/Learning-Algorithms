'use strict'

/**
 * 链表节点
 * 通过 next 一直找寻下一个 Node 即可形成一个单向的链表
 */
class Node {
  constructor (item) {
    this.item = item
    this.next = null
  }
}

/**
 * 迭代式 反转链表
 */
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

/**
 * 递归式 反转链表
 */
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

function buildTestLinkList (n) {
  let i = 0
  const head = new Node(i)
  let tmp = head
  while (i < n) {
    i++
    tmp.next = new Node(i)
    tmp = tmp.next
  }
  return head
}

console.time('迭代式')
const reversed = reverse(buildTestLinkList(5000))
console.timeEnd('迭代式')
console.time('递归式')
const reversed2 = reverse2(buildTestLinkList(5000))
console.timeEnd('递归式')

console.log('迭代式', reversed)
console.log('递归式', reversed2)


/**
 * 删除节点 但是不能删除尾节点
 */
function delNode (node) {
  const next = node.next
  // 完全拷贝 next 指向 以及 item 的值
  node.next = next.next
  node.item = next.item
}
const delLink = buildTestLinkList(3)
console.log('当前链表', delLink)
const n = delLink.next
const item = n.item
delNode(n)
console.log('删除节点' + item + '后结果', delLink)


/**
 * 删除倒数第 n 个节点
 */
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

const rmLink = buildTestLinkList(3)
removeNthFromEnd(rmLink, 2)
console.log('删除倒数第2个节点后结果：', rmLink)