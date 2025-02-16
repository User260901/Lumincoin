import {HttpRequests} from "../../utils/http-requests";
import {DefaultResponseType} from "../../types/response-types/default-response.type";
import {CategoryResponseType} from "../../types/response-types/category-response.type";

export class CreateCategoryExpense {
    private categoryMenuElement: HTMLElement | null = null;
    private expensesElement: HTMLElement | null = null;
    private inputElement: HTMLInputElement | null = null;
    private createExpenseElement: HTMLElement | null = null;

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

        this.inputElement = document.getElementById('expense-name') as HTMLInputElement;
        this.createExpenseElement = document.getElementById('create-expense')
        if (this.createExpenseElement) {
            this.createExpenseElement.addEventListener('click', this.createExpense.bind(this));
        }
    }

    private async createExpense(): Promise<void> {
        if (this.inputElement && this.inputElement.value && this.inputElement.value.length > 0) {
            let result: DefaultResponseType | CategoryResponseType = await HttpRequests.request('/categories/expense', "POST", true, {
                title: this.inputElement.value,
            })
            if((result as DefaultResponseType).error !== undefined) {
                throw new Error((result as DefaultResponseType).message)
            }

            location.hash = '#/expenses'

        } else {
            if (this.inputElement) {
                this.inputElement.classList.add('is-invalid')
            }
        }
    }
}