/*
 * @lc app=leetcode.cn id=165 lang=typescript
 * @lcpr version=30204
 *
 * [165] 比较版本号
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function compareVersion(version1: string, version2: string): number {
  const v1 = parseVersion(version1)
  const v2 = parseVersion(version2)

  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    const x = i < v1.length ? v1[i] : 0
    const y = i < v2.length ? v2[i] : 0

    if (x > y) {
      return 1
    }
    else if (x < y) {
      return -1
    }
  }

  return 0
}

function parseVersion(version: string): number[] {
  return version.split('.').map(i => Number(i))
}
// @lc code=end

/*
// @lcpr case=start
// "1.2"\n"1.10"\n
// @lcpr case=end

// @lcpr case=start
// "1.01"\n"1.001"\n
// @lcpr case=end

// @lcpr case=start
// "1.0"\n"1.0.0.0"\n
// @lcpr case=end

 */
export { compareVersion }
