import {
  dayOfYear,
  currentDayOfYear,
} from "https://deno.land/std/datetime/mod.ts";

console.log(
  `March 16th was is the ${
    dayOfYear(new Date("2020-03-16"))
  }th day of the year 2020`,
);
console.log(`Today is the ${currentDayOfYear()}th day of 2020`);
