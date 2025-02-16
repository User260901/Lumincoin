import {HttpRequests} from "../../utils/http-requests";
import {CategoryResponseType} from "../../types/response-types/category-response.type";
import {DefaultResponseType} from "../../types/response-types/default-response.type";
import {DataSentType} from "../../types/data-sent/data-sent.type";
import {OperationsResponseType} from "../../types/response-types/operations-response.type";

export class CreateIncomeOrExpense {
    private tableList: HTMLElement | null;
    private params: URLSearchParams | null = null;
    private categoryType: string | null = null;
    private selectTypeElement: HTMLSelectElement | null = null;
    private categoryInputElement: HTMLInputElement | null = null;
    private amountInputElement: HTMLInputElement | null = null;
    private commentInputElement: HTMLInputElement | null = null;
    private dateInputElement: HTMLInputElement | null = null;
    private createButton: HTMLElement | null = null;


    constructor() {
        document.querySelectorAll('.menu-item').forEach(el => {
            el.classList.remove('active');
        })
        this.tableList = document.getElementById('table-list');
        if (this.tableList) {
            this.tableList.classList.add('active');
        }


        const queryString: string = (document.location.hash).split("?")[1];
        if (queryString) {
            this.params = new URLSearchParams(queryString);
            this.categoryType = this.params.get("type");
        }
        if (!this.categoryType) {
            location.hash = '#/table'
        }

        this.findElements()

        if (this.selectTypeElement) {
            this.selectTypeElement.addEventListener('change', this.handleChangingCategory.bind(this));
            this.getCategories().then()
        }

    }

    private findElements(): void {
        this.selectTypeElement = document.getElementById("type") as HTMLSelectElement;
        this.categoryInputElement = document.getElementById("category") as HTMLInputElement;
        this.amountInputElement = document.getElementById("amount") as HTMLInputElement;
        this.dateInputElement = document.getElementById("date") as HTMLInputElement;
        this.commentInputElement = document.getElementById("comment") as HTMLInputElement;
        this.createButton = document.getElementById('create') as HTMLElement;
    }

    private async handleChangingCategory(e: any): Promise<void> {
        if (this.params) {
            this.params.set('type', e.target.value);
            const updatedQueryString = this.params.toString();
            location.hash = `#/create-income-or-expenses?${updatedQueryString}`;
            this.getCategories().then()
        }
    }

    private async getCategories(): Promise<void> {
        if (this.categoryType) {
            let result: CategoryResponseType[] | DefaultResponseType = await HttpRequests.request('/categories/' + this.categoryType);
            if ((result as DefaultResponseType).error !== undefined) {
                alert('Извините, что-то пошло не так. Попробуйте снова!')
                return
            }

            this.createCategory(result as CategoryResponseType[])

        }
    }

    createCategory(data: CategoryResponseType[]) {
        if (data) {
            if (this.selectTypeElement && this.categoryType) {
                this.selectTypeElement.value = this.categoryType
                for (let i = 0; i < data.length; i++) {
                    let optionElement = document.createElement("option");
                    optionElement.innerText = data[i].title;
                    optionElement.value = data[i].id.toString()
                    if (this.categoryInputElement) {
                        this.categoryInputElement.appendChild(optionElement);
                    }
                }
            }


            if (this.createButton) {
                this.createButton.addEventListener('click', async () => {
                    if (this.selectTypeElement && this.amountInputElement && this.dateInputElement && this.categoryInputElement) {
                        if (this.categoryCreateValidation()) {
                            const operationData: DataSentType = {
                                type: this.selectTypeElement.value,
                                amount: parseInt(this.amountInputElement.value),
                                date: this.dateInputElement.value,
                                category_id: parseInt(this.categoryInputElement.value)
                            }

                            if (this.commentInputElement && this.commentInputElement.value && this.commentInputElement.value.length > 0) {
                                operationData.comment = this.commentInputElement.value;
                            } else {
                                operationData.comment = " "
                            }

                            let result: DefaultResponseType | OperationsResponseType = await HttpRequests.request('/operations', 'POST', true, operationData);
                            if ((result as DefaultResponseType).error !== undefined) {
                                alert('Извините, что-то пошло не так. Попробуйте снова!')
                                return
                            }

                            location.hash = '#/table'

                        }
                    }
                })

            }
        }
    }

    private categoryCreateValidation(): boolean {
        let isValid: boolean = true
        if (this.amountInputElement) {
            if (this.amountInputElement.value) {
                this.amountInputElement.classList.remove('is-invalid')
                isValid = true
            } else {
                this.amountInputElement.classList.add('is-invalid')
                isValid = false
            }
        }

        if (this.dateInputElement) {
            if (this.dateInputElement.value) {
                this.dateInputElement.classList.remove('is-invalid')
                isValid = true
            } else {
                this.dateInputElement.classList.add('is-invalid')
                isValid = false

            }

        }

        return isValid
    }
}