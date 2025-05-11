import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import axios from "axios";
import {
  updateBotCount,
  updateBotStartTime,
  updateBotStopTime,
  updateCodeId,
  updateReleaseID,
  updateSessionId,
  updateTargetedTest,
  updateTesterName,
  updateTestType,
} from "../Functions/functions";
import { setTestData } from "../../Slice/testSlice";

export const Inputs = () => {
  const dispatch = useDispatch();
  const test = useSelector((state: RootState) => state.test);
  const botID = test.botID;
  const [botCount, setBotCount] = useState<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  const submitToSheet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    // Clear existing Battery fields
    const existingBatteryFields = form.querySelectorAll('[name^="Battery-"]');
    existingBatteryFields.forEach((field) => field.remove());
    console.log(test);

    // Set static fields (your existing field map)
    const fieldMap: Record<string, string> = {
      Date: test.date ?? "",
      "Test Type": test.testType === 1 ? "Reliability" : "Developer",
      "Release ID": test.releaseID ?? "",
      "Code ID": test.codeID ?? "",
      "Targeted Test": test.targetedTest ?? "",
      Session: test.sessionId ?? "",
      Tester: test.testerName ?? "",
      "Bot IDs": botID.map((bot) => bot.name).join(", "),
      "No. of Bots": String(botID.length),
      "Start Time": test.startTime ?? "",
      "End Time": test.stopTime ?? "",
      "Infeeding Interval": test.interval ?? "",
      "Packets Available": test.availablePackets ?? "",
      "Packets Sorted": test.sortedPackets ?? "",
      "Wrong Sorted": test.wrongSorted ?? "",
      "Out of Bin": test.outOfBin ?? "",
      Rejections: test.rejections ?? "",
      Remarks: test.remarks ?? "",
      Duration: test.Duration ?? "",
    };

    Object.entries(fieldMap).forEach(([name, value]) => {
      let input = form.elements.namedItem(name) as HTMLInputElement;

      if (!input) {
        // If input does not exist, create it as hidden
        input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        form.appendChild(input);
      }

      input.value = value;
    });

    // Dynamically add battery fields for each bot (e.g., Battery-B2-Initial, Battery-B2-Final, etc.)
    botID.forEach((bot) => {
      const startBattery = bot.startBattery;
      const stopBattery = bot.stopBattery;

      // Ensure both battery values are available before adding to the form
      if (startBattery !== undefined && stopBattery !== undefined) {
        const createHidden = (name: string, value: string) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          input.value = value;
          form.appendChild(input);
        };

        // Create hidden inputs for each bot's battery data
        createHidden(`Battery-${bot.name}-Initial`, startBattery.toString());
        createHidden(`Battery-${bot.name}-Final`, stopBattery.toString());
      }
    });

    // Simulate form submission with a promise
    // Prepare FormData and send with axios
    const formData = new FormData(form);
    const actionURL = form.action;

    try {
      const response = await axios.post(actionURL, formData);
      console.log(response.data);

      if (response.data.result === "success") {
        console.log("Form submitted successfully!");
      } else {
        console.log("Submission failed.");
      }
    } catch (error) {
      console.error("Axios form error:", error);
      console.log("An error occurred while submitting the form.");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={submitToSheet}
      method="POST"
      action="https://script.google.com/macros/s/AKfycbyv_aMsFxYcDHprJlThjkitnIpY5Wk_aWHeGtWy8R7_sLuaUQNSE0cAPsmr4bK6OCz1OQ/exec"
      className="flex items-center justify-center flex-col w-fit-content w-full text-xs sm:text-md p-1"
    >
      <div className="input-part w-full md:p-2 flex gap-3 items-start flex-col [&>div]:flex [&>div]:items-center [&>div]:justify-start [&>div]:h-10 [&>div]:md:w-full">
        <div className="row ">
          <label
            htmlFor="date"
            className="text-right pr-5 sm:sm:w-[170px] w-[130px]"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            className="md:max-w-[150px] w-auto p-1 shadow-md rounded-md px-3"
            onChange={(e) => dispatch(setTestData({ date: e.target.value }))}
          />
        </div>
        <div className="row">
          <label
            htmlFor="test-type"
            className="text-right pr-5 sm:w-[170px] w-[130px]"
          >
            Test-Type:
          </label>
          <div className="test-type-options gap-5 flex items-center md:w-full w-[100px] flex-col md:flex-row">
            <label className="ml-2 inline-flex items-center gap-2">
              <input
                type="radio"
                name="test-type"
                id="reliability-test"
                onChange={() => updateTestType({ value: 1, dispatch })}
              />
              <span>Reliability</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="test-type"
                id="developer-test"
                onChange={() => updateTestType({ value: 2, dispatch })}
              />
              <span>Developer</span>
            </label>
          </div>
        </div>
        {test.testType === 1 && (
          <div className="row">
            <label
              className="text-right pr-5 min-sm:w-[170px] w-[130px]"
              htmlFor="Release-ID"
            >
              Release-ID:
            </label>
            <input
              type="text"
              id="Release-ID"
              placeholder="Enter release ID"
              className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] rounded-md"
              onChange={(e) =>
                updateReleaseID({ value: e.target.value, dispatch })
              }
            />
          </div>
        )}
        {test.testType === 2 && (
          <>
            <div className="row">
              <label
                className="text-right pr-5 min-sm:w-[170px] w-[130px]"
                htmlFor="codeID"
              >
                Code-ID:
              </label>
              <input
                type="text"
                id="codeID"
                placeholder="Enter code ID"
                className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] rounded-md"
                onChange={(e) =>
                  updateCodeId({ value: e.target.value, dispatch })
                }
              />
            </div>
            <div className="row">
              <label
                className="text-right pr-5 min-sm:w-[170px] w-[130px]"
                htmlFor="targetedTest"
              >
                Targeted-Test:
              </label>
              <input
                type="text"
                id="targetedTest"
                placeholder="Enter targeted test"
                className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] rounded-md"
                onChange={(e) =>
                  updateTargetedTest({ value: e.target.value, dispatch })
                }
              />
            </div>
          </>
        )}
        <div className="row">
          <label
            className="text-right pr-5 min-sm:w-[170px] w-[130px]"
            htmlFor="Session-ID"
          >
            Session #:
          </label>
          <input
            type="text"
            id="Session-ID"
            placeholder="Enter session ID"
            className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] rounded-md"
            onChange={(e) =>
              updateSessionId({ value: e.target.value, dispatch })
            }
          />
        </div>
        <div className="row">
          <label
            className="text-right pr-5 min-sm:w-[170px] w-[130px]"
            htmlFor="testerName"
          >
            Tester Name:
          </label>
          <input
            type="text"
            id="testerName"
            placeholder="Name of Tester"
            className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] rounded-md"
            onChange={(e) =>
              updateTesterName({ value: e.target.value, dispatch })
            }
          />
        </div>
        <div className="row">
          <label
            className="text-right pr-5 min-sm:w-[170px] w-[130px]"
            htmlFor="Bots"
          >
            Bots:
          </label>
          <div className="flex  gap-2 md:w-full w-[150px] flex-wrap">
            <label className="ml-2 inline-flex items-center gap-2 ">
              <input
                type="checkbox"
                className="bot-checkbox"
                value="B2"
                onChange={() =>
                  updateBotCount({
                    setBotCount,
                    botCount,
                    dispatch,
                    botName: "B2",
                    botID,
                  })
                }
              />
              <span>B2</span>
            </label>
            <label className="ml-2 inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="bot-checkbox"
                value="B3"
                onChange={() =>
                  updateBotCount({
                    setBotCount,
                    botCount,
                    dispatch,
                    botName: "B3",
                    botID,
                  })
                }
              />
              B3
            </label>
            <label className="ml-2 inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="bot-checkbox"
                value="B4"
                onChange={() =>
                  updateBotCount({
                    setBotCount,
                    botCount,
                    dispatch,
                    botName: "B4",
                    botID,
                  })
                }
              />
              B4
            </label>
            <label className="ml-2 inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="bot-checkbox"
                value="B5"
                onChange={() =>
                  updateBotCount({
                    setBotCount,
                    botCount,
                    dispatch,
                    botName: "B5",
                    botID,
                  })
                }
              />
              B5
            </label>
            <label className="ml-2 inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="bot-checkbox"
                value="B6"
                onChange={() =>
                  updateBotCount({
                    setBotCount,
                    botCount,
                    dispatch,
                    botName: "B6",
                    botID,
                  })
                }
              />
              B6
            </label>
          </div>
        </div>
        {test.botID.map((bot, index) => (
          <div
            key={index}
            className="flex-row flex row items-center justify-center gap-2"
            id={`row${bot.name}`}
          >
            <div className="flex flex-row items-center justify-center">
              <label
                className="md:text-right text-left pr-2 md:pr-5 sm:w-[170px] w-[120px]"
                htmlFor="start"
              >
                {bot.name} Initial Battery (V)
              </label>
              <input
                type="number"
                step={0.01}
                id={`${bot.name}start`}
                className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[50px]  rounded-md"
                onChange={(e) =>
                  updateBotStartTime({
                    bots: botID,
                    botName: bot.name,
                    value: e.target.value,
                    dispatch,
                  })
                }
                onBlur={(e) =>
                  updateBotStartTime({
                    bots: botID,
                    botName: bot.name,
                    value: e.target.value,
                    dispatch,
                  })
                }
              />
            </div>
            <div className="flex flex-row items-center justify-center">
              <label
                className="md:text-right text-left pr-2 md:pr-5 sm:w-[170px] w-[120px]"
                htmlFor="start"
              >
                {bot.name} Final Battery (V)
              </label>
              <input
                type="number"
                step={0.01}
                id={`${bot.name}stop`}
                className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[50px]  rounded-md"
                onChange={(e) =>
                  updateBotStopTime({
                    bots: botID,
                    botName: bot.name,
                    value: e.target.value,
                    dispatch,
                  })
                }
                onBlur={(e) =>
                  updateBotStopTime({
                    bots: botID,
                    botName: bot.name,
                    value: e.target.value,
                    dispatch,
                  })
                }
              />
            </div>
          </div>
        ))}

        <div className="row">
          <label
            className="text-right pr-5 min-sm:w-[170px] w-[130px]"
            htmlFor="start"
          >
            Sortation Start Time
          </label>
          <input
            type="time"
            id="start"
            className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] check-time rounded-md"
            onChange={(e) =>
              dispatch(setTestData({ startTime: e.target.value }))
            }
          />
        </div>

        <div className="row">
          <label
            className="text-right pr-5 min-sm:w-[170px] w-[130px]"
            htmlFor="end"
          >
            Sortation Stop Time
          </label>
          <input
            type="time"
            id="end"
            className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] rounded-md check-time"
            onChange={(e) =>
              dispatch(setTestData({ stopTime: e.target.value }))
            }
          />
        </div>

        <div className="row">
          <label
            className="text-right pr-5 min-sm:w-[170px] w-[130px]"
            htmlFor="infeed_interval"
          >
            Infeeding Interval(s)
          </label>
          <input
            type="number"
            id="infeed_interval"
            placeholder="Seconds between each infeed"
            className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] rounded-md"
            onChange={(e) =>
              dispatch(setTestData({ interval: e.target.value }))
            }
          />
        </div>
        <div className="row">
          <label
            className="text-right pr-5 min-sm:w-[170px] w-[130px]"
            htmlFor="packetsAvailable"
          >
            Packets Available:
          </label>
          <input
            type="text"
            id="packetsAvailable"
            placeholder="No. of Packets Available"
            className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] rounded-md"
            onChange={(e) =>
              dispatch(setTestData({ availablePackets: e.target.value }))
            }
          />
        </div>
        <div className="row">
          <label
            className="text-right pr-5 min-sm:w-[170px] w-[130px]"
            htmlFor="packetsSorted"
          >
            Packets Sorted:
          </label>
          <input
            type="text"
            id="packetsSorted"
            placeholder="No. of packest sorted"
            className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] rounded-md"
            onChange={(e) =>
              dispatch(setTestData({ sortedPackets: e.target.value }))
            }
          />
        </div>
        <div className="row">
          <label
            className="text-right pr-5 min-sm:w-[170px] w-[130px]"
            htmlFor="wrongSorted"
          >
            Wrong Sorted:
          </label>
          <input
            type="text"
            id="wrongSorted"
            placeholder="Wrong sorted Count"
            className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] rounded-md"
            onChange={(e) =>
              dispatch(setTestData({ wrongSorted: e.target.value }))
            }
          />
        </div>
        <div className="row">
          <label
            className="text-right pr-5 min-sm:w-[170px] w-[130px]"
            htmlFor="outOfBin"
          >
            Out of Bin:
          </label>
          <input
            type="text"
            id="outOfBin"
            placeholder="no. out of bin"
            className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] rounded-md"
            onChange={(e) =>
              dispatch(setTestData({ outOfBin: e.target.value }))
            }
          />
        </div>
        <div className="row">
          <label
            className="text-right pr-5 min-sm:w-[170px] w-[130px]"
            htmlFor="packetsSorted"
          >
            Rejections:
          </label>
          <input
            type="text"
            id="Session-ID"
            placeholder="Rejected Count"
            className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] rounded-md"
            onChange={(e) =>
              dispatch(setTestData({ rejections: e.target.value }))
            }
          />
        </div>
        <div className="row !h-20">
          <label
            className="text-right pr-5 min-sm:w-[170px] w-[130px]"
            htmlFor="remarks"
          >
            Remarks:
          </label>
          <textarea
            id="remarks"
            placeholder="No. of packest sorted"
            className="px-4 py-1 items-center bg-[#ECEBE4] md:w-full w-[150px] rounded-md"
            onChange={(e) => dispatch(setTestData({ remarks: e.target.value }))}
          />
        </div>
      </div>
      <div className="button-container w-full justify-end flex items-center">
        <button
          type="submit"
          className="px-3 py-1 rounded-md shadow-md bg-lime-500 text-white cursor-pointer hover:bg-lime-600 transition-all duration-300 ease-in-out"
        >
          Submit to Google Sheet
        </button>
      </div>
    </form>
  );
};
