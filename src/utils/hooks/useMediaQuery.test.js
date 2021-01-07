import { act, renderHook } from "@testing-library/react-hooks";
import useMediaQuery from "./useMediaQuery";

describe("useMediaQuery Custom Hook", () => {
  const mockMatchMedia = window.matchMedia;
  let clickHandler;

  beforeAll(() => {
    window.matchMedia = () => ({
      addListener: (handler) => {
        clickHandler = handler;
      },
      removeListener: () => {},
      matches: false,
    });
  });

  afterAll(() => {
    window.matchMedia = mockMatchMedia;
  });

  it("the result is true when the media query matches", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 60rem)"));
    expect(result.current).toBe(false);

    act(() => {
      clickHandler({ matches: true });
    });

    expect(result.current).toBe(true);
  });
});
