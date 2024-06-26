/*
 * @lc app=leetcode.cn id=48 lang=typescript
 * @lcpr version=30204
 *
 * [48] 旋转图像
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
  let top = 0
  let left = 0
  let down = matrix.length - 1
  let right = matrix[0].length - 1

  while (left < right) {
    _rotate(matrix, top++, left++, down--, right--)
  }
}

function _rotate(matrix: number[][], top: number, left: number, down: number, right: number): void {
  const groupCount = right - left

  for (let i = 0; i < groupCount; i++) {
    // 在这里将每个小组的四个方位的对应元素进行交换
    const temp = matrix[top][left + i] //  保存左上角
    // 左上角: 顺时针90度就是左上被左下替换
    matrix[top][left + i] = matrix[down - i][left]
    // 左下角: 顺时针90度就是左下被右下替换
    matrix[down - i][left] = matrix[down][right - i]
    // 右下角: 顺时针90度就是右下被右上替换
    matrix[down][right - i] = matrix[top + i][right]
    // 右上角: 顺时针90度就是右上被左上替换
    matrix[top + i][right] = temp
  }
}
// @lc code=end

/*
// @lcpr case=start
// [[1,2,3],[4,5,6],[7,8,9]]\n
// @lcpr case=end

// @lcpr case=start
// [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]\n
// @lcpr case=end

 */
export { rotate }
