import {HttpRequests} from "../../utils/http-requests";

export class CreateCategoryIncome {
    constructor() {
        document.querySelectorAll('.menu-item').forEach(el => {
            el.classList.remove('active');
        })

        document.getElementById('category-menu').classList.add('active')
        document.getElementById('income').classList.add('active')


       this.inputElement = document.getElementById('income-name');
       document.getElementById('create-income').addEventListener('click', this.createIncome.bind(this));
    }

    createIncome(){
        if(this.inputElement.value && this.inputElement.value.length > 0){
            let result = HttpRequests.request('/categories/income', "POST", true, {
                title: this.inputElement.value,
            })
            if(!result.error) {
                location.hash = '#/income'
            }else {
                alert('невозможно создать доход, пожалуйста, попробуйте позже')
            }
        }else {
            this.inputElement.classList.add('is-invalid')
        }
    }
}