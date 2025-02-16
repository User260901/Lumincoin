import {HttpRequests} from "../../utils/http-requests";
import {CategoryResponseType} from "../../types/response-types/category-response.type";
import {DefaultResponseType} from "../../types/response-types/default-response.type";

export class CreateCategoryIncome {
    readonly categoryMenu: HTMLElement | null = null;
    readonly incomeElement: HTMLElement | null = null;
    readonly inputElement: HTMLInputElement | null = null;
    readonly createIncomeElement: HTMLElement | null = null;


    constructor() {
        document.querySelectorAll('.menu-item').forEach(el => {
            el.classList.remove('active');
        })

        this.categoryMenu = document.getElementById('category-menu')
        if (this.categoryMenu) {
            this.categoryMenu.classList.add('active');
        }
        this.incomeElement = document.getElementById('income');
        if (this.incomeElement) {
            this.incomeElement.classList.add('active');
        }

        this.inputElement = document.getElementById('income-name') as HTMLInputElement;
        this.createIncomeElement = document.getElementById('create-income')
        if (this.createIncomeElement) {
            this.createIncomeElement.addEventListener('click', this.createIncome.bind(this));
        }
    }

    private async createIncome(): Promise<void> {
        if (this.inputElement && this.inputElement.value && this.inputElement.value.length > 0) {
            let result: CategoryResponseType | DefaultResponseType = await HttpRequests.request('/categories/income', "POST", true, {
                title: this.inputElement.value,
            })
            if ((result as DefaultResponseType).error !== undefined) {
                alert('невозможно создать доход, пожалуйста, попробуйте позже')
                return
            }

            location.hash = '#/income'
        } else {
            if (this.incomeElement) {
                this.incomeElement.classList.add('is-invalid')
            }
        }
    }
}