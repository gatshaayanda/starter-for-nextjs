"use client";

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
          Ayanda Gatsha — Why I&apos;d Build with Appwrite
        </p>

        <h1 className="max-w-3xl font-[Poppins] text-4xl font-light leading-tight md:text-5xl">
          Build faster with <span className="text-[#FD366E]">Next.js</span> and{" "}
          <span className="text-[#FD366E]">Appwrite</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-[#5C5C61] md:text-lg">
          This simple one-page site highlights why Appwrite is such a strong fit
          for modern product development: it gives developers the backend
          essentials they need without forcing them to rebuild common
          infrastructure from scratch.
        </p>
      </section>

      <section className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[#EDEDF0] bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-light text-[#2D2D31]">
            Fast Authentication
          </h2>
          <p className="leading-7 text-[#5C5C61]">
            Appwrite makes it easier to add secure authentication flows so teams
            can spend less time wiring auth manually and more time building
            product value.
          </p>
        </div>

        <div className="rounded-2xl border border-[#EDEDF0] bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-light text-[#2D2D31]">
            Built-in Backend Tools
          </h2>
          <p className="leading-7 text-[#5C5C61]">
            With database, storage, and server-side capabilities already
            available, Appwrite gives developers a practical backend foundation
            for launching real applications faster.
          </p>
        </div>

        <div className="rounded-2xl border border-[#EDEDF0] bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-light text-[#2D2D31]">
            More Developer Control
          </h2>
          <p className="leading-7 text-[#5C5C61]">
            Appwrite stands out because it stays developer-first and open-source,
            giving teams meaningful flexibility over their architecture, workflow,
            and long-term platform decisions.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-4xl rounded-3xl border border-[#FD366E26] bg-white p-8 shadow-sm md:p-10">
        <h2 className="mb-4 font-[Poppins] text-3xl font-light text-[#2D2D31]">
          Why Appwrite
        </h2>
        <p className="text-base leading-8 text-[#4B4B50] md:text-lg">
          Appwrite is compelling because it gives developers a strong backend
          starting point with authentication, databases, storage, and serverless
          capabilities already in place. Instead of spending valuable time
          rebuilding common backend infrastructure, developers can move faster,
          stay focused on product quality, and still keep meaningful control over
          their architecture and data.
        </p>
      </section>

      <section className="mx-auto mt-16 flex max-w-5xl flex-col items-center justify-between gap-6 rounded-3xl border border-[#EDEDF0] bg-white p-8 text-center md:flex-row md:text-left">
        <div>
          <h3 className="text-2xl font-light text-[#2D2D31]">
            Explore Appwrite further
          </h3>
          <p className="mt-2 text-[#5C5C61]">
            Learn more about the platform and the tools behind it.
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
            href="https://cloud.appwrite.io"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-[#EDEDF0] bg-white px-5 py-3 text-[#2D2D31] transition hover:bg-[#F9F9FA]"
          >
            Open Console
          </a>
        </div>
      </section>
    </main>
  );
}