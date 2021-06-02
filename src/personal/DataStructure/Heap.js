// 堆 用数组实现的二叉树
// 最小堆，父节点的值比每一个子节点的值都要小
// 最大堆，父节点的值比每一个子节点的值都要大
//                10
            
//          7          2

//        5    1

// [10, 7, 2, 5, 1]

// i为节点索引
// parents(i) = floor((i-1)/2)
// left(i) = 2i+1
// right(i) = 2i+2

//  Node	Array index (i)	    Parent index	Left child	    Right child
//  10	    0	                -1	            1	            2
//  7	    1	                0	            3	            4
//  2	    2	                0	            5	            6
//  5	    3	                1	            7	            8
//  1	    4	                1	            9	            10

