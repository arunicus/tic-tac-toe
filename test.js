// let expect = require('expect')

function counter(current = 0, action) {
    console.log(action);
    switch (action.type) {
        case 'INC':
            return current + (action.value || 1);
        case 'DEC':
            return current - (action.value || 1);
    }
    return current;
}


const {createStore} = Redux;
const store = createStore(counter)

store.subscribe(() => {
    console.log(store.getState());
    document.querySelector('#current').innerHTML = store.getState();
})

function incrementClicked() {
    let value = parseInt(document.querySelector('#countValue').value);
    store.dispatch({type: 'INC', value});    
}

function decrementClicked(params) {
        let value = parseInt(document.querySelector('#countValue').value);
    store.dispatch({type: 'DEC',value});
}