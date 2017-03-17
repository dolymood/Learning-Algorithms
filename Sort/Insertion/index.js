'use strict'

function swap (arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function insertionSort (arr) {
  // 插入排序 对于要选择的元素，把他插入到合适位置即可
  // 打扑克牌的节奏
  for (let i = 1, len = arr.length; i < len; i++) {
    // 从当前的前一个作对比 依次比较
    for (let j = i; j > 0; j--) {
      // 当前元素比前一个要小 交换他们位置
      if (arr[j] < arr[j - 1]) {
        // 交换
        swap(arr, j, j - 1)
      } else {
        // 如果 j 位置的元素 比他之前的还要大的话
        // 就没必要再往前比较下去了
        break
      }
    }
  }
  return arr
}

function insertionSort2 (arr) {
  // 插入排序优化版本 对于上一个版本而言 每当一个元素比他之前的
  // 要小的话 就需要交换一次 而交换则比较耗时 所以要想办法减少交换
  for (let i = 1, len = arr.length; i < len; i++) {
    // 这个元素应该插入到 目标 j 的位置
    const el = arr[i]
    let j
    // 先假定他就应该放到 i 的位置
    for (j = i; j > 0; j--) {
      // 如果说前面的元素比 el 还要大
      // 说明假定的目标位置 j 需要前移
      if (arr[j - 1] > el) {
        // 把前一个位置的元素向后移动一位
        // 其实就相当于要留出一个位置来放目标元素
        arr[j] = arr[j - 1]
      } else {
        // 如果 j 位置的元素 比他之前的还要大的话
        // 就没必要再往前比较下去了
        break
      }
    }
    // 最后把该元素放到目标位置
    arr[j] = el
  }
  return arr
}

const test = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
const test2 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
console.log('插入排序结果：', insertionSort(test))
console.log('插入排序2结果：', insertionSort2(test2))