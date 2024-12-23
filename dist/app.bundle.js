/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ \"./src/router.js\");\n/* harmony import */ var _utils_auth_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/auth-utils */ \"./src/utils/auth-utils.js\");\n\r\n\r\n\r\nclass App {\r\n    constructor() {\r\n        let tokenKey = _utils_auth_utils__WEBPACK_IMPORTED_MODULE_1__.AuthUtils.getInfo(_utils_auth_utils__WEBPACK_IMPORTED_MODULE_1__.AuthUtils.accessTokenKey)\r\n\r\n        if(tokenKey) {\r\n            new _router__WEBPACK_IMPORTED_MODULE_0__.Router()\r\n        }else {\r\n            location.href = '../login.html'\r\n        }\r\n    }\r\n}\r\n\r\n(new App())\n\n//# sourceURL=webpack://frontend/./src/app.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n/* harmony import */ var _utils_file_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/file-utils */ \"./src/utils/file-utils.js\");\n/* harmony import */ var _utils_auth_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/auth-utils */ \"./src/utils/auth-utils.js\");\n\r\n\r\n\r\nclass Router {\r\n    constructor() {\r\n\r\n\r\n        this.contentPageElement = document.getElementById('content');\r\n        this.titlePageElement = document.getElementById('title');\r\n        this.mainStyleElement = document.getElementById('main-style');\r\n\r\n        this.init()\r\n\r\n        this.routes = [\r\n            {\r\n                route: \"#/\",\r\n                title: \"Lumincoin\",\r\n                filePathName: \"/templates/main.html\",\r\n                styles: ['/OverlayScrollbars.min.css', '/adminlte.min.css'],\r\n                scripts: ['/Chart.min.js', '/jquery.overlayScrollbars.min.js', '/adminlte.min.js'],\r\n\r\n            },\r\n            {\r\n                route: \"#/table\",\r\n                title: \"Lumincoin | Доходы и Расходы\",\r\n                filePathName: \"templates/income-and-expenses.html\",\r\n                styles: ['/OverlayScrollbars.min.css', '/adminlte.min.css'],\r\n                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js']\r\n            },\r\n            {\r\n                route: \"#/expenses\",\r\n                title: \"Lumincoin | Расходы\",\r\n                filePathName: \"/templates/expenses.html\",\r\n                styles: ['/OverlayScrollbars.min.css', '/adminlte.min.css'],\r\n                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js']\r\n            },\r\n            {\r\n                route: \"#/income\",\r\n                title: \"Lumincoin | Доходы\",\r\n                filePathName: \"/templates/income.html\",\r\n                styles: ['/OverlayScrollbars.min.css', '/adminlte.min.css'],\r\n                scripts: ['/jquery.overlayScrollbars.min.js', '/adminlte.min.js']\r\n            },\r\n            {\r\n                route: \"#/logout\",\r\n                title: \"Lumincoin\",\r\n                load: () => {\r\n\r\n                }\r\n            },\r\n        ]\r\n    }\r\n\r\n    init() {\r\n        window.addEventListener(\"DOMContentLoaded\", this.activeRoute.bind(this));\r\n        window.addEventListener(\"popstate\", this.activeRoute.bind(this));\r\n    }\r\n\r\n    async activeRoute() {\r\n\r\n        _utils_file_utils__WEBPACK_IMPORTED_MODULE_0__.FileUtils.removeScripts()\r\n        _utils_file_utils__WEBPACK_IMPORTED_MODULE_0__.FileUtils.removeStyles()\r\n\r\n        const url = window.location.hash;\r\n        const result = this.routes.find((route) => route.route === url);\r\n\r\n        if (result) {\r\n\r\n            if(result.title) {\r\n                this.titlePageElement.innerHTML = result.title\r\n            }\r\n\r\n            if (result.styles) {\r\n                result.styles.forEach(style => {\r\n                    _utils_file_utils__WEBPACK_IMPORTED_MODULE_0__.FileUtils.fileStyleUpload('css' + style, this.mainStyleElement)\r\n                })\r\n            }\r\n            if (result.scripts) {\r\n                for (const script of result.scripts)\r\n                    await _utils_file_utils__WEBPACK_IMPORTED_MODULE_0__.FileUtils.fileScriptUpload('js' + script)\r\n            }\r\n\r\n            this.contentPageElement.innerHTML = await fetch(result.filePathName).then(res => res.text());\r\n\r\n            if (result.load && typeof result.load === 'function') {\r\n                result.load()\r\n            }\r\n\r\n\r\n\r\n        } else {\r\n            location.hash = '#/'\r\n            await this.activeRoute()\r\n        }\r\n\r\n    }\r\n}\n\n//# sourceURL=webpack://frontend/./src/router.js?");

