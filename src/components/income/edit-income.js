import {HttpRequests} from "../../utils/http-requests";

export class EditIncome {
    constructor() {
        document.querySelectorAll('.menu-item').forEach(el => {
            el.classList.remove('active');
        })

        document.getElementById('category-menu').classList.add('active')
        document.getElementById('income').classList.add('active')


        const queryString = (document.location.hash).split("?")[1];
        if(queryString) {
            const params = new URLSearchParams(queryString);
            this.incomeElementId = params.get("id");
            this.incomeElementTitle = params.get("title");
        }

        this.inputIncomeElement = document.getElementById("edit-income");
        if(this.incomeElementTitle){
            this.inputIncomeElement.value = this.incomeElementTitle;
        }

        this.buttonSaveElement = document.getElementById('income-save');
        this.buttonSaveElement.addEventListener("click", this.editIncome.bind(this))
    }

    async editIncome() {
        if(this.inputIncomeElement.value && this.inputIncomeElement.value.length > 0) {
            if (this.incomeElementId) {
                let result = await HttpRequests.request('/categories/income/' + this.incomeElementId, "PUT", true, {
                    title: this.inputIncomeElement.value,
                })
                if (result.error) {
                    console.error("Failed to edit the element")
                    return
                }
                location.hash = '#/income'
            }
        }else {
            this.inputIncomeElement.classList.add('is-invalid')
        }


    }


}
