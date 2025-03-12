import { cn } from "@/lib/utils";

import { expect, test } from "vitest";

/**
 * Test cn function
 */
test("cn", () => {
  const className = "flex flex-col";

  expect(cn(className, "text-center", "text-red-500", "text-sm")).toBe(
    `${className} text-center text-red-500 text-sm`,
  );

  expect(cn(className, true && "text-center", false && "text-red-500")).toBe(
    `${className} text-center`,
  );
});
