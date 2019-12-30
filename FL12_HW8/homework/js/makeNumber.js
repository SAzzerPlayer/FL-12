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
console.log(makeNumber('erer384jjjfd123'));
console.log(makeNumber('123098h76gfdd'));
console.log(makeNumber('ijifjgdj'));
