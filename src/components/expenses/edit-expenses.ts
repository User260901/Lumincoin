import {HttpRequests} from "../../utils/http-requests";
import {DefaultResponseType} from "../../types/response-types/default-response.type";
import {CategoryResponseType} from "../../types/response-types/category-response.type";

export class EditExpenses {
    readonly categoryMenuElement: HTMLElement | null = null;
    readonly expensesElement: HTMLElement | null = null;
    readonly expenseElementId: string | null = null;
    readonly expensesElementTitle: string | null = null;
    readonly inputExpenseElement: HTMLInputElement | null = null;
    readonly buttonSaveElement: HTMLElement | null = null;


    constructor() {
        document.querySelectorAll('.menu-item').forEach(el => {
            el.classList.remove('active');
        })

        this.categoryMenuElement = document.getElementById('category-menu')
        if (this.categoryMenuElement) {
            this.categoryMenuElement.classList.add('active')
        }

        this.expensesElement = document.getElementById('expenses')
        if (this.expensesElement) {
            this.expensesElement.classList.add('active')
        }

        const queryString: string = (document.location.hash).split("?")[1];
        if (queryString) {
            const params = new URLSearchParams(queryString);
            this.expenseElementId = params.get("id");
            this.expensesElementTitle = params.get("title");
        }
        this.inputExpenseElement = document.getElementById("edit-expense") as HTMLInputElement;
        if (this.expensesElementTitle) {
            this.inputExpenseElement.value = this.expensesElementTitle;
        }
        this.buttonSaveElement = document.getElementById('expense-save');
        if (this.buttonSaveElement) {
            this.buttonSaveElement.addEventListener("click", this.editExpenses.bind(this))
        }

    }

    private async editExpenses() {
        if (this.inputExpenseElement && this.inputExpenseElement.value && this.inputExpenseElement.value.length > 0) {
            if (this.expenseElementId) {
                let result:DefaultResponseType | CategoryResponseType = await HttpRequests.request('/categories/expense/' + this.expenseElementId, "PUT", true, {
                    title: this.inputExpenseElement.value,
                })
                if((result as DefaultResponseType).error !== undefined){
                    console.error("Failed to edit the element")
                    return
                }

                location.hash = '#/expenses'
            }
        } else {
            if (this.inputExpenseElement) {
                this.inputExpenseElement.classList.add('is-invalid')

            }
        }
    }
}