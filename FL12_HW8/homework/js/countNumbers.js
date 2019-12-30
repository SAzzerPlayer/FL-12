function makeNumber(str){
    let numbers = "0123456789";
    let outNumber = "";
    for(let i=0;i<str.length;i++){
        if(numbers.includes(str[i])){
            outNumber+=str[i];
        }
    }
    return outNumber;
}
function countNumbers(str){
    str = makeNumber(str);
    let outObj = {};
    for(let i=0; i<str.length;i++){
        if(str[i] in outObj){
            outObj[str[i]] += 1;
        } else{
            outObj[str[i]] = 1;
        }
    }
    return outObj;
}
console.log(countNumbers('erer384jj4444666888jfd123'));
console.log(countNumbers('jdjjka000466588kkkfs662555'));
console.log(countNumbers(''));
