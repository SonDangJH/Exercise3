function findMostRepetition(arr) {
    const countDictionary = new Map();
    for (const num of arr) {
        countDictionary.set(num, (countDictionary.get(num) || 0) + 1);
    }

    let maxCount = 0;
    for (const count of countDictionary.values()) {
        maxCount = Math.max(maxCount, count);
    }

    const result = [];
    for (const [num, count] of countDictionary.entries()) {
        if (count === maxCount) {
        result.push(num);
        }
    }

    return result;
    
}

let array = [1,1,2,3,4,5,6,6,7,8,8];
console.log(findMostRepetition(array))