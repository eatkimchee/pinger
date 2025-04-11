"use client"
import {PingForm} from "./pingform";
import Marquee from "react-fast-marquee";

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Marquee>
          <h3>
              Diagnostic mode
          </h3>
        </Marquee>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <PingForm />
        </div>
        <Marquee>
          <h3>
              Diagnostic mode
          </h3>
        </Marquee>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          &copy; 2025 GHA
      </footer>
    </div>
  );
}
