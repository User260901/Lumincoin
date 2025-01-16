import {HttpRequests} from "../../utils/http-requests";

export class CreateCategoryExpense {
    constructor() {
        document.querySelectorAll('.menu-item').forEach(el => {
            el.classList.remove('active');
        })

        document.getElementById('category-menu').classList.add('active')
        document.getElementById('expenses').classList.add('active')

        this.inputElement = document.getElementById('expense-name');
        document.getElementById('create-expense').addEventListener('click', this.createExpense.bind(this));
    }

    createExpense(){
        if(this.inputElement.value && this.inputElement.value.length > 0){
            let result = HttpRequests.request('/categories/expense', "POST", true, {
                title: this.inputElement.value,
            })
            if(!result.error) {
                location.hash = '#/expenses'
            }else {
                alert('невозможно создать доход, пожалуйста, попробуйте позже')
            }
        }else {
            this.inputElement.classList.add('is-invalid')
        }
    }
}