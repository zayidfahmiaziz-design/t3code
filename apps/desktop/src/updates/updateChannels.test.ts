import { describe, expect, it } from "vite-plus/test";

import {
  isNightlyDesktopVersion,
  isPersonalDevDesktopVersion,
  resolveDefaultDesktopUpdateChannel,
} from "./updateChannels.ts";

describe("updateChannels", () => {
  it("keeps preview builds branded as nightly but on the latest update channel", () => {
    expect(isNightlyDesktopVersion("0.0.41-preview.20260911.7")).toBe(true);
    expect(resolveDefaultDesktopUpdateChannel("0.0.41-preview.20260911.7")).toBe("latest");
    expect(resolveDefaultDesktopUpdateChannel("0.0.41-nightly.20260911.7")).toBe("nightly");
  });

  it("brands personal dev builds as Dev, not nightly", () => {
    expect(isPersonalDevDesktopVersion("0.0.45-dev.202610081200")).toBe(true);
    expect(isNightlyDesktopVersion("0.0.45-dev.202610081200")).toBe(false);
    expect(isPersonalDevDesktopVersion("0.0.45-nightly.20261008.1")).toBe(false);
  });

  it("only matches the first prerelease identifier", () => {
    expect(isNightlyDesktopVersion("1.2.3-foo-preview.20260911.1")).toBe(false);
    expect(isNightlyDesktopVersion("1.2.3")).toBe(false);
  });
});
