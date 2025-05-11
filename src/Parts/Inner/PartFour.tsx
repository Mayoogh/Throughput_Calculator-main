import { useSelector } from "react-redux";
import type { RootState } from "../../store";

interface PartFourProps {
  sortationTime: string | null;
}

export const PartFour = ({ sortationTime }: PartFourProps) => {
  const test = useSelector((state: RootState) => state.test);

  return (
    <div className="px-3 py-2">
      <h2 className="text-sm font-bold">
        Bot Runtime: Session #{test.sessionId}
      </h2>
      {test.botID.map((bot, index) => (
        <div key={index} className="inner">
          <h3>
            {bot.name}: {sortationTime}
          </h3>
        </div>
      ))}
    </div>
  );
};
