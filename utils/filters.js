import dayjs from "dayjs";

export default {
    dateToFormat: (date) => {
        return dayjs(date).format('YYYY年M月D日');
    },
}
