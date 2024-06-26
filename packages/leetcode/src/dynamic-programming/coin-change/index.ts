/*
 * @lc app=leetcode.cn id=322 lang=typescript
 * @lcpr version=30204
 *
 * [322] 零钱兑换
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function coinChange(coins: number[], amount: number): number {
  // dp[i] 表示凑出i钱最少需要的硬币数
  const dp = new Array(amount + 1).fill(amount + 1)

  dp[0] = 0

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin < 0)
        continue
      dp[i] = Math.min(dp[i], 1 + dp[i - coin])
    }
  }

  return dp[amount] === amount + 1 ? -1 : dp[amount]
}
// @lc code=end

/*
// @lcpr case=start
// [1, 2, 5]\n11\n
// @lcpr case=end

// @lcpr case=start
// [2]\n3\n
// @lcpr case=end

// @lcpr case=start
// [1]\n0\n
// @lcpr case=end

 */
export { coinChange }
