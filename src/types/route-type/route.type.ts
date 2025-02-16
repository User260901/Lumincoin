export type RouteType = {
    route: string,
    title:string,
    filePathName?: string,
    styles?: string[],
    scripts?: string[],
    load(): void,

}