/*
 * @lc app=leetcode.cn id=146 lang=typescript
 *
 * [146] LRU 缓存
 */

// @lc code=start
class DNode {

  public key: number
  public value: number
  public prev: DNode | null
  public next: DNode | null

  constructor(key: number, value: number, prev?: DNode, next?: DNode) {
    this.key = key
    this.value = value
    this.prev = prev ?? null
    this.next = next ?? null
  }

}

class DoubleLikedList {

  private _dummyHead: DNode
  private _dummyTail: DNode

  constructor() {
    this._dummyHead = new DNode(-1, -1)
    this._dummyTail = new DNode(-1, -1)

    this._dummyHead.next = this._dummyTail
    this._dummyTail.prev = this._dummyHead
  }

  public add(node: DNode): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const oldLast = this._dummyTail.prev!

    node.next = this._dummyTail
    this._dummyTail.prev = node

    node.prev = oldLast
    oldLast.next = node
  }

  public removeFirst(): DNode {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const node = this._dummyHead.next!

    this._dummyHead.next = node.next
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    node.next!.prev = this._dummyHead

    node.prev = null
    node.next = null

    return node
  }

  public remove(node: DNode): DNode {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const prev = node.prev!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const next = node.next!

    prev.next = next
    next.prev = prev

    node.prev = null
    node.next = null

    return node
  }

  public removeToLast(node: DNode): void {
    this.remove(node) // 需要先将node隔离开整条链表，否则会直接把node为头节点的链表一起带起来
    this.add(node)
  }

  public toString(): string {
    let str = ''
    let cur = this._dummyHead

    while (cur.next != null) {
      str += `${cur.key}->`
      cur = cur.next
    }

    str += cur.key

    return str
  }

}

class LRUCache {

  private _capacity: number
  private _map: Map<number, DNode>
  private _list: DoubleLikedList

  constructor(_capacity: number) {
    this._capacity = _capacity
    this._map = new Map<number, DNode>()
    this._list = new DoubleLikedList()
  }

  public get(key: number): number {
    if (!this._map.has(key)) return -1

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const node = this._map.get(key)!

    this._list.removeToLast(node)

    return node.value
  }

  public put(key: number, value: number): void {
    if (this._map.has(key)) {
      return this.set(key, value)
    }

    this.add(key, value)
  }

  public set(key: number, value: number): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const node = this._map.get(key)!

    node.value = value
    this._list.removeToLast(node)
  }

  public add(key: number, value: number): void {
    const node = new DNode(key, value)

    if (this._capacity == this._map.size) {
      const delNode = this._list.removeFirst()
      this._map.delete(delNode.key)
    }

    this._map.set(key, node)
    this._list.add(node)
    this._list.removeToLast(node)
  }

}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(_capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

export default LRUCache

/**
 * 思路：
 * 题目要求设计LRU缓存，要求就是对这个结构get或者put的时候都要进行内部元素时序的安排。
 * 将最近被操作的元素重新调整到排列的末尾，表示说这个元素最后被操作过了，因此在排列最前
 * 的元素就是最早之前被动过的元素。如果我们向LRU结构加入超过结构所能承受的元素个数，那么
 * 我们就需要删除掉结构里头的元素腾出新位置，删除的标准就是最早之前动过的元素，因为最新动
 * 过的元素就是说明我们最近才用过的，依次类推。
 *
 * 问题1： 为什么要使用双向链表？
 * 问题2： 为什么链表节点存储的必须是key+value，不能只有key？
 * 问题3： 双向链表结构在这个LRU缓存结构中充当的角色是什么？
 *
 * 1. LRU缓存 = 哈希表 + 双向链表
 * 2. 哈希表：因为题目要求我们能够通过key，value的形式进行元素操作，那么我们能很快想到哈希表符合这种性质，
 * 同时题目又要求在O(1)时间内做这些操作，如果单纯是表面上的获取元素，设置元素，其实哈希表完全足够了。可是，
 * 根据LRU缓存结构的性质，当我们操作元素的过程中，我们还需要对元素的操作时序进行排列，而哈希表没办法做到元素时序排列。
 * 3. 双向链表：首先，选取双向链表，是为了能在O(1)时间内快速完成删除操作，因为如果只是元素的增改查，通过哈希表+单链表
 * 其实就能够快速完成，但是如果想要删除，只能通过双向链表，快速找到上一个节点来进行当前节点的删除操作。另外，由于链表的
 * 结构，我们能够让元素按照LRU要求具有时序安排，当进行get或者put操作的时候，我们就将元素移动到链表末尾即可。这很符合
 * 我们总是在链表的末尾加入新节点的操作，你可以想象更新元素时序，就是将元素从链表中删除，然后再加入链表。加入总是从末尾
 * 加入。
 * 4. put操作：总的来说其实是两个小操作的集合，一个是有元素了需要更改该元素的值的set操作，另外一个就是没有该元素，需要
 * 加入该元素到LRU结构的add操作。
 * 5. 对于removeToLast，其实可以这么看，看成是从链表删除该节点，然后再将该节点加入链表
 * 6.需要封装key到node节点的原因是，我们在put的时候，可能需要删除时间最早的节点，删除完之后还需要通过这个节点拿到key然后
 * 在map当中删除对应key，维持map中正确的元素个数
 * 7.双向链表在整个LRU中充当的角色如下：
 *   - 维持元素操作时序
 *   - 方便元素快速删除（时间复杂度O(1)）
 * 8.为了方便链表操作，我们最好定义dummy节点，对于双向链表就定义两个dummy，一个用于头部操作dummyHead，一个用于尾部操作dummyTail
 */
