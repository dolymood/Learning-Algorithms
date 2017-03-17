'use strict'

function mergeSort (arr, start, end) {
  // 归并排序 典型的分治思想
  // 首先将数组分成两部分 然后分别对两部分进行排序
  // 得到两个已经排好序的数组，然后再对这两个排好序的
  // 数组进行合并(归并) 得到完整的排序后数组
  // 这里就是一个典型递归过程
  
  const ret = []
  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = arr.length - 1
  }
  const len = end - start
  if (len <= 0) {
    ret[0] = arr[start]
    return ret
  }

  const midd = start + Math.floor(len / 2)
  // 已经排好的左半边
  const left = mergeSort(arr, start, midd)
  // 已经排好的右半边
  const right = mergeSort(arr, midd + 1, end)
  // 将左右半边两个有序的合并成一个有序的
  let leftIndex = 0
  let rightIndex = 0
  let index = 0
  right[right.length] = Infinity
  left[left.length] = Infinity
  while (index <= len) {
    if (left[leftIndex] < right[rightIndex]) {
      ret[index] = left[leftIndex]
      leftIndex += 1
    } else {
      ret[index] = right[rightIndex]
      rightIndex += 1
    }
    index += 1
  }
  return ret
}

// 将一个数组中已经排好序的两部分进行合并排序
// start 到 midd 是有序的
// midd + 1 到 end 是有序的
function _merge2 (arr, start, midd, end) {
  // 拷贝从 start 直到 end
  const copy = []
  for (let i = start; i <= end; i++) {
    copy[i - start] = arr[i]
  }
  // 左半部的index用 i 表示，从 start 开始
  // 右半部的index用 j 表示，从 midd + 1 开始
  // 赋值的index值用 k 表示，从 start 开始 end 结束
  for (let i = start, j = midd + 1, k = start; k <= end; k++) {
    // 此时 左半部分的值
    const leftV = copy[i - start]
    // 有半部分的值
    const rightV = copy[j - start]

    if (i > midd) {
      // 左边部分已经排完了
      arr[k] = rightV
      j += 1
    } else if (j > end) {
      // 右边部分已经排完了
      arr[k] = leftV
      i += 1
    } else {
      // 正常情况 比较左边的值 和 右边的值
      // 如果左边的值 比较小 就赋值数组中 k 次序的值为左边的值
      // 否则赋值右边的值
      if (leftV < rightV) {
        arr[k] = leftV
        // 左半部的index需要更新到下一个位置
        i += 1
      } else {
        arr[k] = rightV
        // 同理，右半部的index需要更新到下一个位置
        j += 1
      }
    }
  }
}

function mergeSort2 (arr) {
  _mergeSort(arr, 0, arr.length - 1)
  function _mergeSort(arr, start, end) {
    if (start >= end) {
      return
    }
    // 依旧是一分为二
    const midd = Math.floor((start + end) / 2)
    // 递归调用左半部分
    _mergeSort(arr, 0, midd)
    // 递归调用又半部分
    _mergeSort(arr, midd + 1, end)
    // 将左半部分和右半部分合并排序
    _merge2(arr, 0, midd, end)
  }
}

function _merge3 (arr, start, midd, end) {
  // 分别拷贝左右两部分的内容到两个数组中
  const leftLen = midd - start + 1
  const rightLen = end - midd
  const copyLeft = new Array(leftLen)
  const copyRight = new Array(rightLen)
  // 开始拷贝
  for (let i = 0; i < leftLen; i++) {
    copyLeft[i] = arr[start + i]
  }
  for (let i = 0; i < rightLen; i++) {
    copyRight[i] = arr[midd + 1 + i]
  }
  // 为了简化判断条件
  copyLeft[leftLen] = Infinity
  copyRight[rightLen] = Infinity
  let leftIndex = 0
  let rightIndex = 0
  for (let i = start; i <= end; i++) {
    const leftV = copyLeft[leftIndex]
    const rightV = copyRight[rightIndex]
    if (leftV < rightV) {
      arr[i] = leftV
      leftIndex += 1
    } else {
      arr[i] = rightV
      rightIndex += 1
    }
  }
}

function mergeSort3 (arr) {
  _mergeSort(arr, 0, arr.length - 1)
  function _mergeSort(arr, start, end) {
    if (start >= end) {
      return
    }
    const midd = Math.floor((start + end) / 2)
    _mergeSort(arr, 0, midd)
    _mergeSort(arr, midd + 1, end)
    _merge3(arr, 0, midd, end)
  }
}


// 在 mergeSort2 基础上优化
function mergeSort4 (arr) {
  _mergeSort(arr, 0, arr.length - 1)
  function _mergeSort(arr, start, end) {
    if (start >= end) {
      return
    }
    // 依旧是一分为二
    const midd = Math.floor((start + end) / 2)
    // 递归调用左半部分
    _mergeSort(arr, 0, midd)
    // 递归调用又半部分
    _mergeSort(arr, midd + 1, end)
    // ！！！加了这句判断 因为如果 midd 的值 小于等于 midd + 1
    // 的话 就没必要进行 merge 了
    if (arr[midd] > arr[midd + 1]) {
      // 将左半部分和右半部分合并排序
      _merge2(arr, 0, midd, end)
    }
  }
}

function mergeSort5 (arr) {
  // 自底向上的合并 不需要递归 只需要迭代
  // 第一次迭代从 1 个开始 
  // 下一轮 i = 2
  // 再下一轮就是 i = 4 了

  // 每次的合并间隔 step
  // 第一个 拆分成为单个的
  let step = 1
  const len = arr.length
  while (step < len) {
    // 只要 step 小于 len 值 继续
    let start = 0
    let midd = start + step - 1
    let end = midd + step
    // 下面的步骤就是 分别合并排好序的
    // 当 step = 1 时
    // 第一轮合并 start = 0, midd = 0, end = 1 调用的区间是 [0, 0] [1, 1]
    // 第二轮合并 start = 2, midd = 2, end = 3 调用的区间是 [2, 2] [3, 3]
    // ... 以此类推
    // 
    // 当 step = 2 时
    // 第一轮合并 start = 0, midd = 1, end = 3, 调用的区间是 [0, 1] [2, 3]
    // 第二轮合并 start = 4, midd = 5, end = 7, 调用的区间是 [4, 5] [6, 7]
    // ... 以此类推
    while (midd < len) {
      // end 有可能越界
      _merge2(arr, start, midd, Math.min(end, len - 1))
      start = end + 1
      midd = start + step - 1
      end = midd + step
    }
    step *= 2
  }
}

const test = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
const test2 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
const test3 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
const test4 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
const test5 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
console.log('归并排序结果：', mergeSort(test))
mergeSort2(test2)
console.log('归并排序2结果：', test2)
mergeSort3(test3)
console.log('归并排序3结果：', test3)
mergeSort4(test4)
console.log('归并排序4结果：', test4)
mergeSort5(test5)
console.log('归并排序5（自低向上）结果：', test5)