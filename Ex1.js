

function removeDupplicate1(arr) 
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

function removeDupplicate2(arr) {
    let result = new Set();
    for (let x of arr) 
    {
        result.add(x);
    }
    return Array.from(result);
}

function removeDupplicate3(arr) {
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
console.log(removeDupplicate(array));