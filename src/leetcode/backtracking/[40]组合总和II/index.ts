/*
 * @lc app=leetcode.cn id=40 lang=typescript
 *
 * [40] 组合总和 II
 */
export { combinationSum2 }
// @lc code=start
function combine(
  candidates: number[],
  start: number,
  target: number,
  path: number[],
  result: number[][]
): void {
  if (target <= 0) {
    if (target == 0) {
      result.push([...path])
    }
    return
  }

  for (let i = start; i < candidates.length; i++) {
    const cur = candidates[i]
    if (cur <= target) {
      path.push(cur)
      combine(candidates, i + 1, target - cur, path, result)
      path.pop()
    }
    while (candidates[i + 1] == candidates[i]) {
      i++
    }
  }
}

function combinationSum2(candidates: number[], target: number): number[][] {
  const path: number[] = []
  const result: number[][] = []

  candidates.sort((a, b) => a - b)
  combine(candidates, 0, target, path, result)

  return result
}

// @lc code=end

/**
 * #思路#
 * 1.题目要求找到所有满足target的数的组合，而且不能重复使用每个数，且数的组合也不能重复
 * 2.模式分析：看到求所有组合问题，我们可以想到利用回溯来解决
 * 3.解决数不重复使用问题：我们遍历数组，设定一个start，表明每一次递归子过程的for从start开始
 *   这样子，我们每一次嵌套的for循环（递归展开来就是多个for）都只能从当前start开始，start一开始是0，
 *   递归到子过程就是每次的i+1，这样子可以让我们的过程都严格的没法选取前边选过的数。
 * 4.解决组合不重复使用问题：我们先对整个数组进行排序，然后当选取第一个数的组合完成跟target的匹配后，
 *   此时在循环的末尾判断下一个数是否相同，相同则i++跳过这个数即可
 */
