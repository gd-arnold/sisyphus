import { useNavigate } from "react-router-dom";
import Page from "../components/Page";
import Button from "../components/Button";
import { Calendar, Target, TrendingUp } from "lucide-react";

function Welcome() {
    const navigate = useNavigate();

    return (
        <Page>
            <div className="flex flex-col gap-12 text-center max-w-4xl mx-auto">
                {/* Hero Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-6xl font-bold">Sisyphus</h1>
                        <h2 className="text-2xl text-light-gray">
                            Simple habit tracking for everyday progress
                        </h2>
                        <p className="text-lg text-light-gray max-w-2xl mx-auto">
                            Like Sisyphus pushing his boulder, building habits is about 
                            consistency and persistence. Track your daily progress and 
                            watch your habits grow stronger over time.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
                        <Button
                            className="px-8 py-3 text-lg font-bold"
                            onClick={() => navigate("/register")}
                        >
                            Get Started
                        </Button>
                        <Button
                            color="black"
                            className="px-8 py-3 text-lg font-bold text-white border border-gray hover:bg-gray"
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-dark-gray">
                        <div className="p-3 rounded-full bg-gray">
                            <Calendar className="size-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Daily Tracking</h3>
                        <p className="text-light-gray text-center">
                            Mark your habits complete each day with a simple click. 
                            Build your streak one day at a time.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-dark-gray">
                        <div className="p-3 rounded-full bg-gray">
                            <Target className="size-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Visual Progress</h3>
                        <p className="text-light-gray text-center">
                            See your year at a glance with a GitHub-style 
                            contribution grid.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-dark-gray">
                        <div className="p-3 rounded-full bg-gray">
                            <TrendingUp className="size-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Stay Motivated</h3>
                        <p className="text-light-gray text-center">
                            Watch your consistency improve over time. Small daily 
                            actions lead to long-term results
                        </p>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default Welcome;
