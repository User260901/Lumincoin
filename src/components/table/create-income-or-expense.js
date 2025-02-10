import {HttpRequests} from "../../utils/http-requests";

export class CreateIncomeOrExpense {
    constructor() {
        document.querySelectorAll('.menu-item').forEach(el => {
            el.classList.remove('active');
        })

        document.getElementById('table-list').classList.add('active')



        const queryString = (document.location.hash).split("?")[1];
        if(queryString) {
            this.params = new URLSearchParams(queryString);
            this.categoryType = this.params.get("type");
        }
        if(!this.categoryType){
            location.hash = '#/table'
        }

        this.findElements()


        this.selectTypeElement.addEventListener('change', this.handleChangingCategory.bind(this));
        this.getCategories().then()

    }

    findElements(){
        this.selectTypeElement = document.getElementById("type");
        this.categoryInputElement = document.getElementById("category");
        this.amountInputElement = document.getElementById("amount");
        this.dateInputElement = document.getElementById("date");
        this.commentInputElement = document.getElementById("comment");
        this.createButton = document.getElementById('create')
    }

    async handleChangingCategory(e) {
        this.params.set('type', e.target.value);
        const updatedQueryString = this.params.toString();
        location.hash = `#/create-income-or-expenses?${updatedQueryString}`;
        this.getCategories().then()
    }

    async getCategories(){
        if(type){
            let result = await HttpRequests.request('/categories/' + this.categoryType);
            if (!result.error) {
                this.createCategory(result.response)
            }else {
                alert('Извините, что-то пошло не так. Попробуйте снова!')
            }
        }
    }

    createCategory(data){
        if(data){
            this.selectTypeElement.value = this.categoryType
            for (let i = 0; i < data.length; i++) {
                let optionElement = document.createElement("option");
                optionElement.innerText = data[i].title;
                optionElement.value = data[i].id
                this.categoryInputElement.appendChild(optionElement);
            }


            this.createButton.addEventListener('click', async ()=>{
                if(this.categoryCreateValidation()){
                    const operationData = {
                        type: this.selectTypeElement.value,
                        amount: parseInt(this.amountInputElement.value),
                        date: this.dateInputElement.value,
                        category_id: parseInt(this.categoryInputElement.value)
                    }

                    if(this.commentInputElement.value && this.commentInputElement.value.length > 0){
                        operationData.comment = this.commentInputElement.value;
                    }else {
                        operationData.comment = " "
                    }

                    let result = await HttpRequests.request('/operations', 'POST', true, operationData);
                    if (!result.error) {
                        location.hash = '#/table'
                    }else {
                        alert('Извините, что-то пошло не так. Попробуйте снова!')
                    }
                }
            })
        }
    }

    categoryCreateValidation(){
        let isValid = true
        if (this.amountInputElement.value) {
            this.amountInputElement.classList.remove('is-invalid')
            isValid = true
        } else {
            this.amountInputElement.classList.add('is-invalid')
            isValid = false
        }

        if (this.dateInputElement.value) {
            this.dateInputElement.classList.remove('is-invalid')
            isValid = true
        } else {
            this.dateInputElement.classList.add('is-invalid')
            isValid = false

        }

        return isValid
    }
}