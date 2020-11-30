class Helpers {
    getNumberWithOrdinal(n) {
        var s = ["th", "st", "nd", "rd"],
            v = n % 100;
        return (s[(v - 20) % 10] || s[v] || s[0]);
    }

    getFormatedDate(unix) {
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(unix * 1000);
        const month = months[date.getMonth()];
        const day = days[date.getDay()];
        const dayNumber = date.getDate();
        const ordinal = this.getNumberWithOrdinal(dayNumber);
        return `${day}, ${month} ${dayNumber}${ordinal}`;
    }

    getDayName(unix) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(unix * 1000);
        return days[date.getDay()];
    }
}

export default Helpers;