import Header from "./Header";

function Page({ children }) {
  return (
    <div className="flex flex-col gap-8 p-4">
      <Header />

      <main className="m-auto mt-4 flex w-full flex-col items-center gap-8">
        {children}
      </main>
    </div>
  );
}

export default Page;
