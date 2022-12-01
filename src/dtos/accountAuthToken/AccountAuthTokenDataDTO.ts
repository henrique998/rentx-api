interface AccountAuthTokenDataDTO {
    id: string
    refresh_token: string
    account_id: string
    expires_date: Date
    created_at: Date
}

export { AccountAuthTokenDataDTO }