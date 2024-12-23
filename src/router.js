import {FileUtils} from "./utils/file-utils";
import {AuthUtils} from "./utils/auth-utils";
import {Logout} from "./components/logout";
import {Main} from "./components/main";

export class Router {
    constructor() {
        this.tokenKye = AuthUtils.getInfo(AuthUtils.accessTokenKey)
        if(!this.tokenKye) {
            location.href = '/login.html'
        }

        this.contentPageElement = document.getElementById('content');
        this.titlePageElement = document.getElementById('title');
        this.mainStyleElement = document.getElementById('adminlte-style');

        this.userNameElement = document.getElementById('userName');
        this.userLastNameElement = document.getElementById('userLastName');

        this.init()

        this.routes = [
            {
                route: "#/",
                title: "Lumincoin",
                filePathName: "/templates/main.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/Chart.min.js', '/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: ()=> {
                    new Main()
                }

            },
            {
                route: "#/table",
                title: "Lumincoin | Доходы и Расходы",
                filePathName: "templates/income-and-expenses.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js']
            },
            {
                route: "#/expenses",
                title: "Lumincoin | Расходы",
                filePathName: "/templates/expenses.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js']
            },
            {
                route: "#/income",
                title: "Lumincoin | Доходы",
                filePathName: "/templates/income.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js']
            },
            {
                route: "#/logout",
                title: "Lumincoin",
                load: () => {
                    new Logout()
                }
            },
            {
                route: "#/create-category-income",
                title: "Lumincoin | Создание категории доходов",
                filePathName: "/templates/create-category-income.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {
                }
            },
            {
                route: "#/edit-income",
                title: "Lumincoin | Редактирование категории доходов",
                filePathName: "/templates/edit-income.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {

                }
            },
            {
                route: "#/create-category-expenses",
                title: "Lumincoin | Создание категории расходов",
                filePathName: "/templates/create-category-expenses.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {

                }
            },
            {
                route: "#/edit-expenses",
                title: "Lumincoin | Редактирование категории расходов",
                filePathName: "/templates/edit-expenses.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {

                }
            },
            {
                route: "#/create-income-or-expenses",
                title: "Lumincoin | Создание дохода/расхода",
                filePathName: "/templates/create.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {

                }
            },
            {
                route: "#/edit-income-or-expenses",
                title: "Lumincoin | Редактирование дохода/расхода",
                filePathName: "/templates/edit-income-or-expenses.html",
                styles: ['/OverlayScrollbars.min.css'],
                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],
                load: () => {

                }
            },

        ]
    }

    init() {
        window.addEventListener("DOMContentLoaded", this.activeRoute.bind(this));
        window.addEventListener("popstate", this.activeRoute.bind(this));
    }

    async activeRoute() {
        const userInfo = JSON.parse(AuthUtils.getInfo(AuthUtils.userInfo))
        if(userInfo) {
            this.userNameElement.innerText = userInfo.name
            this.userLastNameElement.innerText = userInfo.lastName
        }

        FileUtils.removeScripts()
        FileUtils.removeStyles()

        const url = window.location.hash;
        const result = this.routes.find((route) => route.route === url);

        if (result) {
            if(result.title) {
                this.titlePageElement.innerHTML = result.title
            }
            if (result.styles) {
                result.styles.forEach(style => {
                    FileUtils.fileStyleUpload('css' + style, this.mainStyleElement)
                })
            }
            if (result.scripts) {
                for (const script of result.scripts)
                    await FileUtils.fileScriptUpload('js' + script)
            }

            this.contentPageElement.innerHTML = await fetch(result.filePathName).then(res => res.text());

            if (result.load && typeof result.load === 'function') {
                result.load()
            }

        } else {
            location.hash = '#/'
            await this.activeRoute()
        }

    }
}