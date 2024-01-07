import { CycleUnit } from "@prisma/client";

const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

const beginningOfDayPassingMilliseconds = (milliseconds: number) => {
  const date = new Date(milliseconds);
  console.log({ date });
  const monthDay = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const beginningOfDay = new Date(year, month, monthDay);
  console.log({ beginningOfDay });
  return beginningOfDay;
};

const beginningOfWeekPassingMilliseconds = (milliseconds: number) => {
  const dayBeginning = beginningOfDayPassingMilliseconds(milliseconds);
  const dayOfWeek = dayBeginning.getDay();
  const dayZero = dayBeginning.getDate() - dayOfWeek * oneDayInMilliseconds;
  return new Date(dayZero);
};

const beginningOfMonthPassingMilliseconds = (milliseconds: number) => {
  const dayBeginning = beginningOfDayPassingMilliseconds(milliseconds);
  const month = dayBeginning.getMonth();
  const year = dayBeginning.getFullYear();
  return new Date(year, month);
};

export const getInitialDataBasedOnCycle = ({
  cyclesPeriodicity,
  cycleUnit,
  cycleAmount,
  baseDate = new Date(),
}: {
  cyclesPeriodicity: number;
  cycleUnit: CycleUnit;
  cycleAmount: number;
  baseDate?: Date;
}) => {
  if (cycleAmount < 0) throw new Error("cycleAmount must be greater than 0");
  const today = baseDate.getTime();
  switch (cycleUnit) {
    case "DAY":
      const days = cyclesPeriodicity * cycleAmount;
      const dayToGoBackInMilliseconds = today - days * oneDayInMilliseconds;
      return beginningOfDayPassingMilliseconds(dayToGoBackInMilliseconds);

    // case "WEEK":
    //   const weeks = cyclesPeriodicity * cycleAmount;
    //   const weekToGoBackInMilliseconds =
    //     today - weeks * oneDayInMilliseconds;
    //   return beginningOfWeekPassingMilliseconds(weekToGoBackInMilliseconds);

    // case "MONTH":
    //   const months = cyclesPeriodicity * cycleAmount;
    //   const monthsInAYearToGoBack = months % 12;
    //   const yearsToGoBack = Math.floor(months / 12);
  }
  return new Date(2024 - 12 - 12);
};
