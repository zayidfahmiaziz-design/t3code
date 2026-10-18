import type { DesktopUpdateChannel } from "@t3tools/contracts";

const NIGHTLY_VERSION_PATTERN = /^[^-+]+-nightly\.\d{8}\.\d+$/;
// Preview builds are the maintainers' test train, cut by hand from unreleased
// branches to exercise the release flow. They share nightly's branding but
// are packaged without an update feed (see
// isDesktopPreviewVersion in scripts/build-desktop-artifact.ts), so the
// channel a preview install reports is cosmetic: it never checks for updates
// and no updater feed ever lists a preview release.
const PRERELEASE_VERSION_PATTERN = /^[^-+]+-(?:nightly|preview)\.\d{8}\.\d+$/;

// Personal builds (`-dev.<stamp>`) are packaged from a local branch, carry
// Dev branding, and never check for updates.
const PERSONAL_DEV_VERSION_PATTERN = /^[^-+]+-dev\.\d+$/;

export function isPersonalDevDesktopVersion(version: string): boolean {
  return PERSONAL_DEV_VERSION_PATTERN.test(version);
}

// Practice builds (`-practice.<stamp>`) are the same personal build under a
// separate name, bundle id and browser profile, for work that must stay apart
// from development. They never check for updates either.
const PERSONAL_PRACTICE_VERSION_PATTERN = /^[^-+]+-practice\.\d+$/;

export function isPersonalPracticeDesktopVersion(version: string): boolean {
  return PERSONAL_PRACTICE_VERSION_PATTERN.test(version);
}

export function isNightlyDesktopVersion(version: string): boolean {
  return PRERELEASE_VERSION_PATTERN.test(version);
}

export function resolveDefaultDesktopUpdateChannel(appVersion: string): DesktopUpdateChannel {
  return NIGHTLY_VERSION_PATTERN.test(appVersion) ? "nightly" : "latest";
}
