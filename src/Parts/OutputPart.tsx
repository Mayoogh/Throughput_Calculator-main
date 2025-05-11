import { Outputs } from "./Inner/Outputs";

export const OutputPart = () => {
  return (
    <div className="input-part overflow-x-hidden  !w-screen bg-[#DADDD8] p-2 rounded-md shadow-md flex flex-col items-center justify-start text-[#1C1C1C] h-auto">
      <h2 className="uppercase font-bold text-xl">Performance Summary</h2>
      <div className="all-inputs w-full p-2 flex items-center justify-center">
        <Outputs />
      </div>
    </div>
  );
};
