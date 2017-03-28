'use strict'

function swap (arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

class MaxHeap {
  constructor (arr, capacity) {
    if (Array.isArray(arr)) {
      // heapify 的情况
      capacity = arr.length
      this.data = new Array(capacity + 1)
      // 给 data 赋值
      for (let i = 0; i < capacity; i++) {
        this.data[i + 1] = arr[i]
      }
      // 此时 count 的值不为 0 了
      this.count = capacity
      // 从第一个不是叶子节点开始 一次执行 shiftdown 操作
      for (let i = Math.floor(capacity / 2); i >= 1; i--) {
        this._shiftDown(i);
      }
    } else {
      capacity = arr
      this.data = new Array(capacity + 1)
      this.count = 0
    }
  }
  showData () {
    const data = this.data.slice(1, this.count)
    return data
  }
  size () {
    return this.count
  }
  isEmpty () {
    return this.count === 0
  }
  insert (item) {
    if (this.count + 1 >= this.data.length) {
      throw new Error('length err')
    }
    // 直接插入到最后位置
    this.data[this.count + 1] = item
    this.count++
    // 然后 check 当前位置
    this._shiftUp(this.count)
  }
  _shiftUp (pos) {
    while (pos > 1) {
      const parent = Math.floor(pos / 2)
      if (this.data[pos] > this.data[parent]) {
        // 如果说 当前的值 比 其 parent 的值还要大 则交换他们的位置
        swap(this.data, pos, parent)
        pos = parent
      } else {
        break
      }
    }
  }

  extractMax () {
    if (this.count > 0) {
      // 一定要有
      const ret = this.data[1]
      // 把当前最大值和 count 做互换
      // 因为 要把最大的根元素拿出来 所以要拿一个元素填补
      // 这个元素就是 count 元素
      swap(this.data, 1, this.count)
      delete this.data[this.count]
      this.count--
      // 此时根是比较小的元素 需要重新梳理
      this._shiftDown(1)
      return ret
    }
    return null
  }
  _shiftDown (pos) {
    // 从最顶部开始 依次检查
    const maxP = Math.floor(this.count / 2)
    while (pos <= maxP) {
      const childLeft = pos * 2
      let childRight = childLeft + 1
      if (childRight > this.count) {
        // 如果右边元素没有 则让其等于 left 的值 即可
        childRight = childLeft
      }
      // 和较大的那个做交换 为了满足性质 根一定比下边的大的特性
      const maxChild = this.data[childLeft] > this.data[childRight] ? childLeft : childRight
      if (this.data[maxChild] > this.data[pos]) {
        // 如果此时孩子的要比根的还要大 则交换他们
        swap(this.data, maxChild, pos)
        pos = maxChild
      } else {
        // 已经达到要求了
        break
      }
    }
  }
}

const maxheap = new MaxHeap(10)
let i = 1
while (i <= 10) {
  maxheap.insert(i++)
}

console.log('最大堆', maxheap.showData())
console.log('最大堆去除最大的元素', maxheap.extractMax(), maxheap.showData())


// 下一步利用最大堆来进行排序
function heapSort (arr) {
  const len = arr.length
  const maxheap = new MaxHeap(len)
  for (let i = 0; i < len; i++) {
    // 依次插入到 maxheap 中
    maxheap.insert(arr[i])
  }

  // 通过 extractMax 依次得到最大值
  // 因为排序结果应该是从小到大 所以这里需要倒序
  for (let i = len - 1; i >= 0; i--) {
    arr[i] = maxheap.extractMax()
  }
}

function heapSort2 (arr) {
  // 直接支持 heapify
  const maxheap = new MaxHeap(arr)
  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i] = maxheap.extractMax()
  }
}

const test = [1, 3, 0, 7, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
const test2 = [1, 3, 0, 7, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
heapSort(test)
console.log('堆排序结果：', test)
heapSort2(test2)
console.log('堆排序2结果：', test2)
