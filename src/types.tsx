export interface Bot {
  name: string;
  startBattery: string;
  stopBattery: string;
  discharge: string;
}

export interface TestProps {
  date: string;
  testType: number;
  codeID: string;
  releaseID: string;
  targetedTest: string;
  sessionId: string;
  testerName: string;
  remarks?: string;
  botID: Bot[];
  numberOfBots: number;
  startTime: string;
  stopTime: string;
  interval: string;
  availablePackets: string;
  sortedPackets: string;
  wrongSorted: string;
  outOfBin: string;
  rejections: string;
  Duration: string;
}
