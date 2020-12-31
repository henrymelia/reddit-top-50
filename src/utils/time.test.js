import { readableElapsedTimeUTC } from "./time";

const mockedNowTime = new Date("21 Jan 1991 13:30:00 GMT").getTime();

describe("readableElapsedTimeUTC", () => {
  beforeAll(() => {
    Date.now = () => mockedNowTime;
  });

  it('returns "just now" when no time elapsed', () => {
    const sinceTime = new Date("21 Jan 1991 13:30:00 GMT").getTime();
    expect(readableElapsedTimeUTC(sinceTime)).toBe("just now");
  });

  it('returns "just now" when less than a minute elapsed', () => {
    const sinceTime = new Date("21 Jan 1991 13:29:01 GMT").getTime();
    expect(readableElapsedTimeUTC(sinceTime)).toBe("just now");
  });

  it('returns "a minute ago" when a minute elapsed', () => {
    const sinceTime = new Date("21 Jan 1991 13:29:00 GMT").getTime();
    expect(readableElapsedTimeUTC(sinceTime)).toBe("a minute ago");
  });

  it('returns "2 minutes ago" when two minutes elapsed', () => {
    const sinceTime = new Date("21 Jan 1991 13:28:00 GMT").getTime();
    expect(readableElapsedTimeUTC(sinceTime)).toBe("2 minutes ago");
  });

  it('returns "5 years ago" when almost 6 years elapsed', () => {
    const sinceTime = new Date("21 Feb 1985 23:00:00 GMT").getTime();
    expect(readableElapsedTimeUTC(sinceTime)).toBe("5 years ago");
  });
});
