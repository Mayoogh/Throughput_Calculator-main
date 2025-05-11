import { InputPart } from "./Parts/InputPart";
import { OutputPart } from "./Parts/OutputPart";

function App() {
  return (
    <>
      <div className="whole-app min-h-screen !w-screen overflow-x-hidden flex flex-col lg:flex-row md:items-stretch items-center justify-center md:justify-between lg:px-10 py-2 sm:py-10 gap-5 md:gap-10">
        <InputPart />
        <OutputPart />
      </div>
    </>
  );
}

export default App;
