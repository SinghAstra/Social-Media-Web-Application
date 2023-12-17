import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { useState } from "react";


function App() {
  const [currentId,setCurrentId] = useState(null);

  // useEffect(()=>{
  //   console.log("currentId is ",currentId);
  // },[currentId])

  return (
    <div className="">
      {/* lg:bg-gray-800  sm:bg-green-500 md:bg-orange-500 xl:bg-red-500 */}
      <nav className="flex p-4">
        <h2 className="text-2xl tracking-wide font-medium text-white">Social Media Application</h2>
      </nav>
      <div className=" flex flex-col lg:flex-row">
        <div className=" w-full  lg:w-4/6">
          <Posts setCurrentId={setCurrentId}/>
        </div>
        <div className=" w-full lg:w-2/6 flex justify-center pt-3">
          <Form currentId={currentId} setCurrentId={setCurrentId}/>
        </div>
      </div>
    </div>
  );
}

export default App;
