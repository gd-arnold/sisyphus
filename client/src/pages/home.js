import { useEffect, useState } from "react";
import Page from "../components/Page";
import useUser from "../state/user";

function Home() {
    const { user, habits, fetchHabits, addHabit } = useUser();
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchHabits().catch((e) => console.error(e));
    }, [fetchHabits])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addHabit(name);
        } catch (e) {
            setError("Something went wrong. Please try again later.");
        }

        setName("");
    };

    return (
        <Page>
            <div>Hello {user.username}</div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
        {error && (
            <div>
            {error}
            </div>
        )}
                <button onClick={handleSubmit}>Add habit</button>
            </form>

            <h3> Habits </h3>
            {habits?.map(habit => (
                <div key={habit.id}>
                    {habit.title}
                </div>
            ))}
        </Page>
    );
}

export default Home;
