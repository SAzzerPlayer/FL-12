function getMin(){
    if(arguments.length === 0) {
 return 0; 
} else {
        let min = arguments[0];
        for (let i = 0; i < arguments.length; i++) {
            if(arguments[i] < min) {
 min = arguments[i]; 
}
        }
        return min;
    }
}
console.log(getMin(3, 0, -3));