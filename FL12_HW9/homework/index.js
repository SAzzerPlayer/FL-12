// Your code goes here
function convert(){
    let arr = [];
    for( let x of arguments){
        if(typeof x === 'string'){
            try{
                arr.push(parseInt(x));
            } catch(err){
                console.log(err);
                break;
            }
        } else if(typeof x === 'number'){
            let temp = '' + x;
            arr.push(temp);
        } else{
            console.log('Array can consist only numbers!');
            break;
        }
    }
    return arr;
}

function executeForEach(elems,func){
    let arr = [];
    for(let i = 0; i < elems.length;i++){
        arr[i] = func(elems[i]);
    }
    return arr;
}

function mapArray(elems,func){
    let arr = [];
    for(let x of elems){
        if(typeof x === 'string'){
            arr.push(parseInt(x));
        } else if(typeof x === 'number'){
            arr.push(x);
        }
    }
    for(let i = 0; i < arr.length; i++){
        arr[i] = func(arr[i]);
    }
    return arr;
}

function filterArray(elems, func){
    let arr = [];
    for(let x of elems){
        if(func(x)){
            arr.push(x);
        }
    }
    return arr;
}

function flipOver(str){
    let reverseStr = '';
    for(let x = str.length-1;x>=0;x--){
        reverseStr+=str[x];
    }
    return reverseStr;
}

function makeListFromRange(range=[0,0]){
    let arr = [];
    for(let i = range[0];i<=range[1];i++){
        arr.push(i);
    }
    return arr;
}

function getArrayOfKeys(objects,key){
    return executeForEach(objects,(obj) => obj[key]);
}

function substitute(elems){
    return mapArray(elems, (number) => {
        if(number < 30){
            return '*';
        } else {
            return number;
        }
    })
}

function getPastDate(date, daysAgo){
    const dayMilliseconds = 24*60*60*1000;
    let pastDate = new Date(date - daysAgo*dayMilliseconds);
    return pastDate.getDate();
}

function formatDate(date = new Date()){
    return '' + date.getFullYear() + '/' + (date.getMonth()+1)
        +'/'+date.getDate()+' '+date.getHours()+':'+date.getMinutes();
}