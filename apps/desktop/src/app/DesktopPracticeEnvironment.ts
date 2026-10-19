import { isPersonalPracticeDesktopVersion } from "../updates/updateChannels.ts";
import type { JoinPath } from "./DesktopStatePaths.ts";

export const PRACTICE_T3_HOME_DIRECTORY_NAME = ".t3-practice";

/**
 * Practice builds may log into the practice's EHR, so their isolation cannot
 * depend on a launcher script: opened from the Dock or Finder, they still get
 * their own T3 home, never the shared `~/.t3`, with telemetry, trace export and
 * update checks off. An explicit `T3CODE_HOME` is kept, so tests can point a
 * practice build elsewhere. Returns whether the build is a practice build.
 */
export function applyPracticeEnvironmentDefaults(input: {
  readonly env: NodeJS.ProcessEnv;
  readonly appVersion: string;
  readonly homeDirectory: string;
  readonly joinPath: JoinPath;
}): boolean {
  if (!isPersonalPracticeDesktopVersion(input.appVersion)) return false;
  if (!input.env.T3CODE_HOME?.trim()) {
    input.env.T3CODE_HOME = input.joinPath(input.homeDirectory, PRACTICE_T3_HOME_DIRECTORY_NAME);
  }
  input.env.T3CODE_TELEMETRY_ENABLED = "false";
  input.env.T3CODE_OTEL_SDK_DISABLED = "1";
  input.env.T3CODE_DISABLE_AUTO_UPDATE = "1";
  return true;
}
