// Your code goes here
function identifyTriangleType(){
    let a = document.getElementById('a-param').value;
    let b = document.getElementById('b-param').value;
    let c = document.getElementById('c-param').value;
    if(a === undefined || a === null|| b === undefined || b === null || c === undefined || c === null){
        alert('input values should be ONLY numbers ');
        return 1;
    } else if(a.length === 0 || b.length === 0 || c.length === 0){
        alert('input values should be ONLY numbers');
        return 1;
    } else if(a <= 0 || b <= 0 || c <= 0){
        alert('A triangle must have 3 sides with a positive definite');
        return 1;
    }
    [a,b,c] = [Number(a),Number(b),Number(c)];
    if(a+b <= c || b+c <= a || a+c <= b){
        alert('Triangle doesn’t exist');
        return 1;
    } else if(a === b && a === c){
        console.log('Equilateral triangle');
        return 0;
    } else if(a === b && a !== c || a === c && a !== b || b === c && b !== a ){
        console.log('Isosceles triangle');
        return 0;
    } else{
        console.log('Scalene triangle');
        return 0;
    }
}
