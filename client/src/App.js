import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";


function App() {

  return (
    <div className="bg-pink-500">
      <nav className="lg:bg-gray-800 flex p-4 sm:bg-green-500 md:bg-orange-500 xl:bg-red-500">
        <h2 className="text-2xl tracking-wide font-medium shadow-2xl shadow-black  font-mono text-white">Social Media Application</h2>
      </nav>
      <div className="bg-yellow-500 flex flex-col lg:flex-row">
        <div className="bg-purple-500 w-full h-screen lg:w-4/6">
          <Posts/>
        </div>
        <div className="bg-cyan-500 w-full h-screen lg:w-2/6 flex justify-center pt-3">
          <Form/>
        </div>
      </div>
    </div>
  );
}

export default App;
