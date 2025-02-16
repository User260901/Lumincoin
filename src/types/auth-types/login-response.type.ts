export type LoginResponseType = {
    tokens: {
        accessToken: string,
        refreshToken: string,
    },
    user: UserInfo

}

export type UserInfo = {
    name: string,
    lastName: string,
    id: number,
}