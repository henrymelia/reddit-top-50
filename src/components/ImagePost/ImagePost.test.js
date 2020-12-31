import React from "react";
import { render } from "@testing-library/react";

import ImagePost from "./ImagePost";

describe("ImagePost Component", () => {
  it("renders", () => {
    const mockAltText = "mock alt";
    const mockImageUrl = "https://mockeddomain.com/mocked-image.jpg";

    const { getByAltText } = render(
      <ImagePost alt={mockAltText} imageUrl={mockImageUrl} />
    );

    expect(getByAltText(mockAltText).src).toBe(mockImageUrl);
  });
});
