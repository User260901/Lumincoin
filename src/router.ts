import {FileUtils} from "./utils/file-utils";
import {AuthUtils} from "./utils/auth-utils";
import {Logout} from "./components/auth/logout";
import {Main} from "./components/dashboard/main";
import {Income} from "./components/income/income";
import {EditIncome} from "./components/income/edit-income";
import {CreateCategoryIncome} from "./components/income/create-category-income";
import {Expenses} from "./components/expenses/expenses";
import {EditExpenses} from "./components/expenses/edit-expenses";
import {CreateCategoryExpense} from "./components/expenses/create-category-expense";
import {Table} from "./components/table/table";
import {IncomeDelete} from "./components/income/income-delete";
import {ExpenseDelete} from "./components/expenses/expense-delete";
import {CreateIncomeOrExpense} from "./components/table/create-income-or-expense";
import {EditIncomeOrExpenses} from "./components/table/edit-income-or-expenses";
import {HttpRequests} from "./utils/http-requests";
import {RouteType} from "./types/route-type/route.type";


export class Router {
    readonly tokenKey: string | null;
    readonly contentPageElement: HTMLElement | null;
    readonly titlePageElement: HTMLElement | null;
    readonly mainStyleElement: HTMLElement | null;
    readonly userNameElement: HTMLElement | null;
    readonly userLastNameElement: HTMLElement | null;
    readonly balanceElement: HTMLElement | null;
    private routes: RouteType[]

    constructor() {
        this.tokenKey = AuthUtils.getInfo(AuthUtils.accessTokenKey)

        this.contentPageElement = document.getElementById('content');
        this.titlePageElement = document.getElementById('title');
        this.mainStyleElement = document.getElementById('adminlte-style');
        this.userNameElement = document.getElementById('userName');
        this.userLastNameElement = document.getElementById('userLastName');
        this.balanceElement = document.getElementById('balance')


        this.init()

        this.routes = [
            {
                route: "#/",
                title: "Lumincoin",
                filePathName: "/templates/pages/dashboard/main.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/Chart.min.js', '/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {
                    new Main()
                }
            },
            {
                route: "#/logout",
                title: "Lumincoin",
                load: () => {
                    new Logout()
                }
            },
            {
                route: "#/income",
                title: "Lumincoin | Доходы",
                filePathName: "/templates/pages/income/income.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {
                    new Income()
                }
            },
            {
                route: "#/income/delete",
                title: "Lumincoin | Редактирование дохода/расхода",
                load: () => {
                    new IncomeDelete()
                }
            },
            {
                route: "#/create-category-income",
                title: "Lumincoin | Создание категории доходов",
                filePathName: "/templates/pages/income/create-category-income.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {
                    new CreateCategoryIncome()
                }
            },
            {
                route: "#/edit-income",
                title: "Lumincoin | Редактирование категории доходов",
                filePathName: "/templates/pages/income/edit-income.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {
                    new EditIncome()
                }

            },
            {
                route: "#/expenses",
                title: "Lumincoin | Расходы",
                filePathName: "/templates/pages/expenses/expenses.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {
                    new Expenses()
                }
            },
            {
                route: "#/expenses/delete",
                title: "Lumincoin | Редактирование дохода/расхода",
                load: () => {
                    new ExpenseDelete()
                }
            },
            {
                route: "#/create-category-expenses",
                title: "Lumincoin | Создание категории расходов",
                filePathName: "/templates/pages/expenses/create-category-expenses.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {
                    new CreateCategoryExpense()
                }
            },
            {
                route: "#/edit-expenses",
                title: "Lumincoin | Редактирование категории расходов",
                filePathName: "/templates/pages/expenses/edit-expenses.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {
                    new EditExpenses()
                }
            },
            {
                route: "#/table",
                title: "Lumincoin | Доходы и Расходы",
                filePathName: "templates/pages/table/table.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {
                    new Table()
                }
            },
            {
                route: "#/create-income-or-expenses",
                title: "Lumincoin | Создание дохода/расхода",
                filePathName: "/templates/pages/table/create.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {
                    new CreateIncomeOrExpense()
                }
            },
            {
                route: "#/edit-income-or-expenses",
                title: "Lumincoin | Редактирование дохода/расхода",
                filePathName: "/templates/pages/table/edit-income-or-expenses.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {
                    new EditIncomeOrExpenses()
                }
            },

        ]
    }

    init() {
        window.addEventListener("DOMContentLoaded", this.activeRoute.bind(this));
        window.addEventListener("popstate", this.activeRoute.bind(this));
    }

    async activeRoute() {
        if (!this.tokenKey) {
            location.href = '/login.html'
        }

        const userInfoJson: string | null = AuthUtils.getInfo(AuthUtils.userInfo)
        if (userInfoJson) {
            let userInfo = JSON.parse(userInfoJson)
            if (userInfo) {
                if (this.userNameElement && this.userLastNameElement) {
                    this.userNameElement.innerText = userInfo.name
                    this.userLastNameElement.innerText = userInfo.lastName
                }
            }
        }
        const response: { balance: number } = await HttpRequests.request('/balance')
        if (response.balance !== undefined) {
            if (this.balanceElement) {
                this.balanceElement.innerText = response.balance.toString()
            }
        }

        FileUtils.removeScripts()
        FileUtils.removeStyles()

        const url: string = (window.location.hash).split('?')[0]
        const result: RouteType | undefined = this.routes.find((route) => route.route === url);
        if (result) {
            if (result.title) {
                if (this.titlePageElement) {
                    this.titlePageElement.innerHTML = result.title
                }
            }
            if (result.styles) {
                result.styles.forEach(style => {
                    if (this.mainStyleElement) {
                        FileUtils.fileStyleUpload('css' + style, this.mainStyleElement)
                    }
                })
            }
            if (result.scripts) {
                for (const script of result.scripts)
                    await FileUtils.fileScriptUpload('js' + script)
            }

            if (result.filePathName) {
                if (this.contentPageElement) {
                    this.contentPageElement.innerHTML = await fetch(result.filePathName).then(res => res.text());
                }
            }
            if (result.load && typeof result.load === 'function') {
                result.load()
            }


        } else {
            location.hash = '#/'
            await this.activeRoute()
        }

    }
}