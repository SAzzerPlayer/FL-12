function isBigger(first,second){
    return first > second;
}
function isSmaller(first,second){
    return !isBigger(first,second);
}
console.log(isSmaller(5, -1));