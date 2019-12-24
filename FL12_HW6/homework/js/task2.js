// Your code goes here
let a = prompt('Param a:','');
let b = prompt('Param b:','');
let c = prompt('Param c:','');
if(a === undefined || a === null|| b === undefined || b === null || c === undefined || c === null){
    alert('input values should be ONLY numbers ');
} else if(a.length === 0 || b.length === 0 || c.length === 0){
    alert('input values should be ONLY numbers');
} else if(a <= 0 || b <= 0 || c <= 0){
    alert('A triangle must have 3 sides with a positive definite');
} else if(Number(a) && Number(b) && Number(c)){
    [a,b,c] = [Number(a),Number(b),Number(c)];
    if(a+b <= c || b+c <= a || a+c <= b){
        alert('Triangle doesn’t exist');
    } else if(a === b && a === c){
        console.log('Equilateral triangle');
    } else if(a === b && a !== c || a === c && a !== b || b === c && b !== a ){
        console.log('Isosceles triangle');
    } else{
        console.log('Scalene triangle');
    }
} else {
    alert('input values should be ONLY numbers');
}
