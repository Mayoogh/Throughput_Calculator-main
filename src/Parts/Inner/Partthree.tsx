import { useEffect, useState } from "react";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";

export const PartThree = () => {
  const test = useSelector((state: RootState) => state.test);
  const [infeedThroughput, setInfeedThroughput] = useState<number | null>(0);

  useEffect(() => {
    if (Number(test.interval) > 0) {
      setInfeedThroughput(Number((3600 / Number(test.interval)).toFixed(3)));
    } else {
      setInfeedThroughput(null);
    }
  }, [test.interval]);

  return (
    <div className="px-3 py-2 flex flex-col gap-4">
      <div className="set-1">
        <h2 className="text-sm font-bold">Bot Throughput:</h2>
        <h3>{test.remarks}</h3>
      </div>
      <div className="set-2">
        <h2 className="text-sm font-bold">Infeed Throughput:</h2>
        {infeedThroughput !== null && <h3>{infeedThroughput} packets/hour</h3>}
      </div>
    </div>
  );
};
