interface RentalDataDTO {
    id: string
    car_id: string
    account_id: string
    expected_return_date: Date
    start_date: Date
    end_date: Date
    total: number
    created_at: Date
    updated_at: Date
}

export { RentalDataDTO }