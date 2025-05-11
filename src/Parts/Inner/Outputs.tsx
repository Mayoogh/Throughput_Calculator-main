import { useSelector } from "react-redux";
import { PartOne } from "./PartOne";
import type { RootState } from "../../store";
import { PartTwo } from "./PartTwo";
import { PartThree } from "./Partthree";
import { PartFour } from "./PartFour";
import { PartFive } from "./PartFive";
import { PartSix } from "./PartSix";
import { useState } from "react";

export const Outputs = () => {
  const [sortationTime, setSortationTime] = useState<string | null>(null);
  const [sortationTimeinNumber, setSortationTimeInNumber] = useState<
    number | null
  >(null);
  const test = useSelector((state: RootState) => state.test);

  return (
    <div className="p-5 w-full flex flex-col items-center justify-center gap-5 [&>div]:bg-lime-50 [&>div]:rounded-md [&>div]:h-auto [&>div]:min-h-10 [&>div]:w-full [&>div]:flex [&>div]:flex-col">
      <PartOne
        testType={test.testType}
        sessionId={test.sessionId}
        releaseId={test.releaseID}
        codeId={test.codeID}
        targetedTest={test.targetedTest}
        testerName={test.testerName}
      />
      <PartTwo
        sortationTime={sortationTime}
        setSortationTime={setSortationTime}
        setSortationTimeInNumber={setSortationTimeInNumber}
      />
      <PartThree />
      <PartFour sortationTime={sortationTime} />
      <PartFive />
      <PartSix botID={test.botID} sortationTime={sortationTimeinNumber} />
    </div>
  );
};
