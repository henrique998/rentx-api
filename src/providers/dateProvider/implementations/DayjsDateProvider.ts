import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

import { IDateProvider } from "../IDateProvider"

class DayjsDateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date)
        const start_date_utc = this.convertToUTC(start_date)

        return dayjs(end_date_utc).diff(start_date_utc, "hours")
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date)
        const start_date_utc = this.convertToUTC(start_date)

        return dayjs(end_date_utc).diff(start_date_utc, "days")
    }

    convertToUTC(date?: Date): string {
        return dayjs(date).utc().local().format()
    }

    currentDate(): Date {
        return dayjs().toDate()
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hours").toDate()
    }

    compareIfBefore(start_date: Date, end_date: Date): Boolean {
        return dayjs(start_date).isBefore(end_date)
    }
}

export { DayjsDateProvider }