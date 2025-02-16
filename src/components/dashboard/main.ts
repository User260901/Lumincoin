import {CommonUtils} from "../../utils/common-utils";
import {HttpRequests} from "../../utils/http-requests";
import {ResultDate} from "../../types/date-type/date.type";
import {DefaultResponseType} from "../../types/response-types/default-response.type";
import {DataChartType} from "../../types/chart/data-chart.type";
import {TableResponseType} from "../../types/response-types/table-response.type";
import {Chart} from "chart.js/auto/auto";

export class Main {
    readonly menuElement: HTMLElement | null = null;
    private inputElementDateFrom: HTMLInputElement | null = null;
    private inputElementDateTo: HTMLInputElement | null = null;
    private dateFromElement: HTMLInputElement | null = null;
    private dateToElement: HTMLInputElement | null = null;
    private findButtonElement: HTMLElement | null = null;
    private todayButton: HTMLElement | null = null;
    private buttonElements: NodeListOf<HTMLElement> | null = null;
    private intervalType: string | null = null;
    private incomeChart:Chart | null = null
    private expenseChart:Chart | null = null

    constructor() {
        document.querySelectorAll('.menu-item').forEach(el => {
            el.classList.remove('active');
        })

        this.menuElement = document.getElementById('menu')
        if (this.menuElement) {
            this.menuElement.classList.add('active')
        }

        this.findElements()
        this.intervalType = null
        this.init()
    }

    private findElements(): void {
        this.inputElementDateFrom = document.getElementById('datepickerFrom') as HTMLInputElement;
        this.inputElementDateTo = document.getElementById('datepickerTo') as HTMLInputElement;
        this.dateFromElement = document.getElementById('dateFrom') as HTMLInputElement;
        this.dateToElement = document.getElementById('dateTo') as HTMLInputElement;
        this.findButtonElement = document.getElementById('find')
        this.buttonElements = document.querySelectorAll('nav button')
        this.todayButton = document.getElementById('today')
    }

    private init(): void {
        let todayInterval: ResultDate = CommonUtils.getIntervalInfo('Сегодня')
        if (todayInterval && (todayInterval.dateFrom && todayInterval)) {
            this.getTableByFilter(todayInterval.dateFrom, todayInterval.dateTo).then()
            if (this.todayButton) {
                this.todayButton.classList.add('bg-secondary')
            }
        }

        if (!this.buttonElements) return
        this.buttonElements.forEach(buttonElement => {
            buttonElement.addEventListener('click', (e) => {
                this.buttonElements!.forEach(button => {
                    button.classList.remove('bg-secondary')
                })
                buttonElement.classList.add('bg-secondary')
                if (buttonElement.innerText === 'Все') {
                    this.intervalType = "all"
                } else if (buttonElement.innerText === "Сегодня") {
                    this.intervalType = null
                    if (todayInterval && (todayInterval.dateFrom && todayInterval)) {
                        this.getTableByFilter(todayInterval.dateFrom, todayInterval.dateTo).then()
                        if (this.todayButton) {
                            this.todayButton.classList.add('bg-secondary')
                        }
                    }
                } else if (buttonElement.innerText === 'Неделя') {
                    this.intervalType = "week"
                } else if (buttonElement.innerText === 'Месяц') {
                    this.intervalType = "month"
                } else if (buttonElement.innerText === 'Год') {
                    this.intervalType = "year"
                } else if (buttonElement.innerText === 'Интервал') {
                    this.intervalType = null;
                    if (this.findButtonElement) {
                        this.findButtonElement.addEventListener('click', (e) => {
                            if (this.intervalValidation()) {
                                if (this.dateFromElement && this.dateToElement && this.inputElementDateFrom && this.inputElementDateTo) {
                                    this.dateFromElement.innerText = this.inputElementDateFrom.value
                                    this.dateToElement.innerText = this.inputElementDateTo.value

                                    this.getTableByFilter(this.dateFromElement.innerText, this.dateToElement.innerText).then()
                                }
                            }
                        })
                    }

                }
                this.getTableByFilter(null, null).then()
            })
        })
    }

    private intervalValidation():boolean {
        let isValid:boolean = true
        if(this.inputElementDateFrom && this.findButtonElement) {
            if (this.inputElementDateFrom.value) {
                this.inputElementDateFrom.classList.remove('is-invalid')
                this.findButtonElement.setAttribute('data-dismiss', 'modal');
                isValid = true
            } else {
                this.inputElementDateFrom.classList.add('is-invalid')
                this.findButtonElement.removeAttribute('data-dismiss');
                isValid = false
            }
        }

        if(this.inputElementDateTo && this.findButtonElement){
            if (this.inputElementDateTo.value) {
                this.inputElementDateTo.classList.remove('is-invalid')
                this.findButtonElement.setAttribute('data-dismiss', 'modal');
                isValid = true
            } else {
                this.inputElementDateTo.classList.add('is-invalid')
                isValid = false
                this.findButtonElement.removeAttribute('data-dismiss');
            }
        }

        return isValid
    }

