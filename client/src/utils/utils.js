export const getLast365Days = () => {
  const days = [];
  const fillers = [];
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);

    const dayName = day.toLocaleString("en-US", { weekday: "short" });
    const monthName = day.toLocaleString("en-US", { month: "short" });

    days.push(
      `${dayName}, ${day.getDate()} ${monthName}, ${day.getFullYear()}`,
    );
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
    const monthGroups = {};
    let currentMonth = "";
    let currentIndex = 0;

    last365Days.reverse().forEach((day, index) => {
        const month = day.split(" ").slice(2, 4).join(" ");
        if (currentMonth !== month) {
            monthGroups[month] = index - currentIndex;
            currentMonth = month;
            currentIndex = index;
        }
    });

    return monthGroups;
};
