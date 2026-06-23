import { config, collection, fields, singleton } from "@keystatic/core";
import { shouldUseKeystaticGithubStorage } from "./lib/keystatic-env";

const statusField = fields.select({
  label: "Status",
  options: [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
  ],
  defaultValue: "draft",
});

const accentField = fields.select({
  label: "Accent",
  options: [
    { label: "Lavender", value: "lavender" },
    { label: "Mint", value: "mint" },
    { label: "Amber", value: "amber" },
    { label: "Rose", value: "rose" },
    { label: "Ice", value: "ice" },
  ],
  defaultValue: "lavender",
});

const seoFields = {
  seoTitle: fields.text({
    label: "SEO Title",
    description: "Overrides the default title tag.",
  }),
  seoDescription: fields.text({
    label: "SEO Description",
    multiline: true,
  }),
};

export default config({
  storage: shouldUseKeystaticGithubStorage()
    ? {
        kind: "github",
        repo: "hrmsway/hasib-portfolio",
      }
    : { kind: "local" },
  ui: {
    brand: { name: "Hasib Portfolio" },
  },
  collections: {
    work: collection({
      label: "Work",
      slugField: "title",
      path: "content/work/*",
      format: { contentField: "content" },
      columns: ["title", "category", "year", "status"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        status: statusField,
        order: fields.integer({ label: "Order", defaultValue: 99 }),
        featured: fields.checkbox({
          label: "Featured on home",
          defaultValue: false,
        }),
        category: fields.text({ label: "Category" }),
        year: fields.text({ label: "Year" }),
        role: fields.text({ label: "Role" }),
        summary: fields.text({
          label: "Summary",
          multiline: true,
          description: "2-3 extractable sentences. Used in lists and SEO.",
        }),
        stack: fields.array(fields.text({ label: "Technology" }), {
          label: "Stack",
          itemLabel: (props) => props.value || "Technology",
        }),
        metrics: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            value: fields.text({ label: "Value" }),
          }),
          {
            label: "Metrics",
            itemLabel: (props) => props.fields.label.value || "Metric",
          }
        ),
        accent: accentField,
        thumbnail: fields.object({
          src: fields.text({
            label: "Image path",
            description: "Path under /public, e.g. /images/work/oppora.png",
          }),
          alt: fields.text({ label: "Alt text" }),
        }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.url({ label: "URL" }),
          }),
          {
            label: "Links",
            itemLabel: (props) => props.fields.label.value || "Link",
          }
        ),
        ...seoFields,
        content: fields.mdx({ label: "Content" }),
      },
    }),
    blog: collection({
      label: "Blog",
      slugField: "title",
      path: "content/blog/*",
      format: { contentField: "content" },
      columns: ["title", "status", "date"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        status: statusField,
        date: fields.date({ label: "Published" }),
        updatedAt: fields.date({ label: "Updated" }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        accent: accentField,
        ...seoFields,
        content: fields.mdx({ label: "Content" }),
      },
    }),
  },
  singletons: {
    site: singleton({
      label: "Site",
      path: "content/settings/site",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Site name" }),
        domain: fields.text({ label: "Domain" }),
        url: fields.url({ label: "Canonical URL" }),
        title: fields.text({ label: "Default title" }),
        description: fields.text({
          label: "Default description",
          multiline: true,
        }),
      },
    }),
    profile: singleton({
      label: "Profile",
      path: "content/settings/profile",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Name" }),
        role: fields.text({ label: "Role" }),
        email: fields.text({ label: "Email" }),
        location: fields.text({ label: "Location" }),
        locationShort: fields.text({ label: "Location (short)" }),
        timezone: fields.text({ label: "IANA timezone" }),
        availability: fields.text({ label: "Availability line" }),
        summary: fields.text({ label: "Summary", multiline: true }),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            username: fields.text({ label: "Username" }),
            href: fields.url({ label: "URL" }),
          }),
          {
            label: "Socials",
            itemLabel: (props) => props.fields.label.value || "Social",
          }
        ),
      },
    }),
    navigation: singleton({
      label: "Navigation",
      path: "content/settings/navigation",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.text({ label: "Href" }),
          }),
          {
            label: "Items",
            itemLabel: (props) => props.fields.label.value || "Item",
          }
        ),
      },
    }),
    home: singleton({
      label: "Home",
      path: "content/settings/home",
      format: { data: "json" },
      schema: {
        heroKicker: fields.text({ label: "Hero kicker" }),
        heroLines: fields.array(fields.text({ label: "Line" }), {
          label: "Hero headline lines",
          itemLabel: (props) => props.value || "Line",
        }),
        heroSub: fields.text({ label: "Hero subline", multiline: true }),
        primaryCta: fields.object({
          label: fields.text({ label: "Label" }),
          href: fields.text({ label: "Href" }),
        }),
        secondaryCta: fields.object({
          label: fields.text({ label: "Label" }),
          href: fields.text({ label: "Href" }),
        }),
        builtKicker: fields.text({ label: "Built section kicker" }),
        builtHeadline: fields.text({ label: "Built section headline" }),
        builtBody: fields.text({
          label: "Built section body",
          multiline: true,
        }),
        builtMeta: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            value: fields.text({ label: "Value" }),
          }),
          {
            label: "Built section meta",
            itemLabel: (props) => props.fields.label.value || "Meta",
          }
        ),
        contactHeadline: fields.text({ label: "Contact headline" }),
        contactBody: fields.text({ label: "Contact body", multiline: true }),
      },
    }),
    capabilities: singleton({
      label: "Capabilities",
      path: "content/settings/capabilities",
      format: { data: "json" },
      schema: {
        heading: fields.text({ label: "Section heading" }),
        items: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            tags: fields.array(fields.text({ label: "Tag" }), {
              label: "Tags",
              itemLabel: (props) => props.value || "Tag",
            }),
          }),
          {
            label: "Items",
            itemLabel: (props) => props.fields.title.value || "Capability",
          }
        ),
      },
    }),
    experience: singleton({
      label: "Experience",
      path: "content/settings/experience",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            organization: fields.text({ label: "Organization" }),
            url: fields.url({ label: "URL" }),
            location: fields.text({ label: "Location" }),
            role: fields.text({ label: "Role" }),
            start: fields.text({ label: "Start" }),
            end: fields.text({ label: "End" }),
            current: fields.checkbox({ label: "Current", defaultValue: false }),
            highlights: fields.array(fields.text({ label: "Highlight" }), {
              label: "Highlights",
              itemLabel: (props) => props.value?.slice(0, 50) || "Highlight",
            }),
          }),
          {
            label: "Items",
            itemLabel: (props) =>
              props.fields.organization.value || "Experience",
          }
        ),
      },
    }),
    skills: singleton({
      label: "Skills",
      path: "content/settings/skills",
      format: { data: "json" },
      schema: {
        groups: fields.array(
          fields.object({
            category: fields.text({ label: "Category" }),
            skills: fields.array(fields.text({ label: "Skill" }), {
              label: "Skills",
              itemLabel: (props) => props.value || "Skill",
            }),
          }),
          {
            label: "Groups",
            itemLabel: (props) => props.fields.category.value || "Group",
          }
        ),
      },
    }),
    resume: singleton({
      label: "Resume",
      path: "content/settings/resume",
      format: { data: "json" },
      schema: {
        pdfPath: fields.text({ label: "PDF path" }),
        headline: fields.text({ label: "Headline" }),
        education: fields.array(
          fields.object({
            degree: fields.text({ label: "Degree" }),
            institution: fields.text({ label: "Institution" }),
            location: fields.text({ label: "Location" }),
            start: fields.text({ label: "Start" }),
            end: fields.text({ label: "End" }),
            note: fields.text({ label: "Note" }),
          }),
          {
            label: "Education",
            itemLabel: (props) => props.fields.degree.value || "Education",
          }
        ),
        languages: fields.array(
          fields.object({
            language: fields.text({ label: "Language" }),
            level: fields.text({ label: "Level" }),
          }),
          {
            label: "Languages",
            itemLabel: (props) => props.fields.language.value || "Language",
          }
        ),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          {
            label: "FAQ",
            itemLabel: (props) => props.fields.question.value || "Question",
          }
        ),
      },
    }),
  },
});
