import {ResultDate} from "../types/date-type/date.type";

export class CommonUtils {
    static getIntervalInfo(date:string):ResultDate {
        let currentDate = new Date()

        const result:ResultDate = {
            dateFrom: null,
            dateTo: currentDate.toString()
        }

        switch (date) {
            case 'Сегодня':
                result.dateFrom = (new Date(currentDate)).toString();
                break;
            case 'Неделя':
                let weekStart = new Date(currentDate);
                weekStart.setDate(currentDate.getDate() - 7);
                result.dateFrom = weekStart.toString();
                break;
            case 'Месяц':
                let monthStart = new Date(currentDate);
                monthStart.setMonth(monthStart.getMonth() - 1);
                result.dateFrom = monthStart.toString();
                break
            case 'Год':
                let yearStart = new Date(currentDate);
                yearStart.setFullYear(yearStart.getFullYear() - 1);
                result.dateFrom = yearStart.toString();
                break
        }


        if(result.dateFrom && result.dateTo) {
            let dateFrom:string | Date = (new Date(result.dateFrom))
            dateFrom = dateFrom.getFullYear() + "-" +  (dateFrom.getMonth() + 1)  + "-" + dateFrom.getDate();


            let dateTo:string | Date = new Date (result.dateTo)
            dateTo = dateTo.getFullYear() + "-" +  (dateTo.getMonth() + 1)  + "-" + dateTo.getDate();


            result.dateFrom = dateFrom.toString()
            result.dateTo = dateTo.toString()
        }

        return result
    }


}