import { useEffect, useMemo, useRef, useState } from "react";
import { getLast365Days, groupDaysByMonth } from "../utils/utils";
import HabitLog from "./HabitLog";

function Habit({ id, title, logs }) {
    const [habitName, setHabitName] = useState(title);

    const last365Days = useMemo(getLast365Days, []);
    const months = useMemo(() => groupDaysByMonth(last365Days), [last365Days]);

    const ref = useRef(null);
    const spanRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (spanRef.current && inputRef.current) {
            const spanWidth = spanRef.current.offsetWidth;
            inputRef.current.style.width = `${spanWidth + 5}px`;
        }
    }, [habitName]);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.scrollLeft = ref.current.scrollWidth;
    }, []);

  return (
    <>
      <div className="group flex flex-col gap-2 rounded-lg bg-dark-gray p-4 md:max-w-[750px]">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-grow items-center gap-2 overflow-hidden">
            <div
              className="flex items-center"
              style={{
                maxWidth: "calc(100% - 7rem)",
              }}
            >
              <span
                ref={spanRef}
                className="invisible absolute max-w-full text-xl font-bold"
                style={{ whiteSpace: "pre" }}
              >
                {habitName || " "}
              </span>

              <input
                ref={inputRef}
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                className="bg-transparent text-xl font-bold outline-none"
                style={{ minWidth: "1ch" }}
                //todo: rename onBlur={rename}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();

                    // todo: rename habit  
                    inputRef.current?.blur();
                  }
                }}
              />

            </div>

          </div>

        </div>

        <div
          className="hide-scrollbar flex flex-col gap-1 overflow-auto"
          ref={ref}
        >
          <div className="flex text-ellipsis">
            {Object.entries(months).map(([month, startIndex]) => {
              const margin = startIndex / 7;

              return (
                <span
                  key={month}
                  style={{
                    marginLeft: `${margin * 13}px`,
                  }}
                >
                  {month.split(" ")[1]}
                </span>
              );
            })}
          </div>
          <div className="grid w-fit grid-flow-col grid-rows-7 gap-1 overflow-auto">
            {last365Days.map((day, index) => (
                <HabitLog key={index} index={index} day={day} logs={logs} last365Days={last365Days} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Habit;
