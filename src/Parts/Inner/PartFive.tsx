import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export const PartFive = () => {
  const test = useSelector((state: RootState) => state.test);

  return (
    <div className="px-3 py-2">
      <h2 className="text-sm font-bold">Remarks:</h2>
      <h3>{test.remarks}</h3>
    </div>
  );
};
