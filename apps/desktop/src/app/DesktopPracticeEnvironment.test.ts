import { describe, expect, it } from "vite-plus/test";

import { applyPracticeEnvironmentDefaults } from "./DesktopPracticeEnvironment.ts";

const apply = (env: NodeJS.ProcessEnv, appVersion: string) =>
  applyPracticeEnvironmentDefaults({
    env,
    appVersion,
    homeDirectory: "/Users/someone",
    joinPath: (...segments) => segments.join("/"),
  });

describe("applyPracticeEnvironmentDefaults", () => {
  it("gives a practice build launched without settings its own home and no telemetry", () => {
    const env: NodeJS.ProcessEnv = {};
    expect(apply(env, "0.0.45-practice.202610181800")).toBe(true);
    expect(env).toEqual({
      T3CODE_HOME: "/Users/someone/.t3-practice",
      T3CODE_TELEMETRY_ENABLED: "false",
      T3CODE_OTEL_SDK_DISABLED: "1",
      T3CODE_DISABLE_AUTO_UPDATE: "1",
    });
  });

  it("keeps an explicit home but always turns telemetry off", () => {
    const env: NodeJS.ProcessEnv = {
      T3CODE_HOME: "/tmp/practice-test",
      T3CODE_TELEMETRY_ENABLED: "true",
      T3CODE_OTEL_SDK_DISABLED: "0",
    };
    apply(env, "0.0.45-practice.202610181800");
    expect(env.T3CODE_HOME).toBe("/tmp/practice-test");
    expect(env.T3CODE_TELEMETRY_ENABLED).toBe("false");
    expect(env.T3CODE_OTEL_SDK_DISABLED).toBe("1");
  });

  it("replaces a blank home", () => {
    const env: NodeJS.ProcessEnv = { T3CODE_HOME: "  " };
    apply(env, "0.0.45-practice.202610181800");
    expect(env.T3CODE_HOME).toBe("/Users/someone/.t3-practice");
  });

  it("leaves other builds alone", () => {
    for (const version of ["0.0.45", "0.0.45-dev.202610181800", "0.0.45-nightly.20261008.1"]) {
      const env: NodeJS.ProcessEnv = {};
      expect(apply(env, version)).toBe(false);
      expect(env).toEqual({});
    }
  });
});
