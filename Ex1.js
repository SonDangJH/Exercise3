

function removeDupplicateUsingForLoop(arr) {
    const result = [];
    for (let x of arr)
    {
        if (result.indexOf(x) === -1) {
            result.push(x);
        }
    }
    return result;
}

function removeDupplicateUsingSet(arr) {
    const result = new Set();
    for (let x of arr) 
    {
        result.add(x);
    }
    return Array.from(result);
}

const array =[1,2,2,3,4,4,4,5,6] ;

function removeDupplicateUsingMap(arr) {
    const dictionary = new Map();
    for (let x of arr) {
        if (!dictionary.has(x))
        {
            dictionary.set(x,x);
        }
    }
    return Array.from(dictionary, ([value]) => (value ));
}

const removeDupplicateFunctionList = new Map();
removeDupplicateFunctionList.set("forLoopMethod",removeDupplicateUsingForLoop);
removeDupplicateFunctionList.set("setMethod",removeDupplicateUsingSet);
removeDupplicateFunctionList.set("mapMethod",removeDupplicateUsingMap);

function removeDupplicateValue(arr,opt) {
    const functionOption = removeDupplicateFunctionList.get(opt);
    if (functionOption === undefined)
        throw new Error("The option you choose is not valid")
    return functionOption(arr);
}

console.log(removeDupplicateValue(array,"forLoopMethod"));