    async getTableByFilter(dateFrom:string | null, dateTo: string | null) {
        let url = '/operations'
        if (this.intervalType) {
            url = url + '?period=' + this.intervalType
        }
        if (dateFrom && dateTo && !this.intervalType) {

            url = url + '?period=interval&dateFrom=' + dateFrom + '&dateTo=' + dateTo
        }
        let result: DefaultResponseType |  TableResponseType[] = await HttpRequests.request(url)
        if((result as DefaultResponseType).error !== undefined) {
            throw new Error((result as DefaultResponseType).message)
        }
        this.showElements((result as TableResponseType[]))

    }

    showElements(data: TableResponseType[]) {
        if (data) {
            const expenses:TableResponseType[] = []
            const income:TableResponseType[] = []
            data.forEach((item) => {
                if (item.type === 'expense') {
                    expenses.push(item)
                } else if (item.type === 'income') {
                    income.push(item)
                }
            })

            if (expenses && expenses.length > 0 || income && income.length > 0) {
                this.chart(expenses, income)
            }
        }
    }


    chart(expensesData: TableResponseType[], incomeData: TableResponseType[]) {
        $(document).ready(() => {
            console.log("DOM is ready, initializing charts...");

            const incomeElement = $('#chartIncome').get(0) as HTMLCanvasElement;
            if (!incomeElement) {
                console.error("Ошибка: элемент #chartIncome не найден");
                return;
            }

            const incomeCanvas = incomeElement.getContext('2d');
            if (!incomeCanvas) {
                console.error('Ошибка: не удалось получить контекст для #chartIncome');
                return;
            }

            const dataIncome: DataChartType = {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: ['#dc3545', '#fd7e14', '#20c997', '#0d6efd', '#ffc107', '#ff6384', '#ffcd56', '#9966ff', '#dc3545', '#fd7e14', '#20c997', '#0d6efd', '#ffc107', '#ff6384', '#ffcd56', '#9966ff'],
                }]
            };

            incomeData.forEach((item) => {
                if (item.category) {
                    const indexOf = dataIncome.labels.indexOf(item.category);
                    if (indexOf !== -1) {
                        dataIncome.datasets[0].data[indexOf] += item.amount;
                    } else {
                        dataIncome.labels.push(item.category);
                        dataIncome.datasets[0].data.push(item.amount);
                    }
                }
            });

            // Destroy existing income chart if it exists
            if (this.incomeChart) {
                this.incomeChart.destroy();
                this.incomeChart = null; // Clean up the reference
            }

            // Initialize new income chart
            this.incomeChart = new Chart(incomeCanvas, {
                type: 'pie',
                data: dataIncome,
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                },
            });

            // Expense Chart
            const expenseElement = $('#chartExpenses').get(0) as HTMLCanvasElement;
            if (!expenseElement) {
                console.error("Ошибка: элемент #chartExpenses не найден");
                return;
            }

            const expenseCanvas = expenseElement.getContext('2d');
            if (!expenseCanvas) {
                console.error("Ошибка: не удалось получить контекст для #chartExpenses");
                return;
            }

            // Process expense data
            const dataExpenses: DataChartType = {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: ['#dc3545', '#fd7e14', '#20c997', '#0d6efd', '#ffc107', '#ff6384', '#ffcd56', '#9966ff', '#dc3545', '#fd7e14', '#20c997', '#0d6efd', '#ffc107', '#ff6384', '#ffcd56', '#9966ff'],
                }]
            };

            expensesData.forEach((item) => {
                if (item.category) {
                    const indexOf = dataExpenses.labels.indexOf(item.category);
                    if (indexOf !== -1) {
                        dataExpenses.datasets[0].data[indexOf] += item.amount;
                    } else {
                        dataExpenses.labels.push(item.category);
                        dataExpenses.datasets[0].data.push(item.amount);
                    }
                }
            });

            // Destroy existing expense chart if it exists
            if (this.expenseChart) {
                this.expenseChart.destroy();
                this.expenseChart = null; // Clean up the reference
            }

            // Initialize new expense chart
            this.expenseChart = new Chart(expenseCanvas, {
                type: 'pie',
                data: dataExpenses,
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                },
            });
        });
    }
}