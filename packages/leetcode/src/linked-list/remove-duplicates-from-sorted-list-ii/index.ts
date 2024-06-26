/*
 * @lc app=leetcode.cn id=82 lang=typescript
 * @lcpr version=30204
 *
 * [82] 删除排序链表中的重复元素 II
 */
class ListNode {
  public val: number
  public next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}
// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null)
    return head

  // 能走到这里，说明至少两个点
  const dummyHead = new ListNode(-1)
  dummyHead.next = head

  let prev = dummyHead

  let cur: any = head
  let duplicate = Infinity

  while (true) {
    if (cur === null)
      break
    if (cur.next && cur.next.val === cur.val) {
      duplicate = cur.val
      cur = cur.next
    }
    else {
      if (cur && duplicate === cur.val) {
        cur = cur.next
        prev.next = cur
      }
      else {
        prev = cur
        cur = cur.next
      }
    }
  }

  return dummyHead.next
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,3,3,4,4,5]\n
// @lcpr case=end

// @lcpr case=start
// [1,1,1,2,3]\n
// @lcpr case=end

 */
export { deleteDuplicates }
