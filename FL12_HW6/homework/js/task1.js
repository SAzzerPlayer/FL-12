// Your code goes here
function isQuadraticEquation(){
    let a = document.getElementById('a-param').value;
    let b = document.getElementById('b-param').value;
    let c = document.getElementById('c-param').value;
    if(a === undefined || a === null|| b === undefined || b === null || c === undefined || c === null){
        console.log('Invalid input data');
        return 1;
    } else if(a.length === 0 || b.length === 0 || c.length === 0){
        console.log('Invalid input data');
        return 1;
    }
    const D = b*b-4*a*c;
    if(D < 0){
        console.log('No solution');
    } else if(D === 0) {
        console.log("x = '"+-1*b/(2*a)+"'");
    } else{
        let x1 = (-1*b + Math.sqrt(D)) / (2*a);
        let x2 = (-1*b - Math.sqrt(D)) / (2*a);
        console.log("x1 = '"+x1+"' and x2 = '"+x2+"'");
    }
    return 0;
}