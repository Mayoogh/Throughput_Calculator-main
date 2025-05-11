import { setTestData } from "../../Slice/testSlice";
import type { AppDispatch } from "../../store";
import type { Bot } from "../../types";

interface updateBotCountProps {
  dispatch: AppDispatch;
  botCount: number;
  setBotCount: (value: number) => void;
  botName: string;
  botID: Bot[];
}

export const updateBotCount = ({
  dispatch,
  setBotCount,
  botCount,
  botName,
  botID,
}: updateBotCountProps) => {
  setBotCount(document.querySelectorAll(".bot-checkbox:checked").length);
  dispatch(setTestData({ numberOfBots: botCount }));
  const botExists = botID.some((bot) => bot.name === botName);
  const updatedBotID = botExists
    ? botID.filter((bot) => bot.name !== botName) // remove existing
    : [
        ...botID,
        { name: botName, startBattery: "", stopBattery: "", discharge: "" },
      ]; // add new

  dispatch(setTestData({ botID: updatedBotID }));
};

interface updateTestTypeProps {
  dispatch: AppDispatch;
  value: number;
}

export const updateTestType = ({ value, dispatch }: updateTestTypeProps) => {
  dispatch(setTestData({ testType: value }));
};

interface updateStringProps {
  dispatch: AppDispatch;
  value: string;
}

export const updateReleaseID = ({ value, dispatch }: updateStringProps) => {
  dispatch(setTestData({ releaseID: value }));
};

export const updateCodeId = ({ value, dispatch }: updateStringProps) => {
  dispatch(setTestData({ releaseID: value }));
};

export const updateTargetedTest = ({ value, dispatch }: updateStringProps) => {
  dispatch(setTestData({ targetedTest: value }));
};

export const updateTesterName = ({ value, dispatch }: updateStringProps) => {
  dispatch(setTestData({ testerName: value }));
};
export const updateSessionId = ({ value, dispatch }: updateStringProps) => {
  dispatch(setTestData({ sessionId: value }));
};

interface updateBotTimeProps {
  botName: string;
  value: string;
  dispatch: AppDispatch;
  bots: Bot[];
}

export const updateBotStartTime = ({
  botName,
  value,
  dispatch,
  bots,
}: updateBotTimeProps) => {
  const updatedBots = bots.map((bot) =>
    bot.name === botName ? { ...bot, startBattery: value } : bot
  );

  dispatch(setTestData({ botID: updatedBots }));
};

export const updateBotStopTime = ({
  botName,
  value,
  dispatch,
  bots,
}: updateBotTimeProps) => {
  const updatedBots = bots.map((bot) => {
    if (bot.name === botName) {
      const updatedBot = {
        ...bot,
        stopBattery: value,
      };

      if (updatedBot.startBattery && updatedBot.stopBattery) {
        updatedBot.discharge = (
          Number(updatedBot.startBattery) - Number(updatedBot.stopBattery)
        ).toString();

        const row = document.getElementById(`row${bot.name}`);
        if (row) {
          row.style.border =
            Number(updatedBot.discharge) < 0 ? "2px solid red" : "none";
        }
      }

      return updatedBot; // Return the updated bot object
    }
    return bot; // Return the original bot if no changes
  });

  dispatch(setTestData({ botID: updatedBots }));
};
