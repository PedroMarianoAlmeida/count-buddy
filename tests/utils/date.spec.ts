import { expect, test } from "@playwright/test";
import { getInitialDataBasedOnCycle } from "@/utils/date";

test.describe("cycle DAY", () => {
  test.describe("one day cycle", () => {
    test("current period", () => {
      const res = getInitialDataBasedOnCycle({
        cycleAmount: 0,
        cycleUnit: "DAY",
        cyclesPeriodicity: 1,
        baseDate: new Date("2024-01-06T23:00:00"),
      });
      expect(res).toEqual(new Date("2024-01-06T00:00:00"));
    });

    test("yesterday", () => {
      const res = getInitialDataBasedOnCycle({
        cycleAmount: 1,
        cycleUnit: "DAY",
        cyclesPeriodicity: 1,
        baseDate: new Date("2024-01-06T23:00:00"),
      });
      expect(res).toEqual(new Date("2024-01-05T00:00:00"));
    });

    test("10 days ago", () => {
      const res = getInitialDataBasedOnCycle({
        cycleAmount: 10,
        cycleUnit: "DAY",
        cyclesPeriodicity: 1,
        baseDate: new Date("2024-01-15T23:00:00"),
      });
      expect(res).toEqual(new Date("2024-01-05T00:00:00"));
    });
  });
  test.describe("two days cycle", () => {
    test("current period", () => {
      const res = getInitialDataBasedOnCycle({
        cycleAmount: 0,
        cycleUnit: "DAY",
        cyclesPeriodicity: 2,
        baseDate: new Date("2024-01-06T23:00:00"),
      });
      expect(res).toEqual(new Date("2024-01-05T00:00:00"));
    });

    test("3 cycles ago", () => {
      const res = getInitialDataBasedOnCycle({
        cycleAmount: 2,
        cycleUnit: "DAY",
        cyclesPeriodicity: 1,
        baseDate: new Date("2024-01-10T23:00:00"),
      });
      expect(res).toEqual(new Date("2024-01-04T00:00:00"));
    });
  });
});
