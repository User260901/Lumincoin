import {CommonUtils} from "../../utils/common-utils";
import {HttpRequests} from "../../utils/http-requests";

export class Main {
    constructor() {
        document.querySelectorAll('.menu-item').forEach(el => {
            el.classList.remove('active');
        })

        document.getElementById('menu').classList.add('active')

        this.findElements()

        this.incomeChart = null;
        this.expenseChart = null;
        this.init()

    }

    findElements(){
        this.inputElementDateFrom = document.getElementById('datepickerFrom')
        this.inputElementDateTo = document.getElementById('datepickerTo')
        this.dateFromElement = document.getElementById('dateFrom')
        this.dateToElement = document.getElementById('dateTo')
        this.findButtonElement = document.getElementById('find')
        this.buttonElements = document.querySelectorAll('nav button')
        this.todayButton = document.getElementById('today')
    }

    init() {
        const todayInterval = CommonUtils.getIntervalInfo('Сегодня')
        if(todayInterval && (todayInterval.dateFrom && todayInterval)) {
            this.getTableByFilter(todayInterval.dateFrom, todayInterval.dateTo).then()
            this.todayButton.classList.add('bg-secondary')

        }

        this.buttonElements.forEach(buttonElement => {
            buttonElement.addEventListener('click', (e) => {
                this.buttonElements.forEach(button => {button.classList.remove('bg-secondary')})
                buttonElement.classList.add('bg-secondary')

                if (buttonElement.innerText === 'Все') {
                    this.getTableByFilter().then()

                } else if (buttonElement.innerText === 'Интервал') {
                    this.findButtonElement.addEventListener('click', (e) => {
                        if (this.intervalValidation()) {
                            this.dateFromElement.innerText = this.inputElementDateFrom.value
                            this.dateToElement.innerText = this.inputElementDateTo.value

                            this.getTableByFilter(this.dateFromElement.innerText, this.dateToElement.innerText).then()
                        }
                    })

                } else {
                    let result = CommonUtils.getIntervalInfo(buttonElement.innerText)
                    if (result && (result.dateFrom && result.dateTo)) {
                        this.getTableByFilter(result.dateFrom, result.dateTo).then()
                    }
                }
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
        this.dateFromData = dateFrom;
        this.dateTodata = dateTo
        let url = '/operations'
        if (dateTo && dateFrom) {
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
            const expenses = []
            const income = []
            data.forEach((item) => {
                if(item.type === 'expense'){
                    expenses.push(item)
                }else if(item.type === 'income'){
                    income.push(item)
                }
            })

            if(expenses && expenses.length > 0 || income && income.length > 0) {
                this.chart(expenses, income)
            }
        }
    }


    chart(expensesData, incomeData) {
        const dataIncome = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor : ['#dc3545', '#fd7e14', '#20c997', '#0d6efd', '#ffc107', '#ff6384', '#ffcd56', '#9966ff','#dc3545', '#fd7e14', '#20c997', '#0d6efd', '#ffc107', '#ff6384', '#ffcd56', '#9966ff', ],
                }
            ]
        }

        incomeData.forEach((item) => {
            dataIncome.labels.push(item.category)
            dataIncome.datasets[0].data.push(item.amount)
        })

        const incomeCanvas = $('#chartIncome').get(0).getContext('2d');
        if (this.incomeChart) {
            this.incomeChart.data = dataIncome;
            this.incomeChart.update();
        } else {
            this.incomeChart = new Chart(incomeCanvas, {
                type: 'pie',
                data: dataIncome,
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                },
            });
        }

        const dataExpenses = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor : ['#ffcd56', '#9966ff','#dc3545', '#fd7e14', '#20c997', '#0d6efd', '#ffc107', '#ff6384','#dc3545', '#fd7e14', '#20c997', '#0d6efd', '#ffc107', '#ff6384', '#ffcd56', '#9966ff', ],
                }
            ]
        }

        expensesData.forEach((item) => {
            dataExpenses.labels.push(item.category)
            dataExpenses.datasets[0].data.push(item.amount)
        })

        const expenseCanvas = $('#chartExpenses').get(0).getContext('2d');
        if (this.expenseChart) {
            this.expenseChart.data = dataExpenses;
            this.expenseChart.update();
        } else {
            this.expenseChart = new Chart(expenseCanvas, {
                type: 'pie',
                data: dataExpenses,
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                },
            });
        }


     }
}