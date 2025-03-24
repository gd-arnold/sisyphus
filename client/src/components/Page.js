import Header from "./Header";

function Page({ children }) {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
        </div>
    );
}

export default Page;
