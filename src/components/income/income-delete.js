import {HttpRequests} from "../../utils/http-requests";

export class IncomeDelete {
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

        this.deleteIncome(this.incomeElementId).then()
    }

    async deleteIncome(incomeElementId) {
        if (this.incomeElementId) {
            let result = await HttpRequests.request('/categories/income/' + incomeElementId, "DELETE");
            if (!result.error) {
                location.hash = '#/income'
            }else {
                alert('Извините, что-то пошло не так. Попробуйте снова!')
            }
        }else {
            console.error("Failed to delete the element")
        }
    }
}