'use strict'

function swap (arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function selectionSort (arr) {
  // 选择排序的整个过程就是从前往后 先选择第一个位置 找到最小的
  // 选择第二个位置 找到第二小的
  for (let i = 0, len = arr.length; i < len; i++) {
    // 假定现在最小的就是第 i 的元素
    let minIndex = i
    // 从下一个开始和 minIndex 的元素作比较
    // 找到真正的 minIndex 的位置
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        // 当前值比 假定的最小的值还要小
        minIndex = j
      }
    }
    // 此时选择的第 i 个位置的值 应该是
    // minIndex 位置所在的值 因此交换他们
    swap(arr, i, minIndex)
  }
  return arr
}


const test = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

console.log('选择排序结果：', selectionSort(test))
