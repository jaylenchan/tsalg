# [328] 奇偶链表 思路

1. 题目要求，奇数索引节点放一块，偶数节点索引放一块，奇数节点片段放偶数节点片段之前。
2. 特判：如果head不存在，或者head存在且只有一个节点，直接返回不需要进行任何操作。
3. 否则，能够到达如下逻辑，说明链表至少有两个节点。
4. 我们发现，偶数索引一定是在奇数索引的前边的，所以如果说偶数索引节点的下一个偶数索引节点存在，那么奇数索引的下一个奇数索引节点一定也存在
5. 因此，我们只需要判断偶数索引节点的下一个链接的偶数索引节点是否存在即可。
6. 我们设置两个变量，一个odd用来跑奇数索引节点，一个even用来跑偶数索引节点
7. 首先，经过特判，我们已经有至少两个节点了，所以可以大胆初始化odd = head， even = head.next
8. 从当前初始化的even出发，循环判断curEven.next && curEven.next.next是否存在，实际上这句话是说even还能不能往下走两步？能，请进入循环进行操作：

   - 此时，如果进入到了循环，我们根据刚才的分析，可以大胆的设置当前odd跟下一个奇数节点的连接，然后让odd来到下一个奇数索引节点的位置
   - 让当前curEven跟下一个偶数索引节点进行连接，然后curEven来到下一个偶数索引节点的地方（这里用curEven，是因为偶数节点片段需要保留第一个节点even用来跟奇数片段的末尾链接）
   - 循环操作

9. 当退出循环的时候，说明curEven.next && curEven.next.next 不成立了，由于curEven是末尾偶数节点，所以curEven一定不为空。那么只可能是curEven.next为空或者
curEven.next存在（curEven.next.next === null说明curEven.next存在的，要不然节点第一个next就报错了）
   1. 因此我们需要判断curEven.next是否存在：如果存在一定是奇数节点，此时需要让odd再连接一个奇数索引节点，然后odd更新位置
   2. 将odd尾部跟even头部相连
   3. 返回head
