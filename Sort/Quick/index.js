'use strict'

function quickSort (arr) {
  // 快速排序 选择一个基准是 arr[0]， 如果说 比他小的 放在左边
  // 比他大的 放在右边
  const base = arr[0]
  const len = arr.length
  if (len <= 1) {
    return arr
  }
  const left = []
  const right = []
  for (let i = 1; i < len; i++) {
    // 小于基准值的所有的都放到左边
    // 否则放入右边
    if (arr[i] < base) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  // 递归调用比基准值小的那部分 连接 上当前基准值 以及 递归调用比基准值大的那部分
  return quickSort(left).concat(base, quickSort(right))
}

function swap (arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function quickSort2 (arr) {
  // 经典做法 速度也会更快
  _quickSort(arr, 0, arr.length - 1)
  // 递归函数
  function _quickSort (arr, start, end) {
    if (start >= end) {
      return
    }
    // 调用完 _partition 后 n 这个位置的元素已经符合要求了 
    const n = _partition(arr, start, end)
    // n 前边的元素排序
    _quickSort(arr, start, n - 1)
    // n 后边元素排序
    _quickSort(arr, n + 1, end)
  }
  // 返回一个索引值 n
  // 使得 arr[left, n - 1] < arr[n] <= arr[n + 1, right]
  function _partition (arr, left, right) {
    // 这个过程中需要满足 arr[left + 1 ... n] < v <= arr[n + 1, ...right)
    const base = arr[left]
    let n = left
    for (let i = left + 1; i <= right; i++) {
      if (arr[i] < base) {
        // swap(arr, ++n, i)
        swap(arr, n + 1, i)
        n++
      }
    }
    swap(arr, left, n)
    return n
  }
}

function quickSort3 (arr) {
  _quickSort(arr, 0, arr.length - 1)
  // 递归函数
  function _quickSort (arr, start, end) {
    if (start >= end) {
      return
    }
    const n = _partition(arr, start, end)
    _quickSort(arr, start, n - 1)
    _quickSort(arr, n + 1, end)
  }
  // 返回一个索引值 n
  // 使得 arr[left, n - 1] < arr[p] < arr[p + 1, right]
  // 双路快速排序
  // 这里采用哨兵做法 左一个哨兵指向开始元素 右一个哨兵指向结束元素
  // 先让右边哨兵先动 遇到小于基准值的停止
  // 然后让左边哨兵再动 遇到大于基准值的停止
  // 然后将换此时的 左右哨兵位置的元素的值
  // 如果说此时两个哨兵相遇了 那么相遇的位置已经找到
  // 则交换基准值和相遇位置的值即可 返回这个相遇的位置
  function _partition (arr, left, right) {
    // 这里选择的基准值永远是最左边元素
    // 其实还可以是随机得到 left right 之间的一个
    // n = left + Math.random() * (right - left + 1)
    // 然后交换下 n he  left 的值
    // swap(arr, left, n) 这样就随机选取基准值了
    // 这样即使对于几近排好序的数组速度也没那么慢了 要不然复杂度就差不多是 O(n^2) 了
    const base = arr[left]
    let i = left
    let j = right
    while (i !== j) {
      // 保证右边的元素大于等于 基准值 说明右侧的
      // 元素没有问题 继续往左边前行
      // 这里同时要保证 j > i 的 不要越界
      while (arr[j] >= base && i < j) {
        j--
      }
      // 如果小于等于基准值 左侧元素没有问题
      // 继续往右走
      // 同样保证 i < j 才可以
      while (arr[i] <= base && i < j) {
        i++
      }
      // 如果说 i < j 才交换
      if (i < j) {
        swap(arr, i, j)
      }
    }
    // 交换 left 和 两个哨兵相遇位置
    // 此时 i 和 j 是相等的
    swap(arr, left, i)
    return i
  }
}

function quickSort4 (arr) {
  _quickSort(arr, 0, arr.length - 1)
  // 递归函数
  function _quickSort (arr, start, end) {
    if (start >= end) {
      return
    }
    // 
    const position = _partition(arr, start, end)
    _quickSort(arr, start, position[0] - 1)
    _quickSort(arr, position[1], end)
  }
  // 返回一个索引数组 [lt, gt]
  // 使得 arr[left, lt - 1] < arr[lt] == arr[gt - 1] < arr[gt, right]
  // 三路快速排序
  // 分成小于基准值的 等于基准值的 大于基准值的 三部分进行
  // 主要针对于当有大量相同元素的时候效率比较高
  function _partition (arr, left, right) {
    const base = arr[left]
    // 小于基准值的最右侧位置
    let lt = left
    // 大于基准值的最左侧位置位置
    let gt = right + 1
    // 循环的当前元素位置
    let i = left + 1
    // 此时 i lt gt 需要满足如下条件
    //  arr[left + 1, lt] < base
    //  arr[lt + 1, i) == base 前闭后开
    //  arr[gt, right] > base
    while (i < gt) {
      const el = arr[i]
      if (el < base) {
        // 小于基准值 则交换lt的下一个元素（即等于基准值的最左侧位置元素）和当前元素
        // 这样当前元素就跑到了lt位置的右边
        swap(arr, lt + 1, i)
        // 让 lt 位置 右移一位
        lt++
        // 继续向右
        i++
      } else if (el > base) {
        // 大于基准值 则交换gt的前一个元素和当前元素
        // 这样当前元素就跑到了gt位置的左边
        // 原来 gt 左边位置的元素则被交换到了 i 的位置
        // 所以此时 不需要让 i++
        swap(arr, gt - 1, i)
        // 让 gt 左移一位
        gt--
      } else {
        // 等于基准值 直接右移就好了
        i++
      }
    }
    // 交换 left 和 lt 位置元素
    // 这样交换完后 == base 的那部分：arr[lt + 1, i] = base
    // 就变成了 arr[lt, i==gt - 1] = base 了
    // 也就是相当于 lt 为 等于基准值的开始位置
    swap(arr, left, lt)
    return [lt, gt]
  }
}

const test = [2, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 7, 2, 9, 10, 100]
const test2 = [2, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 7, 2, 9, 10, 100]
const test3 = [2, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 7, 2, 9, 10, 100]
const test4 = [2, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 7, 2, 9, 10, 100]
console.log('快速排序结果：', quickSort(test))
quickSort2(test2)
console.log('快速排序2结果：', test2)
quickSort3(test3)
console.log('快速排序3结果：', test3)
quickSort4(test4)
console.log('快速排序4结果：', test4)