/***/ }),

/***/ "./src/utils/auth-utils.js":
/*!*********************************!*\
  !*** ./src/utils/auth-utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthUtils: () => (/* binding */ AuthUtils)\n/* harmony export */ });\nclass AuthUtils {\r\n\r\n    static accessTokenKey = 'token'\r\n    static refreshTokenKey = 'refreshToken'\r\n    static userInfo = 'userInfo'\r\n\r\n    static setTokens(token, refreshToken, userInfo = null) {\r\n        if (refreshToken && token) {\r\n            localStorage.setItem(this.accessTokenKey, token);\r\n            localStorage.setItem(this.refreshTokenKey, refreshToken);\r\n        }\r\n        if(userInfo) {\r\n            localStorage.setItem('userInfo', JSON.stringify(userInfo))\r\n        }\r\n    }\r\n\r\n    static removeInfo() {\r\n        localStorage.removeItem(this.accessTokenKey);\r\n        localStorage.removeItem(this.refreshTokenKey);\r\n        localStorage.removeitem(this.userInfo);\r\n    }\r\n\r\n    static getInfo(info) {\r\n        if(info) {\r\n            return localStorage.getItem(info);\r\n        }else {\r\n            return null;\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://frontend/./src/utils/auth-utils.js?");

/***/ }),

/***/ "./src/utils/file-utils.js":
/*!*********************************!*\
  !*** ./src/utils/file-utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FileUtils: () => (/* binding */ FileUtils)\n/* harmony export */ });\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../router */ \"./src/router.js\");\n\r\n\r\nclass FileUtils {\r\n    static fileScriptUpload(src) {\r\n        return new Promise((resolve, reject) => {\r\n            const script = document.createElement(\"script\");\r\n            script.src = src\r\n            script.onload = () => resolve('Script Loaded' + src)\r\n            script.onerror = () => reject(new Error('Script load error for :' + src))\r\n            document.body.appendChild(script)\r\n        })\r\n    }\r\n\r\n    static removeScripts() {\r\n        const scriptsInBody = document.querySelectorAll('body script');\r\n        scriptsInBody.forEach(script => {\r\n            if (script.id !== 'jquery' && script.id !== \"bootstrapJs\") {\r\n                script.remove()\r\n            }\r\n        })\r\n    }\r\n\r\n\r\n    static fileStyleUpload(src, insertBeforeElement) {\r\n        let linkElement = document.createElement('link');\r\n        linkElement.rel = 'stylesheet';\r\n        linkElement.type = 'text/css';\r\n        linkElement.href = src\r\n        document.head.insertBefore(linkElement, insertBeforeElement);\r\n    }\r\n\r\n    static removeStyles() {\r\n        const allLinks = document.querySelectorAll('head link')\r\n        allLinks.forEach(link => {\r\n            if (link.id !== 'main-style' && link.id !== 'main-adaptive' && link.id !== 'adminlte-style') {\r\n                    link.remove()\r\n            }\r\n        })\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://frontend/./src/utils/file-utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;