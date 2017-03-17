'use strict'

function swap (arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function bubbleSort (arr) {
  // 冒泡排序，想象一个冒泡过程，先让最大的露出水面
  // 然后次之的 依次类推
  // 每一轮（外层循环）只能确定一个元素的位置
  // 第一轮确定最后一个元素
  for (let i = 1, len = arr.length; i < len; i++) {
    // 最大值也就是 len - i 的位置
    // 例如 第一轮 i = 1 所以此时 j 的最大值是 len - 2
    // 然后内层循环的最后一轮就是 len - 2 + 1（len - 1，最后一个元素） 的值和 len - 2 做对比
    for (let j = 0; j < len - i; j++) {
      if (arr[j + 1] < arr[j]) {
        swap(arr, j + 1, j)
      }
    }
  }
  return arr
}

function bubbleSort2 (arr) {
  for (let i = arr.length; i >= 2; i--) {
    // 第一次一个大循环
    // j 的最大值就是 i - 2 也就是 len - 2
    // 所以内层比较的时候 最后一轮就是
    // len - 2 + 1 = len - 1 的值和 len - 2 的对比
    for (let j = 0; j <= i - 2; j++) {
      if (arr[j + 1] < arr[j]) {
        swap(arr, j + 1, j)
      }
    }
  }
  return arr
}

const test = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
const test2 = [1, 3, 0, 7, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

console.log('冒泡排序结果：', bubbleSort(test))
console.log('冒泡排序2结果：', bubbleSort2(test2))