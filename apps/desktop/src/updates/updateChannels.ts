// Preview builds share nightly branding but ship without an update feed.
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
