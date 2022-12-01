interface ICreateAccountAuthTokenDTO {
    refresh_token: string
    account_id: string
    expires_date: Date
}

export { ICreateAccountAuthTokenDTO }