document.addEventListener("DOMContentLoaded", function() {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const clearButton = document.getElementById('clearButton');
    const shoppingList = document.getElementById('shoppingList');
    const purchased= document.getElementById("purchased")

    let items = JSON.parse(localStorage.getItem('shoppingListItems')) || [];

    function saveItems() {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
    }

    function renderList() {
        shoppingList.innerHTML = '';
        items.map((item, index) => {
            let listItem = document.createElement('li');
            listItem.textContent = item.text;
            if (item.purchased) {
                listItem.classList.add('purchased');
            }
            listItem.addEventListener('click', () => {
                item.purchased = !item.purchased;
                saveItems();
                renderList();
            });
            listItem.addEventListener('dblclick', () => {
                const newText = prompt('Edit item:', item.text);
                if (newText) {
                    item.text = newText;
                    saveItems();
                    renderList();
                }
            });
            shoppingList.appendChild(listItem);
        });
    }

    addButton.addEventListener('click', () => {
        const newItem = itemInput.value.trim();
        if (newItem) {
            items.push({ text: newItem, purchased: false });
            itemInput.value = '';
            saveItems();
            renderList();
        }
    });

    clearButton.addEventListener('click', () => {
        items = [];
        saveItems();
        renderList();
    });

    renderList();
});
