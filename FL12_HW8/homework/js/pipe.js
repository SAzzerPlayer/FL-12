function addOne(x){
    return x+1;
}
function pipe(num){
    for(let i=1;i<arguments.length;i++){
        num = arguments[i](num);
    }
    return num;
}
console.log(pipe(1, addOne));
console.log(pipe(1, addOne, addOne));
