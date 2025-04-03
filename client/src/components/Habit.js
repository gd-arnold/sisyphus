import { useEffect, useMemo, useRef, useState } from "react";
import { getLast365Days, groupDaysByMonth } from "../utils/utils";
import classNames from "classnames";

function Habit({ id, name, HabitLog }) {
    const last365Days = useMemo(getLast365Days, []);
    const months = useMemo(() => groupDaysByMonth(last365Days), [last365Days]);

    const ref = useRef(null);
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
                className="invisible absolute max-w-full text-xl font-bold"
                style={{ whiteSpace: "pre" }}
              >
                {name}
              </span>
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
                  {month.split(", ")[0]}
                </span>
              );
            })}
          </div>
          <div className="grid w-fit grid-flow-col grid-rows-7 gap-1 overflow-auto">
            {last365Days.map((day, index) => (
              <div
                className={classNames(
                  "size-4 cursor-pointer rounded-sm border-[1px] border-transparent",
                  {
                    "bg-gray hover:bg-light-gray": true,
                    "bg-green-500": false,
                    "border-white": index === last365Days.length - 1,
                  },
                )}
              >
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Habit;
