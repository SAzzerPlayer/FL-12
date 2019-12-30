// Your code goes here
if(confirm('Do you want to play a game?')){
    let currentPrize = 0;
    let possiblePrizes = [25,50,100];
    let attempts = 3;
    let limitNumbers = 9;
    let gameNumber = Math.floor(Math.random() * Math.floor(limitNumbers));
    while(attempts > 0){
        let choiceNumber = Number(prompt('Choose a roulette pocket number from 0 to '+(limitNumbers-1)+
            '\nAttempts left: '+attempts+'\nTotal prize: '+currentPrize+'$\nPossible prize on current attempt: '+
            possiblePrizes[attempts-1]+'$',''));
        if(choiceNumber || choiceNumber === 0){
            if(choiceNumber < limitNumbers && choiceNumber === gameNumber){
                currentPrize+=possiblePrizes[attempts-1];
                if(confirm('Congratulation, you won!   Your prize is: '+
                    possiblePrizes[attempts-1]+' $. Do you want to continue?')){
                    limitNumbers+=4;
                    for(let i=0;i<3;i++){
                        possiblePrizes[i]*=2
                    }
                    attempts = 3;
                    gameNumber = Math.floor(Math.random() * Math.floor(limitNumbers));
                    continue;
                } else{
                    attempts = 0;
                    //Так как попыток ноль, встретится нижнее условие и произойдет запрос на повторное участие
                }
            }else if(choiceNumber < limitNumbers && choiceNumber !== gameNumber){
                attempts-=1;
            } else{
                alert('You entered wrong data. Game has been stopped.');
                break;
            }
        } else{
            alert('You entered wrong data. Game has been stopped.');
            break;
        }
        if(attempts === 0){
            alert('Thank you for your participation. Your prize is: '+currentPrize+' $');
            if(confirm('Do you want to play again?')){
                [attempts,possiblePrizes,limitNumbers,currentPrize] = [3,[25,50,100],9,0];
                gameNumber = Math.floor(Math.random() * Math.floor(limitNumbers));
            }
        }
    }
}else{
    alert('You did not become a billionaire, but can.')
}