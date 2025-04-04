import classNames from "classnames";
import { Tooltip } from "react-tooltip";

function HabitLog({ index, day, last365Days, logs }) {
    const isFiller = day === "FILLER";

    const isLogged = (logs, day) => {
        return logs.find(log => log.date.split('T')[0] === day);
    }

    const formatDay = (day) => {
        const date = new Date(day);

        const dayName = date.toLocaleString("en-US", { weekday: "short" });
        const monthName = date.toLocaleString("en-US", { month: "short" });

        return `${dayName}, ${date.getDate()} ${monthName}, ${date.getFullYear()}`;
    }

    return (
        <div
        key={day}
        data-tooltip-id={day}
        data-tooltip-content={formatDay(day)}
        className={classNames(
            "size-4 cursor-pointer rounded-sm border-[1px] border-transparent",
            {
                "bg-gray hover:bg-light-gray": !isLogged(logs, day),
                "bg-green-500": isLogged(logs, day),
                "border-white": index === last365Days.length - 1, // current day
                "opacity-0": isFiller,
            },
        )}
        >
        {!isFiller && <Tooltip id={day} />}
        </div>
    );
}

export default HabitLog;
