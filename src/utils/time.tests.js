import { readableElapsedTimeUTC } from "./time";

describe("readableElapsedTimeUTC", () => {
  beforeAll(() => {
    Date.now = () => {};
  });

  const expected = "7 hours ago";
  readableElapsedTimeUTC();
});
