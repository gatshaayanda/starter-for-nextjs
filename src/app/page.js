import "./app.css";
import "@appwrite.io/pink-icons";
import NextjsLogo from "../static/nextjs-icon.svg";
import AppwriteLogo from "../static/appwrite-icon.svg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="checker-background min-h-screen px-6 py-16 text-[#2D2D31]">
      <section className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <div className="mb-8 flex items-center gap-6">
          <div className="rounded-[25%] border border-[#19191C0A] bg-[#F9F9FA] p-3 shadow-[0px_9.36px_9.36px_0px_hsla(0,0%,0%,0.04)]">
            <div className="rounded-[25%] border border-[#FAFAFB] bg-white p-5 shadow-[0px_2px_12px_0px_hsla(0,0%,0%,0.03)] lg:p-7">
              <Image alt="Next.js logo" src={NextjsLogo} width={52} height={52} />
            </div>
          </div>

          <div className="flex w-24 items-center">
            <div className="h-[1px] flex-1 bg-gradient-to-l from-[#f02e65] to-[rgba(253,54,110,0.15)]"></div>
            <div className="icon-check flex h-5 w-5 items-center justify-center rounded-full border border-[#FD366E52] bg-[#FD366E14] text-[#FD366E]"></div>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#f02e65] to-[rgba(253,54,110,0.15)]"></div>
          </div>

          <div className="rounded-[25%] border border-[#19191C0A] bg-[#F9F9FA] p-3 shadow-[0px_9.36px_9.36px_0px_hsla(0,0%,0%,0.04)]">
            <div className="rounded-[25%] border border-[#FAFAFB] bg-white p-5 shadow-[0px_2px_12px_0px_hsla(0,0%,0%,0.03)] lg:p-7">
              <Image alt="Appwrite logo" src={AppwriteLogo} width={52} height={52} />
            </div>
          </div>
        </div>

        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#FD366E]">
          Ayanda Gatsha • Founder, AdminHub
        </p>

        <h1 className="max-w-4xl font-[Poppins] text-4xl font-light leading-tight md:text-6xl">
          I build production-ready systems.
          <br />
          <span className="text-[#FD366E]">Appwrite fits the way I think.</span>
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-[#5C5C61] md:text-lg">
          I’m a full-stack developer and systems builder who enjoys turning messy
          workflows into clean products. My work has included CRM flows,
          real-time messaging, multilingual content systems, dashboards, and
          client-facing tools. What stands out to me about Appwrite is how
          directly it supports that kind of product work.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://appwrite.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-[#FD366E] px-5 py-3 text-white transition hover:opacity-90"
          >
            Read Appwrite Docs
          </a>

          <a
            href="https://cloud.appwrite.io"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-[#EDEDF0] bg-white px-5 py-3 text-[#2D2D31] transition hover:bg-[#F9F9FA]"
          >
            Open Console
          </a>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[#EDEDF0] bg-white p-6 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FD366E]">
            Systems
          </p>
          <h2 className="mb-3 text-xl font-light text-[#2D2D31]">
            I already build the kinds of workflows Appwrite supports well
          </h2>
          <p className="leading-7 text-[#5C5C61]">
            My background is not just in landing pages. I build structured
            systems: dashboards, messaging, CRM-style flows, content operations,
            and admin-side tooling.
          </p>
        </div>

        <div className="rounded-2xl border border-[#EDEDF0] bg-white p-6 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FD366E]">
            Execution
          </p>
          <h2 className="mb-3 text-xl font-light text-[#2D2D31]">
            I work like an owner
          </h2>
          <p className="leading-7 text-[#5C5C61]">
            I’ve spent over a decade delivering remotely across software, media,
            research, and operations. I value tools that reduce friction and let
            me ship clearly, quickly, and responsibly.
          </p>
        </div>

        <div className="rounded-2xl border border-[#EDEDF0] bg-white p-6 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FD366E]">
            Communication
          </p>
          <h2 className="mb-3 text-xl font-light text-[#2D2D31]">
            I can explain technical value, not just build it
          </h2>
          <p className="leading-7 text-[#5C5C61]">
            My journalism and media background helps me translate infrastructure
            choices into clear reasoning. That matters when writing for
            developers, teams, or product decision-makers.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-4xl rounded-3xl border border-[#FD366E26] bg-white p-8 shadow-sm md:p-10">
        <h2 className="mb-4 font-[Poppins] text-3xl font-light text-[#2D2D31]">
          Why Appwrite
        </h2>
        <p className="text-base leading-8 text-[#4B4B50] md:text-lg">
          Appwrite is compelling to me because it brings together the backend
          layers I care about most - authentication, structured data, storage,
          functions, realtime capabilities, and site deployment - without making
          the platform feel unnecessarily abstract. I like tools that help me go
          from architecture to working product quickly. Appwrite feels aligned
          with that mindset: developer-first, practical, and built for shipping.
        </p>
      </section>

      <section className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[#EDEDF0] bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-xl font-light text-[#2D2D31]">
            Fast Authentication
          </h3>
          <p className="leading-7 text-[#5C5C61]">
            Authentication is one of the first places product velocity gets
            slowed down. Appwrite helps reduce that setup cost.
          </p>
        </div>

        <div className="rounded-2xl border border-[#EDEDF0] bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-xl font-light text-[#2D2D31]">
            Databases + Storage
          </h3>
          <p className="leading-7 text-[#5C5C61]">
            For real products, data and files belong in the same conversation.
            Appwrite gives that backend foundation in a way that feels usable.
          </p>
        </div>

        <div className="rounded-2xl border border-[#EDEDF0] bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-xl font-light text-[#2D2D31]">
            Developer Control
          </h3>
          <p className="leading-7 text-[#5C5C61]">
            I’m drawn to platforms that help you move fast without making you
            feel boxed in. That balance is part of Appwrite’s appeal.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 flex max-w-5xl flex-col items-center justify-between gap-6 rounded-3xl border border-[#EDEDF0] bg-white p-8 text-center md:flex-row md:text-left">
        <div>
          <h3 className="text-2xl font-light text-[#2D2D31]">
            Built as a focused Appwrite application task
          </h3>
          <p className="mt-2 text-[#5C5C61]">
            A simple one-page response, centered on product thinking, developer
            experience, and clear communication.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="https://appwrite.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-[#FD366E] px-5 py-3 text-white transition hover:opacity-90"
          >
            Read Docs
          </a>

          <a
            href="https://github.com/appwrite"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-[#EDEDF0] bg-white px-5 py-3 text-[#2D2D31] transition hover:bg-[#F9F9FA]"
          >
            View GitHub
          </a>
        </div>
      </section>
    </main>
  );
}