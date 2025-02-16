
export class FileUtils {
    public static fileScriptUpload(src:string):Promise<string> {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src
            script.onload = () => resolve('Script Loaded' + src)
            script.onerror = () => reject(new Error('Script load error for : ' + src))
            document.body.appendChild(script)
        })
    }

    public static removeScripts():void {
        const scriptsInBody = document.querySelectorAll('body script') as NodeListOf<HTMLScriptElement>;
        scriptsInBody.forEach(script => {
            if (script.id !== 'jquery' && script.id !== "bootstrapJs" && script.id !== 'ui') {
                script.remove()
            }
        })
    }

    static fileStyleUpload(src:string, insertBeforeElement:HTMLElement) {
        let linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.type = 'text/css';
        linkElement.href = src
        document.head.insertBefore(linkElement, insertBeforeElement);
    }
    
    
    public static removeStyles(): void {
        const allLinks = document.querySelectorAll('head link') as NodeListOf<HTMLLinkElement>;

        allLinks.forEach((link) => {
            if (link.id !== 'main-style' && link.id !== 'main-adaptive' && link.id !== 'adminlte-style') {
                link.remove();
            }
        });
    }

}