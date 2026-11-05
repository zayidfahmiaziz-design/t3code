import { isPersonalPracticeDesktopVersion } from "../updates/updateChannels.ts";
import type { JoinPath } from "./DesktopStatePaths.ts";

const PRACTICE_T3_HOME_DIRECTORY_NAME = ".t3-practice";

/**
 * However a practice build is opened, it gets its own T3 home (never `~/.t3`)
 * and no telemetry, trace export or update checks; an explicit `T3CODE_HOME`
 * is kept. Returns whether the build is a practice build.
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
