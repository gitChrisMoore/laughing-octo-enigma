import Navbar from "./components/Navbar/Navbar";
import Router from "./router";

function App() {
  return (
    <>
      <Navbar />
      <main className="relative py-4 px-4 sm:p-6 md:py-10 md:px-8">
        <div className="max-w-xl mx-auto">
          <Router />
        </div>
      </main>
    </>
  );
}

export default App;
