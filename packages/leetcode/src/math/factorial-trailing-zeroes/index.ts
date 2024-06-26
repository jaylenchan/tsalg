/*
 * @lc app=leetcode.cn id=172 lang=typescript
 * @lcpr version=30204
 *
 * [172] 阶乘后的零
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function trailingZeroes(n: number): number {
  let count = 0
  while (n / 5 !== 0) {
    count += Math.floor(n / 5)
    n /= 5
  }

  return count
}

// @lc code=end

/*
// @lcpr case=start
// 3\n
// @lcpr case=end

// @lcpr case=start
// 5\n
// @lcpr case=end

// @lcpr case=start
// 0\n
// @lcpr case=end

 */
export { trailingZeroes }
