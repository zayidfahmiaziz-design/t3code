import { describe, expect, it } from "vite-plus/test";

import {
  isNightlyDesktopVersion,
  isPersonalDevDesktopVersion,
  isPersonalPracticeDesktopVersion,
} from "./updateChannels.ts";

describe("personal desktop versions", () => {
  it("brands personal dev builds as Dev, not nightly", () => {
    expect(isPersonalDevDesktopVersion("0.1.8-dev.202611051200")).toBe(true);
    expect(isNightlyDesktopVersion("0.1.8-dev.202611051200")).toBe(false);
    expect(isPersonalDevDesktopVersion("0.1.8-nightly.20261105.4234")).toBe(false);
  });

  it("keeps practice builds apart from dev and nightly builds", () => {
    expect(isPersonalPracticeDesktopVersion("0.1.8-practice.202611051200")).toBe(true);
    expect(isPersonalDevDesktopVersion("0.1.8-practice.202611051200")).toBe(false);
    expect(isNightlyDesktopVersion("0.1.8-practice.202611051200")).toBe(false);
    expect(isPersonalPracticeDesktopVersion("0.1.8-nightly.20261105.4234")).toBe(false);
  });
});
