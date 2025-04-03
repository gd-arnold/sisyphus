import { useEffect, useState } from "react";
import Page from "../components/Page";
import useUser from "../state/user";
import { Plus } from "lucide-react";
import CreateModal from "../components/modals/CreateModal";
import Habit from "../components/Habit";

function Home() {
    const { habits, fetchHabits } = useUser();
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchHabits().catch((e) => console.error(e));
    }, [fetchHabits])

    return (
        <>
            {showCreateModal && (
                <CreateModal onClose={() => setShowCreateModal(false)} />
            )}

            <Page>
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-6xl font-bold">Sisyphus</h1>
                    <h2 className="text-light-gray m-3">Track your habits every day</h2>
                </div>

                <div className="flex w-full max-w-full flex-col gap-2 md:max-w-[750px]">
                    {habits?.map((habit) => <Habit key={habit.id} {...habit} />)}

                    <button
                        className="flex h-24 w-full items-center justify-center gap-2 rounded-lg bg-gray text-xl font-bold duration-100 hover:bg-opacity-80"
                        onClick={() => setShowCreateModal(true)}
                    >
                        <Plus className="size-8" /> Create
                    </button>
                </div>
            </Page>
        </>
    );
}

export default Home;
