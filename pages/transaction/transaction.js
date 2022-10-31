const form = {
    date: () => document.getElementById('date'),
    dateRequiredError: () => document.getElementById('date-required-error'),    
    value: () => document.getElementById('value'),
    valueRequiredError: () => document.getElementById('value-required-error'),    
    valueLessOrEqualToZeroError: () => document.getElementById('value-less-or-equal-to-zero-error'),    
    transactionType: () => document.getElementById('transaction-type'),
    transactionTypeRequiredError: () => document.getElementById('transaction-type-required-error'),
    saveButton: () => document.getElementById('save-button'),
    typeExpense: () => document.getElementById('expense'),
    currency: () => document.getElementById('currency'),
    description: () => document.getElementById('description'),
}

function onChangeDate() {
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? "block" : "none";

    toggleSaveButtonDisable()
    
}

function onChangeValue(){
const value = form.value().value;
form.valueRequiredError().style.display = !value ? 'block' : 'none';

form.valueLessOrEqualToZeroError().style.display = value <= 0 ? 'block' : 'none';

toggleSaveButtonDisable()
}

function onChangeTransactionType(){
const transactionType = form.transactionType().value;

form.transactionTypeRequiredError().style.display = !transactionType ? 'block' : 'none'

toggleSaveButtonDisable()
}

function toggleSaveButtonDisable(){
    form.saveButton().disabled = !isFormValid();

}

function isFormValid() {
    const date = form.date().value;
    if (!date) {
        return false;
    }

    const value = form.value().value;
    if (!value || value <= 0) {
        return false;
    }

    const transactionType = form.transactionType().value;
    if (!transactionType) {
        return false;
    }

    return true;
}


function saveTransaction() {
    showLoading();

    const transaction = createTransaction();

    firebase.firestore()
        .collection('transactions')
        .add(transaction)
        .then(() => {
            hideLoading();
            window.location.href = "../home/home.html";
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao salvar transaçao');
        })
}

function createTransaction() {
    return {
        type: form.typeExpense().checked ? "expense" : "income",
        date: form.date().value,
        money: {
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transactionType: form.transactionType().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    };
}



