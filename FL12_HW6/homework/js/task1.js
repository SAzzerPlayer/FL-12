// Your code goes here

let a = prompt('Param a:','');
let b = prompt('Param b:','');
let c = prompt('Param c:','');
if(a === undefined || a === null|| b === undefined || b === null || c === undefined || c === null){
    console.log('Invalid input data');
} else if(a.length === 0 || b.length === 0 || c.length === 0){
    console.log('Invalid input data');
} else if(Number(a) && Number(b) && Number(c)) {
    [a,b,c] = [Number(a),Number(b),Number(c)];
    const D = b * b - 4 * a * c;
    if (D < 0) {
        console.log('No solution');
    } else if (D === 0) {
        console.log("x = '" + -1 * b / (2 * a) + "'");
    } else {
        let x1 = (-1 * b + Math.sqrt(D)) / (2 * a);
        let x2 = (-1 * b - Math.sqrt(D)) / (2 * a);
        console.log("x1 = '" + x1 + "' and x2 = '" + x2 + "'");
    }
} else {
    console.log('Invalid input data');
}