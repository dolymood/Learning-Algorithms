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
  let prev = null
  while (head) {
    // 这里将 head 和 prev 交换
    let next = head.next
    head.next = prev
    prev = head
    // 继续下一个
    head = next
  }
  return prev
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
  // 下一个的 next 就指向当前的开始
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
const reversed = reverse(buildTestLinkList(10000))
console.timeEnd('迭代式')
console.time('递归式')
const reversed2 = reverse2(buildTestLinkList(10000))
console.timeEnd('递归式')

console.log('迭代式', reversed)
console.log('递归式', reversed2)
