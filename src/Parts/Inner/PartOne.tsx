interface PartOneProps {
  testType: number;
  sessionId: string;
  releaseId: string | null;
  codeId: string | null;
  targetedTest: string | null;
  testerName: string;
}

export const PartOne = ({
  testType,
  sessionId,
  releaseId,
  codeId,
  targetedTest,
  testerName,
}: PartOneProps) => {
  return (
    <div className="px-3 py-2">
      <h2 className="text-sm font-bold">Test Type</h2>
      <h3>
        {testType === 0
          ? ""
          : testType === 1
          ? "Reliability Testing"
          : "Developer Testing"}
      </h3>
      {testType === 1 ? (
        releaseId && <h3>Release ID: {releaseId}</h3>
      ) : (
        <>
          {codeId && <h3>Code ID: {codeId}</h3>}
          {targetedTest && <h3>Targeted Test: {targetedTest}</h3>}
        </>
      )}
      {sessionId && <h3>Session #: {sessionId}</h3>}
      {testerName && <h3>Tester: {testerName}</h3>}
    </div>
  );
};
