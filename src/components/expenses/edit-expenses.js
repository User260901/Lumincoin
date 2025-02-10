import {HttpRequests} from "../../utils/http-requests";

export class EditExpenses {
    constructor() {
        document.querySelectorAll('.menu-item').forEach(el => {
            el.classList.remove('active');
        })

        document.getElementById('category-menu').classList.add('active')
        document.getElementById('expense').classList.add('active')


        const queryString = (document.location.hash).split("?")[1];
        if(queryString) {
            const params = new URLSearchParams(queryString);
            this.expenseElementId = params.get("id");
            this.expensesElementTitle = params.get("title");
        }
        this.inputExpenseElement = document.getElementById("edit-expense");
        if(this.expensesElementTitle){
            this.inputExpenseElement.value = this.expensesElementTitle;
        }
        this.buttonSaveElement = document.getElementById('expense-save');
        this.buttonSaveElement.addEventListener("click", this.editExpenses.bind(this))

    }

    async editExpenses() {
        if(this.inputExpenseElement.value && this.inputExpenseElement.value.length > 0) {
            if (this.expenseElementId) {
                let result = await HttpRequests.request('/categories/expense/' + this.expenseElementId, "PUT", true, {
                    title: this.inputExpenseElement.value,
                })
                if (result.error) {
                    console.error("Failed to edit the element")
                    return
                }
                location.hash = '#/expenses'
            }
        }else {
            this.inputExpenseElement.classList.add('is-invalid')
        }
    }
}