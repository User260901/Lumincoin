import {HttpRequests} from "../../utils/http-requests";
import {DefaultResponseType} from "../../types/response-types/default-response.type";

export class IncomeDelete {
    private incomeElementId: string | null = null;

    constructor() {
        const activeModal = document.querySelector('.modal.show');
        if (activeModal) {
            $(activeModal).modal('hide');
        }

        const queryString: string | null = (document.location.hash).split("?")[1];
        if (queryString) {
            const params = new URLSearchParams(queryString);
            this.incomeElementId = params.get("id");
        }

        if (this.incomeElementId) {
            this.deleteIncome(this.incomeElementId).then()
        }
    }

    async deleteIncome(incomeElementId: string) {
        if (this.incomeElementId) {
            let result:DefaultResponseType = await HttpRequests.request('/categories/income/' + incomeElementId, "DELETE");
            if (!result.error) {
                location.hash = '#/income'
            } else {
                alert('Извините, что-то пошло не так. Попробуйте снова!')
                console.error(result.message)
            }
        } else {
            console.error("Failed to delete the element")
        }
    }
}