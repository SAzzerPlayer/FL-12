//global variables
const dOCcE = (tag) => document.createElement(tag);
const zeroValue = 0;
let cardsArray = [];
const storageCards = localStorage.getItem('cards');
if(storageCards===null){
    localStorage.setItem('cards',JSON.stringify({'cards':[]}));
} else{
    cardsArray = JSON.parse(storageCards)['cards'];
}
let currentHashPage = '#';
//classes
function onDeleteCard(id){
    for(let elem of cardsArray){
        console.log(elem,id);
        if(elem.id === id){
            cardsArray.splice(cardsArray.indexOf(elem),1);
            break;
        }
    }
    localStorage.removeItem('cards');
    localStorage.setItem('cards',JSON.stringify({cards:cardsArray}));
    cardListPage.refresh();
}
function onEditCard(id){
    let result = 0;
    return result;
}
function onReadCard(id){
    for(let elem of cardsArray){
        console.log(elem,id);
        if(elem.id === id){
            elem.isRead = true;
            cardsArray.splice(cardsArray.indexOf(elem),1);
            cardsArray.push(elem);
        }
    }
    localStorage.removeItem('cards');
    localStorage.setItem('cards',JSON.stringify({cards:cardsArray}));
    cardListPage.refresh();
}
class Card{
    constructor(
        obj = {},
        onClickEdit,
        onClickDelete,
        onClickRead
        ){
        this.id = obj.id;
        this.isRead = obj.isRead;
        this.title = obj.title;
        this.terms = obj.terms; //[{term,definition},...]
        this.onClickDelete = onClickDelete;
        this.onClickEdit = onClickEdit;
        this.onClickRead = onClickRead;
    }
    renderTerms(){
        let nodeMain = document.createElement('div');
        nodeMain.className = 'card-inner';
        for(let termElem of this.terms){
            //term body
            let nodeTermBlock = document.createElement('div');
            nodeTermBlock.className = 'term-block';
            //term title
            let nodeTermTitle = document.createElement('span');
            nodeTermTitle.className = 'term-desc';
            nodeTermTitle.textContent = termElem.term;
            //term definition
            let nodeTermDefinition = document.createElement('span');
            nodeTermDefinition.className = 'term-definition';
            nodeTermDefinition.textContent = termElem.definition;
            //append childs
            nodeTermBlock.appendChild(nodeTermTitle);
            nodeTermBlock.appendChild(nodeTermDefinition);
            nodeMain.appendChild(nodeTermBlock);
        }
        return nodeMain;
    }
    render(){
        //main div
        let nodeCardSet = document.createElement('div');
        nodeCardSet.className = 'card-set';
        //header div
        let nodeHeader = document.createElement('div');
        nodeHeader.appendChild(document.createElement('div'));
        nodeHeader.className = 'card-header';
        //title span
        let nodeHeaderTitle = document.createElement('span');
        nodeHeaderTitle.className = 'card-title';
        nodeHeaderTitle.textContent = this.title;
        if(this.isRead){
            nodeHeaderTitle.textContent += ' was learned';
        }
        // header buttons div
        let nodeHeaderButtons = document.createElement('div');
        nodeHeaderButtons.className = 'card-buttons';
        //header edit
        let nodeHeaderEdit = document.createElement('a');
        nodeHeaderEdit.className = 'card-edit';
        nodeHeaderEdit.onclick = this.onClickEdit;
        nodeHeaderEdit.href = '#edit/'+this.id;
        nodeHeaderEdit.textContent = 'Edit';
        nodeHeaderButtons.appendChild(nodeHeaderEdit);
        //header read
        let nodeHeaderRead = document.createElement('button');
        nodeHeaderRead.className = 'card-edit';
        nodeHeaderRead.onclick = () => {
this.onClickRead(this.id) 
};
        nodeHeaderRead.textContent = 'Read';
        nodeHeaderButtons.appendChild(nodeHeaderRead);
        //header delete
        let nodeHeaderDelete = document.createElement('button');
        nodeHeaderDelete.className = 'card-edit';
        nodeHeaderDelete.onclick = () => {
 this.onClickDelete(this.id) 
};
        nodeHeaderDelete.textContent = 'Delete';
        nodeHeaderButtons.appendChild(nodeHeaderDelete);
        //header childs
        nodeHeader.appendChild(nodeHeaderTitle);
        nodeHeader.appendChild(nodeHeaderButtons);
        nodeCardSet.appendChild(nodeHeader);
        //card terms main
        nodeCardSet.appendChild(this.renderTerms());
        return nodeCardSet;
    }
}
class CardListPage{
    constructor(){
        this.root = null;
    }
    refresh(){
        console.log(cardsArray);
        let mainNode = document.querySelector('#list main');
        for(let child of mainNode.childNodes){
            child.style.display = 'none';
        }
        for(let child of mainNode.childNodes){
            child.remove();
        }

        for(let i = 0; i < cardsArray.length;i++){
            if(!cardsArray[i].isRead) {
                let card = new Card(cardsArray[i],onEditCard,onDeleteCard,onReadCard);
                mainNode.appendChild(card.render());
            }
        }
        for(let i = 0; i < cardsArray.length; i++){
            if(cardsArray[i].isRead){
                let card = new Card(cardsArray[i],onEditCard,onDeleteCard,onReadCard);
                mainNode.appendChild(card.render());
            }
        }
    }
    render(){
        this.root = dOCcE('div');
        this.root.id = 'list';
        // header bar menu
        let nodeListHeader = dOCcE('header');
        //empty div
        nodeListHeader.appendChild(dOCcE('div'));
        this.root.appendChild(nodeListHeader);
        //inner elems of header
        let nodeHeaderTitle = dOCcE('span');
        nodeHeaderTitle.className = 'title';
        nodeHeaderTitle.textContent = 'List of cards';
        nodeListHeader.appendChild(nodeHeaderTitle);
        //
        let nodeHeaderNewCard = dOCcE('a');
        nodeHeaderNewCard.href = '#add';
        nodeHeaderNewCard.className = 'mybutton';
        nodeHeaderNewCard.textContent = 'Add new card';
        nodeListHeader.appendChild(nodeHeaderNewCard);
        //render cards
        let nodeMainCards = dOCcE('main');
        for(let i = 0; i < cardsArray.length;i++){
            if(!cardsArray[i].isRead) {
                let card = new Card(cardsArray[i],onEditCard,onDeleteCard,onReadCard);
                nodeMainCards.appendChild(card.render());
            }
        }
        for(let i = 0; i < cardsArray.length; i++){
            if(cardsArray[i].isRead){
                let card = new Card(cardsArray[i],onEditCard,onDeleteCard,onReadCard);
                nodeMainCards.appendChild(card.render());
            }
        }
        /* push from localStorage*/
        this.root.appendChild(nodeMainCards);
        return this.root;
    }
}
class AddCardPage{
    constructor(){
        this.root = null;
    }
    checkValid(){
        let FieldName = document.getElementsByClassName('input-name')[zeroValue];
        if(FieldName.value.length === zeroValue){
            alert('Please, fill the name field');
            return false;
        }
        let card = {id:0,title:FieldName.value,terms:[],isRead:false};
        let maxId = 0;
        for(let elem of cardsArray){
            if(elem.id >= maxId){
                maxId = elem.id;
            }
        }
        card.id = maxId + 1;

        let inputTermsArray = document.getElementsByClassName('input-term');
        let inputDefsArray = document.getElementsByClassName('input-def');
        for(let i = 0; i<inputTermsArray.length;i++){
            let term = inputTermsArray[i].value;
            let def = inputDefsArray[i].value;
            if(term.length > zeroValue){
                if(def.length > zeroValue){
                    card.terms.push({term:term,definition: def});
                }
            }
        }
        cardsArray.push(card);
        localStorage.removeItem('cards');
        localStorage.setItem('cards',JSON.stringify({cards:cardsArray}));
        return true;
    }
    addTerm(node){
        node.appendChild(this.renderTerm());
    }
    refresh(){
        let FieldName = document.getElementsByClassName('input-name')[zeroValue];
        FieldName.value = '';
        let listTerms = document.getElementById('term-list');
        for(let elem of listTerms.childNodes){
            elem.style.display = 'none';
        }
        for(let elem of listTerms.childNodes){
            elem.remove();
        }
    }
    renderTerm(){
        let nodeTermBody = dOCcE('div');
        nodeTermBody.className='term';
        //label term text
        let nodeLabelTerm = dOCcE('label');
        nodeLabelTerm.textContent = 'Term:';
        let nodeLabelTermText = dOCcE('input');
        nodeLabelTermText.type = 'text';
        nodeLabelTermText.className = 'input-term';
        nodeLabelTerm.appendChild(nodeLabelTermText);
        //label definition text
        let nodeLabelDefinition = dOCcE('label');
        nodeLabelDefinition.textContent = 'Definition:';
        let nodeLabelDefinitionText = dOCcE('input');
        nodeLabelDefinitionText.type = 'text';
        nodeLabelDefinitionText.className='input-def';
        nodeLabelDefinition.appendChild(nodeLabelDefinitionText);
        //button delete
        let nodeButtonDelete = dOCcE('button');
        nodeButtonDelete.textContent = 'X';
        nodeButtonDelete.onclick = () => {
            nodeTermBody.style.display = 'none';
            nodeLabelTermText.value = '';
            nodeTermBody.remove();
        };
        //adding childs
        nodeTermBody.appendChild(nodeLabelTerm);
        nodeTermBody.appendChild(nodeLabelDefinition);
        nodeTermBody.appendChild(nodeButtonDelete);
        return nodeTermBody;
    }
    renderMainList(){
        let nodeMain = dOCcE('main');
        // node label
        let nodeLabelName = dOCcE('label');
        nodeLabelName.textContent = 'Name:';
        //node label input
        let nodeLabelInputName = dOCcE('input');
        nodeLabelInputName.type = 'text';
        nodeLabelInputName.className= 'input-name';
        nodeLabelName.appendChild(nodeLabelInputName);
        nodeMain.append(nodeLabelName);
        //node title list terms
        let nodeTitleList = dOCcE('div');
        nodeTitleList.id = 'term-title';
        nodeTitleList.append(dOCcE('div'));
        // node Title
        let nodeTitleListText = dOCcE('span');
        nodeTitleListText.className='title';
        nodeTitleListText.textContent = 'List of terms';
        nodeTitleList.append(nodeTitleListText);
        //node list of terms
        let nodeListTerms = dOCcE('div');
        nodeListTerms.id = 'term-list';
        // node title button add term
        let nodeButtonAddTerm = dOCcE('button');
        nodeButtonAddTerm.className = 'card-edit';
        nodeButtonAddTerm.textContent = 'New';
        nodeButtonAddTerm.onclick = () => {
            this.addTerm(nodeListTerms);
        };
        nodeTitleList.appendChild(nodeButtonAddTerm);
        nodeMain.append(nodeTitleList);

        nodeMain.appendChild(nodeListTerms);
        return nodeMain;
    }
    render(){
        //root
        this.root = dOCcE('div');
        this.root.id='add';
        //nodeHeader
        let nodeHeader = dOCcE('header');
        this.root.appendChild(nodeHeader);
        //button save
        let nodeButtonAdd = dOCcE('button');
        nodeButtonAdd.className = 'card-edit';
        nodeButtonAdd.textContent = 'Add';
        nodeButtonAdd.onclick = () => {
            if(this.checkValid()) {
                location.hash = '#';
            }
        };
        nodeHeader.appendChild(nodeButtonAdd);
        //title
        let nodeHeaderTitle = dOCcE('span');
        nodeHeaderTitle.className = 'title';
        nodeHeaderTitle.textContent = 'Create new card';
        nodeHeader.appendChild(nodeHeaderTitle);
        //button cancel
        let nodeButtonCancel = dOCcE('button');
        nodeButtonCancel.className = 'card-edit';
        nodeButtonCancel.textContent = 'Cancel';
        nodeButtonCancel.onclick = () => {
            location.hash = '#';
        };
        nodeHeader.appendChild(nodeButtonCancel);
        // add main
        this.root.appendChild(this.renderMainList());
        return this.root;
    }
}
class EditCardPage{
    constructor(){
        this.root = null;
        this.idCard = null;
    }
    checkValid(){
        let FieldName = document.getElementById('input-name');
        let emptyLength = 0;
        if(FieldName.value.length === emptyLength){
            alert('Please, fill the name field');
            return false;
        }
        let card = cardsArray.find((elem) => {
 if(elem.id === this.idCard) {
 return true;
} else {
 return false; 
}
});
        card.title = FieldName.value;
        card.terms = [];
        let inputTermsArray = document.getElementsByClassName('input-term-edit');
        let inputDefsArray = document.getElementsByClassName('input-def-edit');
        for(let i = 0; i<inputTermsArray.length;i++){
            let term = inputTermsArray[i].value;
            let def = inputDefsArray[i].value;
            let emptyLength = 0;
            if(term.length > emptyLength){
                if(def.length > emptyLength){
                    if(inputDefsArray[i].style.display !== 'none') {
 card.terms.push({term:term,definition: def}); 
}
                }
            }
        }
        localStorage.removeItem('cards');
        localStorage.setItem('cards',JSON.stringify({cards:cardsArray}));
        return true;
    }
    refresh(id){
        id = Number(id);
        this.idCard = id;
        let card = cardsArray.find((elem) => {
 if(elem.id === id) {
return true; 
} else {
 return false; 
}
});
        let nodeTitleValue = document.getElementById('input-name');
        nodeTitleValue.value = JSON.parse(JSON.stringify(card)).title;
        let nodeTermsList = document.getElementById('term-list-editable');
        for(let child of nodeTermsList.childNodes){
            child.style.display = 'none';
        }
        for(let child of nodeTermsList.childNodes){
            child.remove();
        }
        for(let term of card.terms){
            nodeTermsList.appendChild(this.renderTerm(term.term,term.definition));
        }
    }
    renderTerm(term,definition){
        let nodeTermBody = dOCcE('div');
        nodeTermBody.className='term';
        //label term text
        let nodeLabelTerm = dOCcE('label');
        nodeLabelTerm.textContent = 'Term:';
        let nodeLabelTermText = dOCcE('input');
        nodeLabelTermText.type = 'text';
        nodeLabelTermText.className = 'input-term-edit';
        nodeLabelTermText.value = term;
        nodeLabelTerm.appendChild(nodeLabelTermText);
        //label definition text
        let nodeLabelDefinition = dOCcE('label');
        nodeLabelDefinition.textContent = 'Definition:';
        let nodeLabelDefinitionText = dOCcE('input');
        nodeLabelDefinitionText.type = 'text';
        nodeLabelDefinitionText.className='input-def-edit';
        nodeLabelDefinitionText.value = definition;
        nodeLabelDefinition.appendChild(nodeLabelDefinitionText);
        //button delete
        let nodeButtonDelete = dOCcE('button');
        nodeButtonDelete.textContent = 'X';
        nodeButtonDelete.onclick = () => {
            nodeTermBody.style.display = 'none';
            nodeLabelDefinitionText.value = '';
            nodeTermBody.remove();
        };
        //adding childs
        nodeTermBody.appendChild(nodeLabelTerm);
        nodeTermBody.appendChild(nodeLabelDefinition);
        nodeTermBody.appendChild(nodeButtonDelete);
        return nodeTermBody;
    }
    renderMainList(){
        let nodeMain = dOCcE('main');
        // node label
        let nodeLabelName = dOCcE('label');
        nodeLabelName.textContent = 'Name:';
        //node label input
        let nodeLabelInputName = dOCcE('input');
        nodeLabelInputName.type = 'text';
        nodeLabelInputName.id= 'input-name';
        nodeLabelName.appendChild(nodeLabelInputName);
        nodeMain.append(nodeLabelName);
        //node title list terms
        let nodeTitleList = dOCcE('div');
        nodeTitleList.id = 'term-title';
        nodeTitleList.append(dOCcE('div'));
        // node Title
        let nodeTitleListText = dOCcE('span');
        nodeTitleListText.className='title';
        nodeTitleListText.textContent = 'List of terms';
        nodeTitleList.append(nodeTitleListText);
        // node title button add term
        let nodeButtonAddTerm = dOCcE('button');
        nodeButtonAddTerm.className = 'card-edit';
        let nodeListTerms = dOCcE('div');
        nodeListTerms.id = 'term-list-editable';
        //
        nodeButtonAddTerm.textContent = 'New';
        nodeButtonAddTerm.onclick = () => {
            nodeListTerms.appendChild(this.renderTerm('',''));
        };
        nodeTitleList.appendChild(nodeButtonAddTerm);
        nodeMain.append(nodeTitleList);
        //node list of terms
        nodeMain.appendChild(nodeListTerms);
        return nodeMain;
    }
    render(){
        //root
        this.root = dOCcE('div');
        this.root.id='edit';
        //nodeHeader
        let nodeHeader = dOCcE('header');
        this.root.appendChild(nodeHeader);
        //button save
        let nodeButtonAdd = dOCcE('button');
        nodeButtonAdd.className = 'card-edit';
        nodeButtonAdd.textContent = 'Add';
        nodeButtonAdd.onclick = () => {
            if(this.checkValid()){
                location.hash = '#';
            }
        };
        nodeHeader.appendChild(nodeButtonAdd);
        //title
        let nodeHeaderTitle = dOCcE('span');
        nodeHeaderTitle.className = 'title';
        nodeHeaderTitle.textContent = 'Edit the card';
        nodeHeader.appendChild(nodeHeaderTitle);
        //button cancel
        let nodeButtonCancel = dOCcE('button');
        nodeButtonCancel.className = 'card-edit';
        nodeButtonCancel.textContent = 'Cancel';
        nodeButtonCancel.onclick = () => {
            location.hash = '#';
        };
        nodeHeader.appendChild(nodeButtonCancel);
        // add main
        this.root.appendChild(this.renderMainList());
        return this.root;
    }
}
//global pages

const cardListPage = new CardListPage();

const addPage = new AddCardPage();

const editPage = new EditCardPage();
//global functions
function onHashChange(event){
    const hashPage = location.hash;
    if(hashPage === '#add'){
        addPage.refresh();
        cardListPage.root.style.display = 'none';
        editPage.root.style.display = 'none';
        addPage.root.style.display = 'block';
    } else if(hashPage.includes('#edit')){
        editPage.refresh(hashPage.split('/')[1]);
        cardListPage.root.style.display = 'none';
        editPage.root.style.display = 'block';
        addPage.root.style.display = 'none';
    } else if(hashPage === ''){
        cardListPage.refresh();
        cardListPage.root.style.display = 'block';
        editPage.root.style.display = 'none';
        addPage.root.style.display = 'none';
    }
    currentHashPage = hashPage;
    console.log(hashPage);
}
//script
document.getElementById('root').appendChild(cardListPage.render());
document.getElementById('root').appendChild(addPage.render());
addPage.root.style.display = 'none';
document.getElementById('root').appendChild(editPage.render());
editPage.root.style.display = 'none';
window.addEventListener('hashchange', onHashChange);



// Your code goes here

