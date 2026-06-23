import {
  profileSettings,
  siteSettings,
  skillsSettings,
  SITE_URL,
} from "@/lib/content/settings";
import type { BlogPost, WorkEntry } from "@/lib/types";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profileSettings.name,
    url: SITE_URL,
    email: `mailto:${profileSettings.email}`,
    jobTitle: profileSettings.role,
    description: profileSettings.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: profileSettings.socials.map((s) => s.href),
    worksFor: {
      "@type": "Organization",
      name: "Hours Media Ltd",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Daffodil International University",
    },
    knowsAbout: skillsSettings.groups.flatMap((g) => g.skills),
    knowsLanguage: ["en", "bn"],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: siteSettings.title,
    description: siteSettings.description,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function webPageJsonLd(opts: {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "ProfilePage" | "CollectionPage" | "AboutPage";
}) {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${absoluteUrl(opts.path)}#webpage`,
    url: absoluteUrl(opts.path),
    name: opts.title,
    description: opts.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function workJsonLd(entry: WorkEntry) {
  return {
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(`/work/${entry.slug}`)}#work`,
    name: entry.title,
    url: absoluteUrl(`/work/${entry.slug}`),
    description: entry.summary,
    creator: { "@id": PERSON_ID },
    keywords: entry.stack.join(", "),
    genre: entry.category,
    dateCreated: entry.year.slice(0, 4),
  };
}

export function workCollectionJsonLd(entries: WorkEntry[]) {
  return {
    "@type": "ItemList",
    itemListElement: entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/work/${entry.slug}`),
      name: entry.title,
    })),
  };
}

export function blogPostJsonLd(post: BlogPost) {
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(`/blog/${post.slug}`)}#post`,
    headline: post.title,
    url: absoluteUrl(`/blog/${post.slug}`),
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    keywords: post.tags.join(", "),
    inLanguage: "en",
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function jsonLdGraph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
