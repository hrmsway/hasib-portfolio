import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Built } from "@/components/sections/built";
import { Capabilities } from "@/components/sections/capabilities";
import { Experience } from "@/components/sections/experience";
import { ContactCta } from "@/components/sections/contact-cta";
import { JsonLd } from "@/components/json-ld";
import { siteSettings } from "@/lib/content/settings";
import { jsonLdGraph, webPageJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd
        graph={jsonLdGraph(
          webPageJsonLd({
            path: "/",
            title: siteSettings.title,
            description: siteSettings.description,
            type: "ProfilePage",
          })
        )}
      />
      <Hero />
      <SelectedWork />
      <Built />
      <Capabilities />
      <Experience />
      <ContactCta />
    </>
  );
}
