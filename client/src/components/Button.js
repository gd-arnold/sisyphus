import classNames from "classnames";
import { twMerge } from "tailwind-merge";

function Button({ children, color = "white", className, onClick}) {
    return (
        <button
            className={twMerge(
                classNames(
                    "rounded-md px-4 py-1 font-bold duration-100 hover:bg-opacity-80",
                    {
                        "bg-white text-black": color === "white",
                        "bg-red-500": color === "red",
                    },
                ),
                className,
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
