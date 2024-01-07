import { expect, test } from "@playwright/test";

test.describe("describe title", () => {
  test("test title", ({}) => {
    expect(1 + 1).toEqual(2);
  });

  test("test title 2", ({}) => {
    expect(1 + 1).toEqual(3);
  });
});
