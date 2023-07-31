import Navbar from "./components/Navbar/Navbar";
import Router from "./router";

function App() {
  return (
    <>
      <Navbar />
      <main className="relative bg-slate-200">
        <div className="max-w-3xl mx-auto">
          <Router />
        </div>
      </main>
    </>
  );
}

export default App;
