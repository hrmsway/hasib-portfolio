export function shouldUseKeystaticGithubStorage() {
  return (
    process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND === "github" &&
    Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG)
  );
}
