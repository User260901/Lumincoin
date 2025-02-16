import {HttpRequests} from "../../utils/http-requests";
import {DefaultResponseType} from "../../types/response-types/default-response.type";

export class ExpenseDelete {
    private incomeElementId: string | null = null;


    constructor() {
        const activeModal = document.querySelector('.modal.show');
        if (activeModal) {
            $(activeModal).modal('hide');
        }

        const queryString: string = (document.location.hash).split("?")[1];
        if (queryString) {
            const params = new URLSearchParams(queryString);
            this.incomeElementId = params.get("id");
        }

        if (this.incomeElementId) {
            this.deleteExpense().then()
        }
    }


    async deleteExpense() {
        let result:DefaultResponseType = await HttpRequests.request('/categories/expense/' + this.incomeElementId, "DELETE");
        if (!result.error) {
            location.href = '#/expenses'
        } else {
            alert('Извините, что-то пошло не так. Попробуйте снова!')
        }
    }

}