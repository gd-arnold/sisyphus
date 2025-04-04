import classNames from "classnames";
import { Tooltip } from "react-tooltip";

function HabitLog({ index, day, last365Days }) {
    return (
        <div
        key={day}
        data-tooltip-id={day}
        data-tooltip-content={day}
        className={classNames(
            "size-4 cursor-pointer rounded-sm border-[1px] border-transparent",
            {
                "bg-gray hover:bg-light-gray": true,
                "bg-green-500": false,
                "border-white": index === last365Days.length - 1, // current day
            },
        )}
        >
        <Tooltip id={day} />
        </div>
    );
}

export default HabitLog;
