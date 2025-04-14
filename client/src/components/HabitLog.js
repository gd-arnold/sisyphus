import classNames from "classnames";
import { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { Tooltip } from "react-tooltip";

function HabitLog({ index, day, last365Days, logs, logDay, unlogDay }) {
    const [gotLogged, setGotLogged] = useState(false);

    useEffect(() => {
        if (gotLogged)
            setTimeout(() => setGotLogged(false), 2000);
    }, [gotLogged]);

    const isFiller = day === "FILLER";

    const isLogged = day => {
        return logs.find(log => log.date.split('T')[0] === day);
    }

    const formatDay = day => {
        const date = new Date(day);

        const dayName = date.toLocaleString("en-US", { weekday: "short" });
        const monthName = date.toLocaleString("en-US", { month: "short" });

        return `${dayName}, ${date.getDate()} ${monthName}, ${date.getFullYear()}`;
    }

    const handleClick = day => {
        if (isFiller) return;

        const log = isLogged(day);

        if (log) {
            unlogDay(log.id);
            setGotLogged(false);
        } else {
            logDay(day);
            setGotLogged(true);
        }
    }

    return (
        <div
        key={day}
        data-tooltip-id={day}
        data-tooltip-content={formatDay(day)}
        className={classNames(
            "size-4 cursor-pointer rounded-sm border-[1px] border-transparent",
            {
                "bg-gray hover:bg-light-gray": !isLogged(day),
                "bg-green-500": isLogged(day),
                "border-white": index === last365Days.length - 1, // current day
                "opacity-0": isFiller,
            },
        )}
        onClick={() => handleClick(day)}
        >
        {!isFiller && <Tooltip id={day} />}
        {gotLogged && <ConfettiExplosion particleCount={40} />}
        </div>
    );
}

export default HabitLog;
