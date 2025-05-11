import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TestProps } from "../types";

const initialState: TestProps = {
  date: "",
  testType: 0,
  codeID: "",
  releaseID: "",
  targetedTest: "",
  sessionId: "",
  testerName: "",
  remarks: "",
  botID: [],
  numberOfBots: 0,
  startTime: "",
  stopTime: "",
  interval: "",
  availablePackets: "",
  sortedPackets: "",
  wrongSorted: "",
  outOfBin: "",
  rejections: "",
  Duration: "",
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setTestData(state, action: PayloadAction<Partial<TestProps>>) {
      console.log("called");
      return { ...state, ...action.payload };
    },
    resetTestData: () => initialState,
  },
});

export const { setTestData, resetTestData } = testSlice.actions;
export default testSlice.reducer;
