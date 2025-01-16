
export class FileUtils {
    static fileScriptUpload(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src
            script.onload = () => resolve('Script Loaded' + src)
            script.onerror = () => reject(new Error('Script load error for :' + src))
            document.body.appendChild(script)
        })
    }

    static removeScripts() {
        const scriptsInBody = document.querySelectorAll('body script');
        scriptsInBody.forEach(script => {
            if (script.id !== 'jquery' && script.id !== "bootstrapJs" && script.id !== 'ui') {
                script.remove()
            }
        })
    }

    static fileStyleUpload(src, insertBeforeElement) {
        let linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.type = 'text/css';
        linkElement.href = src
        document.head.insertBefore(linkElement, insertBeforeElement);
    }

    static removeStyles() {
        const allLinks = document.querySelectorAll('head link')
        allLinks.forEach(link => {
            if (link.id !== 'main-style' && link.id !== 'main-adaptive' && link.id !== 'adminlte-style') {
                    link.remove()
            }
        })
    }

}