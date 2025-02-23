function bubbleSort(list) {
    const swap = (i, j) => {
        let tem = list[i];
        list[i] =  list[j];
        list[j] = tem;
        tem = null;
    }

    for(let i = list.length - 1; i > 0; i--) {
        let flag = false;
        for(let j = 0; j < list.length - 1; j++) {
            if (list[j+1] < list[j]) {
                swap(j, j+1);
                flag = true;
            }
        }

        if (!flag) break;
    }

    console.log(list)
}


function insertSort(list) {
    // 与基准元素左侧已排好序的区间进行比较
    // 时间复杂度 n²
}

function quickSort(list) {

}