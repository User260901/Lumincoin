import {AuthUtils} from "../../utils/auth-utils";
import {HttpRequests} from "../../utils/http-requests";
import {CommonUtils} from "../../utils/common-utils";

export class Table {
    constructor() {
        document.querySelectorAll('.menu-item').forEach(el => {
            el.classList.remove('active');
        })
        document.getElementById('table-list').classList.add('active')

        this.findElements()

        this.targetElement = null;
        this.eventListenerAtached = false;
        this.dateFromData = null;
        this.dateTodata = null
        this.intervalType = null

        this.init()
    }

    findElements() {
        this.tbodyElement = document.getElementById("tbody");
        this.inputElementDateFrom = document.getElementById('datepickerFrom')
        this.inputElementDateTo = document.getElementById('datepickerTo')
        this.dateFromElement = document.getElementById('dateFrom')
        this.dateToElement = document.getElementById('dateTo')
        this.findButtonElement = document.getElementById('find')
        this.buttonElements = document.querySelectorAll('nav button')
        this.deleteButtonElement = document.getElementById('delete')
        this.todayButton = document.getElementById('today')
    }

    init() {
        let todayInterval = CommonUtils.getIntervalInfo('Сегодня')
        if (todayInterval && (todayInterval.dateFrom && todayInterval)) {
            this.getTableByFilter(todayInterval.dateFrom, todayInterval.dateTo).then()
            this.todayButton.classList.add('bg-secondary')
        }

        this.buttonElements.forEach(buttonElement => {
            buttonElement.addEventListener('click', (e) => {
                this.buttonElements.forEach(button => {
                    button.classList.remove('bg-secondary')
                })
                buttonElement.classList.add('bg-secondary')
                if (buttonElement.innerText === 'Все') {
                    this.intervalType = "all"
                }else if (buttonElement.innerText === "Сегодня"){
                    this.intervalType = null
                    if (todayInterval && (todayInterval.dateFrom && todayInterval)) {
                        this.getTableByFilter(todayInterval.dateFrom, todayInterval.dateTo).then()
                        this.todayButton.classList.add('bg-secondary')
                    }
                }else if (buttonElement.innerText === 'Неделя'){
                    this.intervalType = "week"
                }else if (buttonElement.innerText === 'Месяц'){
                    this.intervalType = "month"
                }else if(buttonElement.innerText === 'Год'){
                    this.intervalType = "year"
                }else if (buttonElement.innerText === 'Интервал') {
                    this.intervalType = null;
                    this.findButtonElement.addEventListener('click', (e) => {
                        if (this.intervalValidation()) {
                            this.dateFromElement.innerText = this.inputElementDateFrom.value
                            this.dateToElement.innerText = this.inputElementDateTo.value

                            this.getTableByFilter(this.dateFromElement.innerText, this.dateToElement.innerText).then()
                        }
                    })

                }
                this.getTableByFilter().then()
            })
        })
    }


    intervalValidation() {
        let isValid = true
        if (this.inputElementDateFrom.value) {
            this.inputElementDateFrom.classList.remove('is-invalid')
            this.findButtonElement.setAttribute('data-dismiss', 'modal');
            isValid = true
        } else {
            this.inputElementDateFrom.classList.add('is-invalid')
            this.findButtonElement.removeAttribute('data-dismiss');
            isValid = false
        }

        if (this.inputElementDateTo.value) {
            this.inputElementDateTo.classList.remove('is-invalid')
            this.findButtonElement.setAttribute('data-dismiss', 'modal');
            isValid = true
        } else {
            this.inputElementDateTo.classList.add('is-invalid')
            isValid = false
            this.findButtonElement.removeAttribute('data-dismiss');
        }

        return isValid
    }

    async getTableByFilter(dateFrom, dateTo) {
        let url = '/operations'
        if(this.intervalType){
            url = url + '?period=' + this.intervalType
        }
        if(dateFrom && dateTo && !this.intervalType){
            this.dateFromData = dateFrom;
            this.dateTodata = dateTo;
            url = url + '?period=interval&dateFrom=' + dateFrom + '&dateTo=' + dateTo
        }
        let result = await HttpRequests.request(url)
        if (result.error) {
            alert("error");
            return
        }
        this.showElements(result.response)
    }

