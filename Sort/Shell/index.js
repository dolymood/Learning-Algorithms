'use strict'

function swap (arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function shellSort (arr) {
  // 希尔排序 是插入排序的升级版
  // 
  // 在插入排序中 每次都是和前一个元素作比较
  // 而在希尔排序中则是和第前 n 个元素做比较
  // 这样能保证数组中每间隔 n 的位置都是有序的
  // 而插入排序对于将近于排好序的数组进行排序的话
  // 效率是最高的 所以说通过这种方式来首先进行一定的排序
  // 
  // 每一轮递减 n 的值 当 n 的值为 1 的时候
  // 跑完后也就意味着所有的都是排好序的了
  const len = arr.length
  let n = 1
  // 动态求 n 的初始值 也就是最大步长
  // 《算法》中的计算间隔的公式
  while (n < len / 3) {
    n = 3 * n + 1
  }
  while (n >= 1) {
    // 只要步长是大于等于1的
    /* 插入排序变种开始 */
    // 从步长开始
    for (let i = n; i < len; i++) {
      // 从当前的前n个作对比 依次比较
      for (let j = i; j >= n; j -= n) {
        // 此时元素比第前n个要小 交换他们位置
        if (arr[j] < arr[j - n]) {
          // 交换
          swap(arr, j, j - n)
        } else {
          // 如果 j 位置的元素 比他之前的还要大的话
          // 就没必要再往前比较下去了
          break
        }
      }
    }
    /* 插入排序变种结束 */
    n = (n - 1) / 3
  }
  
  return arr
}

function shellSort2 (arr) {
  // 既然插入排序有优化版本 那么对应的希尔排序也会有
  const len = arr.length
  let n = 1
  // 动态求 n 的初始值 也就是最大步长
  // 《算法》中的计算间隔的公式
  while (n < len / 3) {
    n = 3 * n + 1
  }
  while (n >= 1) {
    // 只要步长是大于等于1的
    /* 插入排序2变种开始 */
    for (let i = n, len = arr.length; i < len; i++) {
      // 这个元素应该插入到 目标 j 的位置
      const el = arr[i]
      let j
      // 先假定他就应该放到 j 的位置
      for (j = i; j >= n; j -= n) {
        // 如果说前面第n个元素的元素比 el 还要大
        // 说明假定的目标位置 j 需要前移
        if (arr[j - n] > el) {
          arr[j] = arr[j - n]
        } else {
          break
        }
      }
      // 最后把该元素放到目标位置
      arr[j] = el
    }
    /* 插入排序变种结束 */
    n = (n - 1) / 3
  }
  
  return arr
}

const test = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
const test2 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 5, 3, 9, 10, 30, 3, 7, 2, 1, 9, 10, 7, 8]
console.log('希尔排序结果：', shellSort(test))
console.log('希尔排序2结果：', shellSort2(test2))