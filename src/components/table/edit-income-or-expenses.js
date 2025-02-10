import params from "admin-lte/plugins/pdfmake/pdfmake";
import {HttpRequests} from "../../utils/http-requests";

export class EditIncomeOrExpenses {
    constructor() {
        document.querySelectorAll('.menu-item').forEach(el => {
            el.classList.remove('active');
        })

        document.getElementById('table-list').classList.add('active')

        const queryString = (document.location.hash).split("?")[1];
        if (queryString) {
            this.params = new URLSearchParams(queryString);
            this.categoryType = this.params.get("type")
            this.category = this.params.get("category");
            this.categoryAmount = this.params.get("amount");
            this.categoryDate = this.params.get("date");
            this.categoryId = this.params.get('id')
            this.categoryComment = this.params.get("comment");
        }
        if (!this.categoryType || this.category === 'undefined' || !this.categoryAmount || !this.categoryDate) {
            location.hash = '#/table'
            return;
        }


        this.findElements()
        this.fillInputs()
        this.getCategories().then()

    }

    findElements(){
        this.selectTypeElement = document.getElementById("type");
        this.categoryInputElement = document.getElementById("category");
        this.amountInputElement = document.getElementById("amount");
        this.dateInputElement = document.getElementById("date");
        this.commentInputElement = document.getElementById("comment");
        this.saveButtonElement = document.getElementById('save')
    }

    async getCategories() {
        let result = await HttpRequests.request('/categories/' + this.categoryType);
        if (!result.error) {
            this.createCategory(result.response)
        } else {
            alert('Извините, что-то пошло не так. Попробуйте снова!')
        }
    }

    fillInputs() {
        const options = this.categoryInputElement.options
        for (let i = 0; i < options.length; i++) {
            let option = options[i].value.split('-')[0]
            if(option === this.category) {
                this.categoryInputElement.value = options[i].value
                this.categoryInputElement.setAttribute('disabled', 'disabled')
                return
            }
        }

        this.amountInputElement.value = this.categoryAmount
        this.dateInputElement.value = this.categoryDate
        if (this.categoryComment) {
            this.commentInputElement.value = this.categoryComment
        }
    }

    createCategory(data) {
        if (data) {
            this.selectTypeElement.value = this.categoryType
            this.selectTypeElement.setAttribute('disabled', 'disabled')
            for (let i = 0; i < data.length; i++) {
                let optionElement = document.createElement("option");
                optionElement.value = data[i].title + "-" + data[i].id;
                optionElement.innerText = data[i].title
                this.categoryInputElement.appendChild(optionElement);
            }

            this.fillInputs()

            this.saveButtonElement.addEventListener('click', async () => {
                const id = this.categoryInputElement.value.split('-')[1]
                if (this.categoryCreateValidation()) {
                    const operationData = {
                        type : this.categoryType,
                        amount: parseInt(this.amountInputElement.value),
                        date: this.dateInputElement.value,
                        category_id: parseInt(id),
                        comment: this.commentInputElement.value
                    }

                    let result = await HttpRequests.request('/operations/' + this.categoryId, 'PUT', true, operationData);
                    if (!result.error) {
                        location.hash = '#/table'
                    } else {
                        alert('Извините, что-то пошло не так. Попробуйте снова!')
                    }
                }
            })
        }
    }

    categoryCreateValidation() {
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

        if (this.commentInputElement.value) {
            this.commentInputElement.classList.remove('is-invalid')
            isValid = true
        } else {
            this.commentInputElement.classList.add('is-invalid')
            isValid = false
        }

        return isValid
    }

}


