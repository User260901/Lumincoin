import {HttpRequests} from "../../utils/http-requests";

export class ExpenseDelete {
    constructor() {
        const activeModal = document.querySelector('.modal.show');
        if (activeModal) {
            $(activeModal).modal('hide');
        }

        const queryString = (document.location.hash).split("?")[1];
        if(queryString) {
            const params = new URLSearchParams(queryString);
            this.incomeElementId = params.get("id");
        }

        this.deleteExpense(this.incomeElementId).then()
    }


    async deleteExpense(expenseElementId) {
        let result = await HttpRequests.request('/categories/expense/' + expenseElementId, "DELETE");
        if (!result.error) {
            location.href = '#/expenses'
        }else {
            alert('Извините, что-то пошло не так. Попробуйте снова!')
        }
    }

}