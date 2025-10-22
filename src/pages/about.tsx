import { NextSeo } from "next-seo";

import AboutHero from "@/components/about-hero";
import ExperienceShowcaseList from "@/components/experience/experience-showcase-list";
import SectionDivider from "@/components/section-divider";
import { EXPERIENCE } from "@/data/experience";
import { siteMetadata } from "@/data/siteMetaData.mjs";

export default function About() {
  return (
    <>
      <NextSeo
        title="About Prasanna Loganathan - AI & Data Science Engineer"
        description="Discover the journey and skills of Prasanna Loganathan — an innovative AIEngineer passionate about Artificial Intelligence, Full Stack Development, and immersive UI design. I specialize in crafting intelligent, high-performance systems by blending AI logic, modern web technologies, and creative design. With experience in MERN Stack, DevOps, and Agentic AI tools, I focus on building seamless digital experiences that connect technology with creativity."
        canonical={`${siteMetadata.siteUrl}/about`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/about`,
          title: "Learn About Prasanna Loganathan - AI & Data Science Engineer",
          description:
            "Dive into the story of Prasanna Loganathan — where AI logic meets Neon Noir creativity. I design and develop intelligent systems and futuristic interfaces, powered by Full Stack development and Agentic AI.",
          images: [
            {
              url: `${siteMetadata.siteUrl}${siteMetadata.image}`,
              alt: "Prasanna Loganathan — Professional Developer Portfolio",
            },
          ],
          siteName: siteMetadata.siteName,
          type: "website",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "Portfolio of Prasanna Loganathan — Full Stack Developer and AI Engineer skilled in MERN Stack, Web Development, DevOps, Flutter, and Mobile App Design. Expert in TypeScript, JavaScript, HTML, CSS, and Responsive Design.",
          },
        ]}
      />
      <AboutHero />
      <SectionDivider />
      <ExperienceShowcaseList title="Experience" details={EXPERIENCE} />
    </>
  );
}
