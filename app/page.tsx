"use client"
import {PingForm} from "./pingform";

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
	<h3>
            Diagnostic mode
        </h3>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
	  <PingForm />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          &copy; 2025 GHA
      </footer>
    </div>
  );
}
