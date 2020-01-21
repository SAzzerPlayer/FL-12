/* Your code goes here */



class Fighter{
    constructor(fighterObj){
        if(typeof fighterObj.name === 'string'){
            this._name = fighterObj.name;
        } else {
            this._name = 'Incognita';
        }
        if(fighterObj.damage > 0) {
            this._damage = fighterObj.damage;
        } else {
            this._damage = 1;
        }
        if(fighterObj.hp > 0) {
            this._hp = fighterObj.hp;
            this._totalHp = fighterObj.hp;
        } else {
            this._hp = 1;
            this._totalHp = 1;
        }
        if(fighterObj.strength > 0) {
            this._strength = fighterObj.strength;
        } else {
            this._strength = 1;
        }
        if(fighterObj.agility > 0){
            this._agility = fighterObj.agility;
        } else {
            this._agility = 1;
        }

        this._wins = 0;
        this._losses = 0;
    }
    getName(){
        return this._name;
    }
    getDamage(){
        return this._damage;
    }
    getStrength(){
        return this._strength;
    }
    getAgility(){
        return this._agility;
    }
    getHealth(){
        return this._hp;
    }
    addWin(){
        this._wins++;
    }
    addLoss(){
        this._losses++;
    }
    dealDamage(points){
        if(this._hp - points <= 0){
            this._hp = 0;
        } else{
            this._hp -= points;
        }
    }
    logCombatHistory(){
        console.log('Name: '+this.getName()+', Wins:'+this._wins+' Losses:'+this._losses);
    }
    heal(points){
        if(this._hp+points >= this._totalHp){
            this._hp = this._totalHp;
        } else {
            this._hp+=points;
        }
    }
    attack(enemyFighter){
        //Find out the percentage of successful beat
        let attackProbability = 100 - (enemyFighter.getStrength() + enemyFighter.getAgility());
        if(attackProbability <= 0){
            console.log(this.getName()+' attack missed');
        } else {
            let attackTry = Math.floor(Math.random() * Math.floor(100));
            if(attackTry < attackProbability){
                enemyFighter.dealDamage(this.getDamage());
                console.log(this.getName()+' makes '+this.getDamage()+' damage to '+enemyFighter.getName());
            } else{
                console.log(this.getName()+' attack missed');
            }
        }
    }
}

function battle(fighter1,fighter2){
    let fighters = [fighter1,fighter2];
    let areAvailable = true;
    //Choose who will be the first to beat
    if(Math.floor(Math.random() * Math.floor(2))===1){
        fighters = [fighter2,fighter1]
    }
    for(let fighter of fighters){
        if(fighter.getHealth() === 0){
            console.log(fighter.getName() + " is dead and can't fight.");
            areAvailable = false;
            break;
        }
    }
    if(areAvailable) {
        while (fighters[0].getHealth() > 0 && fighters[1].getHealth() > 0) {
            fighters[0].attack(fighters[1]);
            if (fighters[1].getHealth() === 0) {
                break;
            }
            fighters[1].attack(fighters[0]);
        }
        if (fighters[0].getHealth() === 0) {
            console.log(fighters[1].getName() + ' has won!');
            fighters[1].addWin();
            fighters[0].addLoss();
        } else {
            console.log(fighters[0].getName() + ' has won!');
            fighters[0].addWin();
            fighters[1].addLoss();
        }
    }
}
