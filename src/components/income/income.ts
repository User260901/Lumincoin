import {HttpRequests} from "../../utils/http-requests";
import {CategoryResponseType} from "../../types/response-types/category-response.type";
import {DefaultResponseType} from "../../types/response-types/default-response.type";


export class Income {
    private categoryMenu: HTMLElement | null = null;
    private incomeElement: HTMLElement | null = null;
    private contentElement: HTMLElement | null = null;


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

        this.contentElement = document.getElementById("income-container");
        this.getIncome().then()

    }

    private async getIncome(): Promise<void> {
        let result: CategoryResponseType[] | DefaultResponseType = await HttpRequests.request('/categories/income');
        if ((result as DefaultResponseType).error !== undefined) {
            throw new Error((result as DefaultResponseType).message)
        }
        this.showIncome((result as CategoryResponseType[]))

    }

    showIncome(dataIncome: CategoryResponseType []) {
        if (dataIncome && dataIncome.length > 0) {
            dataIncome.forEach(item => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card-action');
                cardElement.setAttribute('id', item.id.toString())

                const titleElement = document.createElement('h2');
                titleElement.classList.add('title', "mb-3");
                titleElement.innerText = item.title;

                const editElement = document.createElement('a');
                editElement.setAttribute('href', '#/edit-income?id=' + item.id + '&title=' + item.title);
                editElement.classList.add('btn', "btn-primary", 'mr-2', 'mt-2', 'btn-edit');
                editElement.innerText = 'Редактировать';


                const btnElement = document.createElement('button');
                btnElement.classList.add('btn', 'btn-danger', 'mt-2');
                btnElement.setAttribute('Data-toggle', 'modal');
                btnElement.setAttribute('Data-target', '#myModal' + item.id);
                btnElement.innerText = "Удалить"

                const cardActionElement = document.createElement('div');
                cardActionElement.classList.add('action');

                cardElement.appendChild(titleElement)

                cardActionElement.appendChild(editElement)
                cardActionElement.appendChild(btnElement)

                cardElement.appendChild(cardActionElement)


                const modalElement = document.createElement('div');
                modalElement.classList.add('modal');
                modalElement.setAttribute('id', 'myModal' + item.id);

                const modalDialogElement = document.createElement('div');
                modalDialogElement.classList.add('modal-dialog', 'modal-dialog-centered');

                const modalContentElement = document.createElement('div');
                modalContentElement.classList.add('modal-content', 'd-flex', 'justify-content-center', 'align-items-center', 'pt-5', 'pb-5', 'border', 'border-secondary');

                const modalTextElement = document.createElement('div');
                modalTextElement.classList.add('modal-text', 'text-center', 'mb-3')
                modalTextElement.innerText = 'Вы действительно хотите удалить категорию?'

                const modalActionElement = document.createElement('div');
                modalActionElement.classList.add('modal-action');

                const buttonDeleteElement = document.createElement('a');
                buttonDeleteElement.setAttribute('href', '#/income/delete?id=' + item.id)
                buttonDeleteElement.classList.add('btn', 'btn-success', 'mr-3');
                buttonDeleteElement.innerText = 'Да, удалить'


                const buttonCancelElement = document.createElement('button');
                buttonCancelElement.classList.add('btn', 'btn-danger');
                buttonCancelElement.innerText = 'Не удалять'
                buttonCancelElement.setAttribute('data-dismiss', 'modal');

                modalActionElement.appendChild(buttonDeleteElement)
                modalActionElement.appendChild(buttonCancelElement)

                modalContentElement.appendChild(modalTextElement)
                modalContentElement.appendChild(modalActionElement)

                modalDialogElement.appendChild(modalContentElement)

                modalElement.appendChild(modalDialogElement)


                cardActionElement.appendChild(modalElement)

                if (this.contentElement) {
                    this.contentElement.appendChild(cardElement)
                }


            })

        }
        const createCardElement = document.createElement('a');
        createCardElement.classList.add('card-action', 'd-flex', 'align-items-center', 'justify-content-center');
        createCardElement.innerText = '+'
        createCardElement.setAttribute('id', 'add-income');
        createCardElement.setAttribute('href', '#/create-category-income');
        if (this.contentElement) {
            this.contentElement.appendChild(createCardElement)
        }
    }

}