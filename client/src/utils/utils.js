
export const getLast365Days = () => {
    const days = [];
    const fillers = [];
    const today = new Date();

    for (let i = 0; i < 365; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);

        const isoDay = day.toISOString().split('T')[0];

        days.push(isoDay);
    }

    // filter entries to start the week on sunday
    const firstDay = new Date(today);
    firstDay.setDate(today.getDate() - 364);
    const firstDayIndex = firstDay.getDay();

    for (let i = 0; i < firstDayIndex; i++) {
        fillers.push("FILLER");
    }

    return [...days, ...fillers];
};

export const groupDaysByMonth = (last365Days) => {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthGroups = {};
    let currentMonth = "";
    let currentIndex = 0;

    last365Days.reverse().forEach((day, index) => {
        const month = day === "FILLER" ? "" : `${day.split("-")[0]} ${monthNames[Number(day.split("-")[1]) - 1]}`;

        if (currentMonth !== month) {
            monthGroups[month] = index - currentIndex;
            currentMonth = month;
            currentIndex = index;
        }
    });

    return monthGroups;
};
