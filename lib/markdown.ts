import {
  capabilitiesSettings,
  experienceSettings,
  profileSettings,
  siteSettings,
  skillsSettings,
  SITE_URL,
} from "@/lib/content/settings";
import { getAllWork } from "@/lib/content/work";
import { getAllPosts } from "@/lib/content/blog";
import type { BlogPost, WorkEntry } from "@/lib/types";

export function workToMarkdown(entry: WorkEntry): string {
  const lines = [
    `# ${entry.title}`,
    "",
    `> ${entry.summary.trim()}`,
    "",
    `- Canonical: ${SITE_URL}/work/${entry.slug}`,
    `- Role: ${entry.role}`,
    `- Year: ${entry.year}`,
    `- Category: ${entry.category}`,
    `- Stack: ${entry.stack.join(", ")}`,
    ...entry.metrics.map((m) => `- ${m.label}: ${m.value}`),
    ...entry.links.map((l) => `- ${l.label}: ${l.href}`),
    "",
    entry.content.trim(),
    "",
  ];
  return lines.join("\n");
}

export function postToMarkdown(post: BlogPost): string {
  const lines = [
    `# ${post.title}`,
    "",
    `> ${post.excerpt.trim()}`,
    "",
    `- Canonical: ${SITE_URL}/blog/${post.slug}`,
    `- Published: ${post.date}`,
    ...(post.updatedAt ? [`- Updated: ${post.updatedAt}`] : []),
    `- Tags: ${post.tags.join(", ")}`,
    `- Author: ${profileSettings.name} (${SITE_URL})`,
    "",
    post.content.trim(),
    "",
  ];
  return lines.join("\n");
}

export function siteIndexMarkdown(): string {
  const work = getAllWork();
  const posts = getAllPosts();

  const lines = [
    `# ${profileSettings.name}`,
    "",
    `> ${profileSettings.summary.trim()}`,
    "",
    `- Role: ${profileSettings.role}`,
    `- Location: ${profileSettings.location}`,
    `- Email: ${profileSettings.email}`,
    `- Website: ${SITE_URL}`,
    ...profileSettings.socials.map((s) => `- ${s.label}: ${s.href}`),
    "",
    "## Capabilities",
    "",
    ...capabilitiesSettings.items.map(
      (c) => `- **${c.title}** — ${c.description}`
    ),
    "",
    "## Selected work",
    "",
    ...work.map(
      (e) =>
        `- [${e.title}](${SITE_URL}/work/${e.slug}.md) (${e.year}, ${e.category}): ${e.summary.trim().replace(/\s+/g, " ")}`
    ),
    "",
    "## Experience",
    "",
    ...experienceSettings.items.map(
      (item) =>
        `- ${item.organization} — ${item.role} (${item.start} – ${item.end})`
    ),
    "",
    "## Skills",
    "",
    ...skillsSettings.groups.map(
      (g) => `- ${g.category}: ${g.skills.join(", ")}`
    ),
  ];

  if (posts.length > 0) {
    lines.push(
      "",
      "## Writing",
      "",
      ...posts.map(
        (p) =>
          `- [${p.title}](${SITE_URL}/blog/${p.slug}.md) (${p.date}): ${p.excerpt.trim().replace(/\s+/g, " ")}`
      )
    );
  }

  lines.push(
    "",
    "## Pages",
    "",
    `- [About](${SITE_URL}/about): background, toolbox, and FAQ`,
    `- [Resume](${SITE_URL}/resume): full experience, education, languages`,
    `- [Work](${SITE_URL}/work): all case studies`,
    ""
  );

  return lines.join("\n");
}

export function llmsTxt(): string {
  const work = getAllWork();
  const lines = [
    `# ${profileSettings.name}`,
    "",
    `> ${siteSettings.description.trim()}`,
    "",
    `${profileSettings.role}. Based in ${profileSettings.location}, working remotely. Contact: ${profileSettings.email}.`,
    "",
    "## Work",
    "",
    ...work.map(
      (e) =>
        `- [${e.title}](${SITE_URL}/work/${e.slug}.md): ${e.summary.trim().replace(/\s+/g, " ")}`
    ),
    "",
    "## Pages",
    "",
    `- [Site index](${SITE_URL}/index.md): full profile, experience, and skills as markdown`,
    `- [About](${SITE_URL}/about): background and FAQ`,
    `- [Resume](${SITE_URL}/resume): full work history`,
    "",
    "## Optional",
    "",
    `- [Full content](${SITE_URL}/llms-full.txt): everything on this site as a single markdown document`,
    "",
  ];
  return lines.join("\n");
}

export function llmsFullTxt(): string {
  const work = getAllWork();
  const posts = getAllPosts();
  const sections = [siteIndexMarkdown()];
  for (const entry of work) {
    sections.push("---", "", workToMarkdown(entry));
  }
  for (const post of posts) {
    sections.push("---", "", postToMarkdown(post));
  }
  return sections.join("\n");
}
