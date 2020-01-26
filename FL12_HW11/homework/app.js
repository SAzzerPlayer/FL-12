const structure = [
    {
      'folder': true,
      'title': 'Films',
      'children': [
        {
          'title': 'Iron Man.avi'
        },
        {
          'folder': true,
          'title': 'Fantasy',
          'children': [
            {
              'title': 'The Lord of the Rings.avi'
            },
            {
              'folder': true,
              'title': 'New folder 1',
              'children': false
            }
          ]
        }
      ]
    },
    {
      'folder': true,
      'title': 'Documents',
      'children': [
        {
          'folder': true,
          'title': 'EPAM Homework answers',
          'children': null
        }
      ]
    }
];

const rootNode = document.getElementById('root');

// Todo: your code goes here
function renderChildren(parentNode = {}, childrens = []){
  for(let node of childrens){
    //define item type
    let elem = document.createElement('div');
    if(node.folder){
      elem.className = 'item folder';
      let elemInfo = document.createElement('div');
      elemInfo.className = 'info';
      elem.appendChild(elemInfo);
      let elemInfoIcon = document.createElement('i');
      elemInfoIcon.className = 'material-icons';
      elemInfoIcon.textContent = 'folder';
      let elemInfoTitle = document.createElement('span');
      elemInfoTitle.textContent = node.title;
      elemInfoTitle.className='title';
      elemInfo.appendChild(elemInfoIcon);
      elemInfo.appendChild(elemInfoTitle);
      //adding handler for opening the folder
      elemInfo.onclick = () => {
        let elemChildrens = elem.childNodes[elem.childNodes.length-1];
        if(elemChildrens.style.display !== 'none'){
          elemChildrens.style.display = 'none';
          elemInfoIcon.textContent = 'folder'
        } else {
          elemChildrens.style.display = 'block';
          elemInfoIcon.textContent = 'perm_media';
        }
      }
    } else{
      elem.className = 'item file';
      let elemInfo = document.createElement('div');
      elemInfo.className = 'info';
      elem.appendChild(elemInfo);
      let elemInfoIcon = document.createElement('i');
      elemInfoIcon.className = 'material-icons';
      elemInfoIcon.textContent = 'description';
      let elemInfoTitle = document.createElement('span');
      elemInfoTitle.textContent = node.title;
      elemInfoTitle.className='title';
      elemInfo.appendChild(elemInfoIcon);
      elemInfo.appendChild(elemInfoTitle);
    }
    //Has item childrens?
    if(node.children && node.folder){
      let elemChildren = document.createElement('div');
      elemChildren.className = 'children';
      elemChildren.style.display = 'none';
      elem.appendChild(elemChildren);
      //recursive
      renderChildren(elemChildren,node.children);
    } else if(node.folder){
      let elemEmptyChildren = document.createElement('div');
      elemEmptyChildren.className = 'empty-children';
      elemEmptyChildren.textContent = 'Folder is empty';
      elemEmptyChildren.style.display = 'none';
      elem.appendChild(elemEmptyChildren);
    }
    parentNode.appendChild(elem);
  }
}

renderChildren(rootNode,structure);