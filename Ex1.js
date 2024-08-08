

function removeDupplicateUsingForLoop(arr) 
{
    let result = [];
    for (let x of arr)
    {
        if (result.indexOf(x) === -1) {
            result.push(x);
        }
    }
    return result;
}

function removeDupplicateUsingSet(arr) {
    let result = new Set();
    for (let x of arr) 
    {
        result.add(x);
    }
    return Array.from(result);
}

function removeDupplicateUsingMap(arr) {
    let dictionary = new Map();
    for (let x of arr) {
        if (!dictionary.has(x))
        {
            dictionary.set(x,x);
        }
    }
    return Array.from(dictionary, ([value]) => (value ));
}

let array =[1,2,2,3,4,4,4,5,6] ;

var removeDupplicateFunctionList = new Map();
removeDupplicateFunctionList.set(1,removeDupplicateUsingForLoop);
removeDupplicateFunctionList.set(2,removeDupplicateUsingSet);
removeDupplicateFunctionList.set(3,removeDupplicateUsingMap);

function removeDupplicateValue(arr,opt) 
{
    const functionOption = removeDupplicateFunctionList.get(opt);
    return functionOption(arr);
}

console.log(removeDupplicateValue(array,1));
