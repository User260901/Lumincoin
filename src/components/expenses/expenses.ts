import {HttpRequests} from "../../utils/http-requests";
import {CategoryResponseType} from "../../types/response-types/category-response.type";
import {DefaultResponseType} from "../../types/response-types/default-response.type";

export class Expenses {
    private categoryMenuElement: HTMLElement | null = null;
    private expensesElement: HTMLElement | null = null;
    private contentElement: HTMLElement | null = null;

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

        this.contentElement = document.getElementById("expenses-container");
        this.getExpenses().then()
    }

    private async getExpenses(): Promise<void> {
        let result: CategoryResponseType[] | DefaultResponseType = await HttpRequests.request('/categories/expense');
        if ((result as DefaultResponseType).error !== undefined) {
            throw new Error((result as DefaultResponseType).message)
        }

        this.init((result as CategoryResponseType[]))

    }

    init(dataExpense: CategoryResponseType[]) {
        if (dataExpense && dataExpense.length > 0) {
            dataExpense.forEach(item => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card-action');
                cardElement.setAttribute('id', item.id.toString())

                const titleElement = document.createElement('h2');
                titleElement.classList.add('title', "mb-3");
                titleElement.innerText = item.title;

                const editElement = document.createElement('a');
                editElement.setAttribute('href', '#/edit-expenses?id=' + item.id + '&title=' + item.title);
                editElement.classList.add('btn', "btn-primary", 'mr-2', 'mt-2', 'btn-edit');
                editElement.innerText = 'Редактировать';

                const btnElement = document.createElement('button');
                btnElement.type = 'button';
                btnElement.classList.add('btn', 'btn-danger', 'mt-2');
                btnElement.setAttribute('Data-toggle', 'modal');
                btnElement.setAttribute('Data-target', '#myModal' + item.id);
                btnElement.innerText = "Удалить"

                const cardActionElement = document.createElement('div');
                cardActionElement.classList.add('action');


                const modalBtnElement = document.createElement('button');
                modalBtnElement.innerText = "Не удалять";
                modalBtnElement.classList.add('btn', 'btn-danger');
                modalBtnElement.setAttribute('data-dismiss', 'modal');

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
                buttonDeleteElement.setAttribute('href', '#/expenses/delete?id=' + item.id)
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
        createCardElement.setAttribute('href', '#/create-category-expenses');
        if (this.contentElement) {
            this.contentElement.appendChild(createCardElement)

        }

    }


}