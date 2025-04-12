"use client"
import {PingForm} from "./pingform";
import Marquee from "react-fast-marquee";
import { useAsciiText, subZero } from 'react-ascii-text';
import Image from "next/image";

export default function Home() {

  return (
    <div>
      <div className="grid grid-rows-1 justify-items-center min-h-screen p-10 pb-10 gap-8 sm:p-10 font-[family-name:var(--font-geist-sans)]">
        <main className="flex w-full max-w-5xl flex-col gap-[32px] items-center sm:items-start">
        <div className="w-full">
            <PageTitle text="IoT  Village" />
        </div>
          <div className="w-full">
            <PingForm />
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center w-full">
          <div className="bottom-12 w-full text-gray-400">
          <Marquee>
            <h3>Diagnostic mode</h3>
          </Marquee>
          </div>
            <div className="flex items-center text-grey-500">
              <Image
                className="hidden dark:block opacity-40"
                src="/GHA-horizontal-inverse.png"
                alt="dark-mode-logo"
                width={167}
                height={50}
              />
              <Image
                className="mb-4 block dark:hidden opacity-40"
                src="/GHA-horizontal-primary.png"
                alt="light-mode-logo"
                width={167}
                height={50}
              />
            </div>
        </footer>
      </div>
    </div>
  );
}

interface PageTitleProps {
  text: string;
}

const PageTitle = (props: PageTitleProps) => {
  const asciiTextRef: any = useAsciiText({
    font: subZero,
    text: props.text,
    isAnimated: false,
  });

  return <pre className="w-full text-center text-[6px]" ref={asciiTextRef}></pre>;
};
