import React, { useState } from "react";
import useUser from "../../state/user";
import Button from "../Button";
import Modal from "./Modal";

function CreateModal({ onClose }) {
    const { addHabit } = useUser();

    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (name === "") {
            setError("Invalid name");
            return;
        }

        try {
            await addHabit(name);
            setError("");
        } catch (e) {
            setError("Something went wrong. Please try again later.");
        }

        setName("");
        onClose && onClose();
    };

    return (
        <Modal className="min-h-fit gap-4" onClose={onClose}>
            <div className="text-center text-xl font-bold sm:px-8">
                Create a habit
            </div>

            <div className="m-auto flex flex-col gap-2">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="rounded-md border-none bg-black px-2 py-1 outline-none"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit();
                        }
                    }}
                    autoFocus
                />

                {error && (
                    <div className="bg-red-500 bg-opacity-20 text-red-300 p-2 rounded text-sm">
                        {error}
                    </div>
                )}


                <Button onClick={handleSubmit}>
                    Create!
                </Button>
            </div>
        </Modal>
    );

}

export default CreateModal;
