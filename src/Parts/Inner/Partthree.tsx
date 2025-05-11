import { useEffect, useState } from "react";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";

export const PartThree = () => {
  const test = useSelector((state: RootState) => state.test);
  const [infeedThroughput, setInfeedThroughput] = useState<number | null>(0);
  const [botThroughput, setBotThroughput] = useState<{
    includingErrors: number | null;
    excludingErrors: number | null;
  }>({ includingErrors: null, excludingErrors: null });

  useEffect(() => {
    if (Number(test.interval) > 0) {
      setInfeedThroughput(Number((3600 / Number(test.interval)).toFixed(2)));
    } else {
      setInfeedThroughput(null);
    }
  }, [test.interval]);

  useEffect(() => {
    const startTime = test.startTime ? new Date(`1970-01-01T${test.startTime}:00`) : null;
    const stopTime = test.stopTime ? new Date(`1970-01-01T${test.stopTime}:00`) : null;

    if (startTime && stopTime && stopTime > startTime) {
      const totalTimeInHours = (stopTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
      const totalParcelsProcessed = Number(test.sortedPackets) || 0;
      const errors =
        (Number(test.wrongSorted) || 0) +
        (Number(test.outOfBin) || 0) +
        (Number(test.rejections) || 0);

      const includingErrors = totalParcelsProcessed / totalTimeInHours;
      const excludingErrors = (totalParcelsProcessed - errors) / totalTimeInHours;

      setBotThroughput({
        includingErrors: Number(includingErrors.toFixed(2)),
        excludingErrors: Number(excludingErrors.toFixed(2)),
      });
    } else {
      setBotThroughput({ includingErrors: null, excludingErrors: null });
    }
  }, [test.startTime, test.stopTime, test.sortedPackets, test.wrongSorted, test.outOfBin, test.rejections]);

  return (
    <div className="px-3 py-2 flex flex-col gap-4">
      <div className="set-1">
        <h2 className="text-sm font-bold">Bot Throughput:</h2>
        {botThroughput.includingErrors !== null && botThroughput.excludingErrors !== null ? (
          <>
            <h3>Including Errors: {botThroughput.includingErrors} pph</h3>
            <h3>Excluding Errors: {botThroughput.excludingErrors} pph</h3>
          </>
        ) : (
          <h3>Insufficient data to calculate throughput.</h3>
        )}
      </div>
      <div className="set-2">
        <h2 className="text-sm font-bold">Infeed Throughput:</h2>
        {infeedThroughput !== null && <h3>{infeedThroughput} packets/hour</h3>}
      </div>
    </div>
  );
};
