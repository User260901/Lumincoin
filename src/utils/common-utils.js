export class CommonUtils {
    static getIntervalInfo(date) {
        let currentDate = new Date()
        const result = {
            dateFrom: null,
            dateTo: currentDate
        }

        switch (date) {
            case 'Сегодня':
                result.dateFrom = new Date(currentDate);
                break;
            case 'Неделя':
                let weekStart = new Date(currentDate);
                weekStart.setDate(currentDate.getDate() - 7);
                result.dateFrom = weekStart;
                break;
            case 'Месяц':
                let monthStart = new Date(currentDate);
                monthStart.setMonth(monthStart.getMonth() - 1);
                result.dateFrom = monthStart;
                break
            case 'Год':
                let yearStart = new Date(currentDate);
                yearStart.setFullYear(yearStart.getFullYear() - 1);
                result.dateFrom = yearStart;
                break
        }


        if(result.dateFrom && result.dateTo) {
            let dateFrom = new Date(result.dateFrom)
            dateFrom = dateFrom.getFullYear() + "-" +  (dateFrom.getMonth() + 1)  + "-" + dateFrom.getDate();


            let dateTo = new Date (result.dateTo)
            dateTo = dateTo.getFullYear() + "-" +  (dateTo.getMonth() + 1)  + "-" + dateTo.getDate();


            result.dateFrom = dateFrom
            result.dateTo = dateTo
        }

        return result
    }


}