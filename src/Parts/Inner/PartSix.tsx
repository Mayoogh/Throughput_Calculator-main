import type { Bot } from "../../types";

interface PartSixProps {
  botID: Bot[];
  sortationTime: number | null;
}

export const PartSix = ({ botID, sortationTime }: PartSixProps) => {
  return (
    <div className="px-3 py-2 text-sm">
      <h3 className="font-bold">Battery Summary:</h3>
      <div className="flex gap-3 items-start justify-start">
        {botID.map((bot, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center justify-center"
          >
            <h3 className="font-bold underline">{bot.name}</h3>
            <h3>Initial Battery: {bot.startBattery} (V)</h3>
            <h3>Final Battery: {bot.stopBattery} (V)</h3>
            <h3>Battery Discharge: {bot.discharge} V</h3>
            {sortationTime && (
              <h3>
                Discharge rate:
                {(
                  (Number(bot.startBattery) - Number(bot.stopBattery)) /
                  sortationTime
                ).toFixed(2)}{" "}
                V/min
              </h3>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
