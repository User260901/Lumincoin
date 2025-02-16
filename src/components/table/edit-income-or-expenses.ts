import {HttpRequests} from "../../utils/http-requests";
import {CategoryResponseType} from "../../types/response-types/category-response.type";
import {DefaultResponseType} from "../../types/response-types/default-response.type";
import {TableResponseType} from "../../types/response-types/table-response.type";

export class EditIncomeOrExpenses {
    readonly tableList: HTMLElement | null;
    private params: URLSearchParams | null = null;
    readonly categoryType: string | null = null;
    readonly category: string | null = null;
    readonly categoryAmount: string | null = null;
    readonly categoryDate: string | null = null;
    readonly categoryId: string | null = null;
    readonly categoryComment: string | null = null;

    private selectTypeElement: HTMLSelectElement | null = null;
    private categoryInputElement: HTMLSelectElement | null = null;
    private amountInputElement: HTMLInputElement | null = null;
    private dateInputElement: HTMLInputElement | null = null;
    private commentInputElement: HTMLInputElement | null = null;
    private saveButtonElement: HTMLElement | null = null;

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

    findElements() {
        this.selectTypeElement = document.getElementById("type") as HTMLSelectElement;
        this.categoryInputElement = document.getElementById("category") as HTMLSelectElement;
        this.amountInputElement = document.getElementById("amount") as HTMLInputElement;
        this.dateInputElement = document.getElementById("date") as HTMLInputElement;
        this.commentInputElement = document.getElementById("comment") as HTMLInputElement;
        this.saveButtonElement = document.getElementById('save')
    }

    async getCategories(): Promise<void> {
        let result: CategoryResponseType[] | DefaultResponseType = await HttpRequests.request('/categories/' + this.categoryType);
        if ((result as DefaultResponseType).error !== undefined) {
            alert('Извините, что-то пошло не так. Попробуйте снова!')
            return
        }
        this.createCategory(result as CategoryResponseType[])
    }

    private fillInputs():void {
        if (this.categoryInputElement) {
            const options = this.categoryInputElement.options
            for (let i = 0; i < options.length; i++) {
                let option = options[i].value.split('-')[0]
                if (option === this.category) {
                    this.categoryInputElement.value = options[i].value
                    this.categoryInputElement.setAttribute('disabled', 'disabled')
                    return
                }
            }

            if (this.amountInputElement && this.dateInputElement && this.categoryAmount && this.categoryDate) {
                this.amountInputElement.value = this.categoryAmount
                this.dateInputElement.value = this.categoryDate
                if (this.categoryComment && this.commentInputElement) {
                    this.commentInputElement.value = this.categoryComment
                }
            }
        }
    }

    private createCategory(data: CategoryResponseType[]):void {
        if (data) {
            if (this.selectTypeElement) {
                if (this.categoryType) {
                    this.selectTypeElement.value = this.categoryType
                }
                this.selectTypeElement.setAttribute('disabled', 'disabled')
                for (let i = 0; i < data.length; i++) {
                    let optionElement = document.createElement("option");
                    optionElement.value = data[i].title + "-" + data[i].id;
                    optionElement.innerText = data[i].title
                    if (this.categoryInputElement) {
                        this.categoryInputElement.appendChild(optionElement);
                    }

                }

            }


            this.fillInputs()

            if (this.saveButtonElement) {
                this.saveButtonElement.addEventListener('click', async () => {
                    if (this.categoryInputElement) {
                        const id = this.categoryInputElement.value.split('-')[1]
                        if (this.amountInputElement && this.dateInputElement && this.commentInputElement) {
                            if (this.categoryCreateValidation()) {
                                const operationData = {
                                    type: this.categoryType,
                                    amount: parseInt(this.amountInputElement.value),
                                    date: this.dateInputElement.value,
                                    category_id: parseInt(id),
                                    comment: this.commentInputElement.value
                                }

                                let result: TableResponseType | DefaultResponseType = await HttpRequests.request('/operations/' + this.categoryId, 'PUT', true, operationData);
                                if ((result as DefaultResponseType).error !== undefined) {
                                    alert('Извините, что-то пошло не так. Попробуйте снова!')
                                    return
                                }
                                location.hash = '#/table'
                            }
                        }
                    }
                })
            }
        }
    }

    private categoryCreateValidation():boolean {
        let isValid:boolean = true
        if(this.amountInputElement){
            if (this.amountInputElement.value) {
                this.amountInputElement.classList.remove('is-invalid')
                isValid = true
            } else {
                this.amountInputElement.classList.add('is-invalid')
                isValid = false
            }
        }

        if(this.dateInputElement){
            if (this.dateInputElement.value) {
                this.dateInputElement.classList.remove('is-invalid')
                isValid = true
            } else {
                this.dateInputElement.classList.add('is-invalid')
                isValid = false
            }
        }

        if(this.commentInputElement){
            if (this.commentInputElement.value) {
                this.commentInputElement.classList.remove('is-invalid')
                isValid = true
            } else {
                this.commentInputElement.classList.add('is-invalid')
                isValid = false
            }
        }

        return isValid
    }

}


