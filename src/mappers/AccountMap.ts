import { AccountDataDTO } from "../dtos/account/AccountDataDTO";

class AccountMap {
    static toDto({ id, name, email, driver_license, avatar }: AccountDataDTO) {
        return {
            id,
            name,
            email,
            driver_license,
            avatar
        }
    }
}

export { AccountMap }