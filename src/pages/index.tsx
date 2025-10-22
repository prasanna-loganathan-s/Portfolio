import Head from "next/head";
import { NextSeo } from "next-seo";
import Link from "next/link";

import LandingHero from "@/components/landing-hero";
import SkillsShowcase from "@/components/skills/skills-showcase";
import ProjectShowcase from "@/components/projects/project-showcase";
import { PROJECT_SHOWCASE } from "@/data/projects";
import { SKILLS_DATA } from "@/data/skills";
import { siteMetadata } from "@/data/siteMetaData.mjs";
import FadeUp from "@/animation/fade-up";
import { AnimatePresence } from "framer-motion";
import SectionDivider from "@/components/section-divider";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Prasanna Loganathan - AI Engineer"
        description="Explore the portfolio of Prasanna Loganathan, an innovative AI Engineer and AI enthusiast. Discover projects that demonstrate expertise in Next.js, MERN Stack, Flutter, DevOps, Azure AI, and microservices, all crafted to deliver exceptional user experiences on web and mobile platforms."
        canonical={siteMetadata.siteUrl}
        openGraph={{
          url: siteMetadata.siteUrl,
          title: "Prasanna Loganathan - Portfolio of a FullStack & AI Developer",
          description:
            "Delve into the world of web development with Prasanna Loganathan — a passionate AI Engineer blending creativity and technology. Explore a portfolio featuring advanced projects that showcase expertise in Next.js, MERN Stack, Flutter, DevOps, Azure AI, and microservices, reflecting a dedication to building intelligent, responsive, and impactful web and mobile applications.",
          images: [
            {
              url: `${siteMetadata.siteUrl}${siteMetadata.image}`,
              alt: "Prasanna Loganathan - Professional Developer Portfolio",
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
              "Prasanna Loganathan, AI Engineer, FullStack Developer, AI Specialist, Portfolio, Projects, MERN Stack, Next.js, Flutter Developer, DevOps, Azure AI, Microservices, Web Development, Responsive Design, JavaScript, HTML, CSS, UI/UX Design, AI & Data Science",
          },
        ]}
      />
      <Head>
        {siteMetadata.googleSiteVerification && (
          <meta
            name="google-site-verification"
            content={siteMetadata.googleSiteVerification}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteMetadata.siteName,
              url: siteMetadata.siteUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteMetadata.siteUrl}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteMetadata.author,
              url: siteMetadata.siteUrl,
              sameAs: [siteMetadata.github, siteMetadata.linkedin],
              jobTitle: siteMetadata.description,
              image: `${siteMetadata.siteUrl}${siteMetadata.image}`,
              email: siteMetadata.email,
            }),
          }}
        />
      </Head>

      {/* Enhanced Hero Section */}
      <LandingHero />

      <SectionDivider />

      {/* About Summary Section */}
      <AnimatePresence>
        <FadeUp key="about-title" duration={0.6} whileInView={true}>
          <section className="px-6 py-16 sm:px-14 md:px-20">
            <div className="mx-auto max-w-7xl">
              <div className="rounded-2xl border border-border bg-muted/20 p-6 shadow-lg ring-1 ring-zinc-200/50 backdrop-blur-lg dark:ring-accent/20 sm:p-8 md:p-12">
                <h2 className="text-3xl font-bold text-accent sm:text-4xl md:text-5xl">
                  About Me
                </h2>
                <p className="mt-6 text-lg font-medium leading-relaxed text-zinc-900 dark:text-zinc-300 sm:text-xl">
                  I&apos;m a passionate AI Engineer who specializes in
                  building intelligent, end-to-end solutions at the intersection
                  of{" "}
                  <span className="font-semibold text-accent">
                    AI and automation
                  </span>
                  . With expertise spanning from enterprise-grade testing
                  frameworks with Spring Boot to sophisticated AI agents using
                  AWS Bedrock, Azure AI, and Crew AI.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg bg-accent/10 p-4 backdrop-blur-sm">
                    <h3 className="font-semibold text-accent">
                      Full Stack Development
                    </h3>
                    <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                      MERN Stack, Next.js, Flutter, and modern web technologies
                    </p>
                  </div>
                  <div className="rounded-lg bg-accent/10 p-4 backdrop-blur-sm">
                    <h3 className="font-semibold text-accent">
                      AI & Data Science
                    </h3>
                    <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                      Azure AI, OpenAI, LangChain, and intelligent automation
                    </p>
                  </div>
                  <div className="rounded-lg bg-accent/10 p-4 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                    <h3 className="font-semibold text-accent">
                      3D Modeling
                    </h3>
                    <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                      Blender, Unreal Engine, Maya, and  Autodesk
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>
      </AnimatePresence>

      <SectionDivider />

      {/* Skills Section with Enhanced Styling */}
      <SkillsShowcase skills={SKILLS_DATA} />

      <SectionDivider />

      {/* Featured Projects Section */}
      <ProjectShowcase projects={PROJECT_SHOWCASE} />

      <SectionDivider />

      {/* Call to Action Section */}
      <AnimatePresence>
        <FadeUp key="cta-title" duration={0.6} whileInView={true}>
          <section className="px-6 py-16 sm:px-14 md:px-20">
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 rounded-2xl border border-border bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 p-6 shadow-lg ring-1 ring-accent/20 backdrop-blur-lg sm:mb-20 sm:p-8 md:p-12">
                <h2 className="text-center text-3xl font-bold text-accent sm:text-4xl md:text-5xl">
                  Let&apos;s Build Something Amazing
                </h2>
                <p className="mt-6 text-center text-lg font-medium text-zinc-900 dark:text-zinc-300 sm:text-xl">
                  Ready to transform your ideas into reality? Let&apos;s
                  collaborate on your next project.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/projects"
                    className="rounded-full bg-accent px-8 py-3 text-center text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-accent-light active:scale-95"
                  >
                    View My Work
                  </Link>
                  <Link
                    href="/about"
                    className="rounded-full border-2 border-accent px-8 py-3 text-center text-lg font-semibold text-accent transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-white active:scale-95"
                  >
                    Learn More About Me
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>
      </AnimatePresence>
    </>
  );
}