    showElements(data) {
        if (data) {
            this.tbodyElement.innerHTML = '';

            data.forEach((item, index) => {

                    let trElement = document.createElement("tr");
                    trElement.setAttribute('id', item.id)
                    trElement.style.color = 'black'

                    let celNum = trElement.insertCell()
                    celNum.innerText = ++index
                    celNum.style.fontWeight = 'bold'

                    let cell = trElement.insertCell();
                    cell.innerText = item.type === 'income' ? 'доход' : 'расход';
                    cell.style.color = item.type === 'income' ? 'green' : 'red';


                    let categoryCell = trElement.insertCell();
                    if (!item.category) {
                        categoryCell.style.color = 'red'
                        categoryCell.innerText = 'Категория удалена'
                    } else {
                        categoryCell.style.color = 'black'
                        categoryCell.innerText = item.category

                    }

                    trElement.insertCell().innerText = `${item.amount} $`

                    trElement.insertCell().innerText = item.date

                    trElement.insertCell().innerText = item.comment || '';

                    let linkDeleteElement = document.createElement("a");
                    linkDeleteElement.classList.add("remove-icon")
                    linkDeleteElement.setAttribute('data-toggle', 'modal')
                    linkDeleteElement.setAttribute('data-target', '#deleteModal')
                    linkDeleteElement.innerHTML = '<svg width="14" height="15" viewBox="0 0 14 15" fill="none"\n' +
                        '             xmlns="http://www.w3.org/2000/svg">\n' +
                        '            <path d="M4.5 5.5C4.77614 5.5 5 5.72386 5 6V12C5 12.2761 4.77614 12.5 4.5 12.5C4.22386 12.5 4 12.2761 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5Z"\n' +
                        '                  fill="black"/>\n' +
                        '            <path d="M7 5.5C7.27614 5.5 7.5 5.72386 7.5 6V12C7.5 12.2761 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.2761 6.5 12V6C6.5 5.72386 6.72386 5.5 7 5.5Z"\n' +
                        '                  fill="black"/>\n' +
                        '            <path d="M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6V12C9 12.2761 9.22386 12.5 9.5 12.5C9.77614 12.5 10 12.2761 10 12V6Z"\n' +
                        '                  fill="black"/>\n' +
                        '            <path fill-rule="evenodd" clip-rule="evenodd"\n' +
                        '                  d="M13.5 3C13.5 3.55228 13.0523 4 12.5 4H12V13C12 14.1046 11.1046 15 10 15H4C2.89543 15 2 14.1046 2 13V4H1.5C0.947715 4 0.5 3.55228 0.5 3V2C0.5 1.44772 0.947715 1 1.5 1H5C5 0.447715 5.44772 0 6 0H8C8.55229 0 9 0.447715 9 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3ZM3.11803 4L3 4.05902V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V4.05902L10.882 4H3.11803ZM1.5 3V2H12.5V3H1.5Z"\n' +
                        '                  fill="black"/>\n' +
                        '        </svg>'


                    let deleteCell = trElement.insertCell()
                    deleteCell.style.textAlign = 'right';
                    deleteCell.appendChild(linkDeleteElement);


                    let linkEditElement = document.createElement("a");
                    let url = '#/edit-income-or-expenses?type=' + item.type + '&category=' + item.category + '&id=' + item.id + '&amount=' + item.amount + '&date=' + item.date + '&comment=' + item.comment
                    linkEditElement.href = url
                    linkEditElement.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"\n' +
                        '             xmlns="http://www.w3.org/2000/svg">\n' +
                        '            <path d="M12.1465 0.146447C12.3417 -0.0488155 12.6583 -0.0488155 12.8536 0.146447L15.8536 3.14645C16.0488 3.34171 16.0488 3.65829 15.8536 3.85355L5.85357 13.8536C5.80569 13.9014 5.74858 13.9391 5.68571 13.9642L0.68571 15.9642C0.500001 16.0385 0.287892 15.995 0.146461 15.8536C0.00502989 15.7121 -0.0385071 15.5 0.0357762 15.3143L2.03578 10.3143C2.06092 10.2514 2.09858 10.1943 2.14646 10.1464L12.1465 0.146447ZM11.2071 2.5L13.5 4.79289L14.7929 3.5L12.5 1.20711L11.2071 2.5ZM12.7929 5.5L10.5 3.20711L4.00001 9.70711V10H4.50001C4.77616 10 5.00001 10.2239 5.00001 10.5V11H5.50001C5.77616 11 6.00001 11.2239 6.00001 11.5V12H6.29291L12.7929 5.5ZM3.03167 10.6755L2.92614 10.781L1.39754 14.6025L5.21903 13.0739L5.32456 12.9683C5.13496 12.8973 5.00001 12.7144 5.00001 12.5V12H4.50001C4.22387 12 4.00001 11.7761 4.00001 11.5V11H3.50001C3.28561 11 3.10272 10.865 3.03167 10.6755Z"\n' +
                        '                  fill="black"/>\n' +
                        '        </svg>'

                    let editCell = trElement.insertCell()
                    editCell.style.textAlign = 'left';

                    editCell.appendChild(linkEditElement);

                    this.tbodyElement.appendChild(trElement)


                }
            )
        }

        document.querySelectorAll('.remove-icon').forEach(item => {
            item.addEventListener('click', () => {
                this.targetElement = item.parentElement.parentElement
            })
        })

        if (this.eventListenerAtached) {
            return
        }
        this.deleteButtonElement.addEventListener('click', async () => {
            if (this.targetElement) {
                let result = await HttpRequests.request('/operations/' + this.targetElement.id, "DELETE");
                if (!result.error) {
                    this.getTableByFilter(this.dateFromData, this.dateTodata).then()

                } else {
                    alert('Извините, что-то пошло не так. Попробуйте снова!')
                }
            } else {
                console.error("Failed to delete the element")
            }
        })
        this.eventListenerAtached = true
    }
}

