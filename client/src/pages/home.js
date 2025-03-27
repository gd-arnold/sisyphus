import Page from "../components/Page";
import useUser from "../state/user";

function Home() {
    const { user } = useUser();

    return (
        <Page>
            <div>Hello { user.username }</div>
        </Page>
    );
}

export default Home;
