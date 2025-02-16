import {HttpRequests} from "../../utils/http-requests";
import {DefaultResponseType} from "../../types/response-types/default-response.type";
import {CategoryResponseType} from "../../types/response-types/category-response.type";

export class EditIncome {
    readonly categoryMenu: HTMLElement | null = null;
    readonly incomeElement: HTMLElement | null = null;
    readonly buttonSaveElement: HTMLElement | null = null;
    readonly inputIncomeElement: HTMLInputElement | null = null;
    readonly incomeElementId: string | null = null;
    readonly incomeElementTitle: string | null = null;


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

        const queryString: string = (document.location.hash).split("?")[1];
        if (queryString) {
            const params: URLSearchParams = new URLSearchParams(queryString);
            this.incomeElementId = params.get("id");
            this.incomeElementTitle = params.get("title");
        }

        this.inputIncomeElement = document.getElementById("edit-income") as HTMLInputElement;
        if (this.incomeElementTitle) {
            this.inputIncomeElement.value = this.incomeElementTitle;
        }

        this.buttonSaveElement = document.getElementById('income-save');
        if (this.buttonSaveElement) {
            this.buttonSaveElement.addEventListener("click", this.editIncome.bind(this))
        }
    }

    private async editIncome():Promise<void> {
        if (this.inputIncomeElement && this.inputIncomeElement.value && this.inputIncomeElement.value.length > 0) {
            if (this.incomeElementId) {
                let result:DefaultResponseType | CategoryResponseType = await HttpRequests.request('/categories/income/' + this.incomeElementId, "PUT", true, {
                    title: this.inputIncomeElement.value,
                })
                if ((result as DefaultResponseType).error !== undefined) {
                    console.error("Failed to edit the element")
                    return
                }
                location.hash = '#/income'
            }
        } else {
            if(this.inputIncomeElement)
            this.inputIncomeElement.classList.add('is-invalid')
        }


    }


}
