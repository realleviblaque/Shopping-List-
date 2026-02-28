let lists = JSON.parse(localStorage.getItem('list')) || [];

addList();

function addList() {
    const container = document.querySelector('.body-container');
    container.innerHTML = "";
    lists.forEach((list) => {
        container.innerHTML = `
         <div class="list-container">
           <p class="item-name">${list.items}</p>
           <div class="price-action">
             <p class="price">$${list.price}</p>
             <button class="edit-btn" data-id="${list.id}">Delete</button>
           </div>
         </div>    
        ` + container.innerHTML;                                                   
    })
}

document.querySelector('.body-container').addEventListener('click', (e) => {

  if (e.target.classList.contains('edit-btn')) {

    const id = Number(e.target.dataset.id);

    // Remove item from array
    lists = lists.filter(list => list.id !== id);

    // Save updated list
    saveList();

    // Re-render list
    addList();
  }

});

let id = 0;

const addBtn = document.querySelector('.btn');
addBtn.addEventListener('click', () => {
    const inputText = document.querySelector('.item-input').value.trim();
    const priceInput = Number(document.querySelector('.amount-input').value);
    if (inputText && priceInput) {
        lists.push({
            id: id,
            items: inputText,
            price: priceInput
        });
    } else {
        return;
    }
    id++;
    addList();
    document.querySelector('.item-input').value = '';
    document.querySelector('.amount-input').value = '';
    saveList();
})
                     
function saveList() {
    localStorage.setItem('list', JSON.stringify(lists))
};