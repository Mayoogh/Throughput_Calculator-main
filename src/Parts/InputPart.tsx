import { Inputs } from "./Inner/Inputs";

export const InputPart = () => {
  return (
    <div className="input-part overflow-x-hidden py-2 !w-screen bg-[#DADDD8] md:p-2 rounded-md shadow-md flex flex-col items-center justify-start text-[#1C1C1C] h-auto">
      <h2 className="font-bold uppercase text-xl">Input Part</h2>
      <div className="all-inputs w-fit-content p-2 flex items-center justify-center">
        <Inputs />
      </div>
    </div>
  );
};
