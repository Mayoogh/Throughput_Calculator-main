import { useEffect } from "react";
import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setTestData } from "../../Slice/testSlice";

interface PartTwoProps {
  sortationTime: string | null;
  setSortationTime: (value: string | null) => void;
  setSortationTimeInNumber: (value: number | null) => void;
}

export const PartTwo = ({
  sortationTime,
  setSortationTime,
  setSortationTimeInNumber,
}: PartTwoProps) => {
  const test = useSelector((state: RootState) => state.test);
  const dispatch = useDispatch();

  useEffect(() => {
    if (test.startTime && test.stopTime) {
      const timeContainers = document.querySelectorAll(".check-time");
      if (test.startTime > test.stopTime) {
        timeContainers?.forEach((container) => {
          (container as HTMLElement).style.border = "2px solid red";
        });
      } else {
        timeContainers?.forEach((container) => {
          (container as HTMLElement).style.border = "none";
        });
      }

      const startTime = new Date(`1970-01-01T${test.startTime}`);
      const stopTime = new Date(`1970-01-01T${test.stopTime}`);
      const timeDifference = stopTime.getTime() - startTime.getTime();
      const hours = (timeDifference / (1000 * 60 * 60)).toFixed(2);
      const minutes = Math.round(timeDifference / (1000 * 60));
      setSortationTime(`${hours} hours (${minutes} mins)`);
      setSortationTimeInNumber(Number(minutes));
      dispatch(setTestData({ Duration: minutes.toString() }));
    }
  }, [test.startTime, test.stopTime]);

  return (
    <div className="px-3 py-2">
      <h2 className="text-sm font-bold">Sortation Time:</h2>
      <h3>{sortationTime}</h3>
    </div>
  );
};
