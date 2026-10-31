import Image from "next/image";

// A simple browser window: a bar with 3 dots and the URL, the screenshot below.
export default function BrowserFrame({
  src,
  url,
  alt,
  eager = false,
  crop = false,
  sizes = "(min-width: 1024px) 700px, 100vw",
}: {
  src: string;
  url: string;
  alt: string;
  eager?: boolean;
  crop?: boolean; // show only the top part (2:1) of the screenshot
  sizes?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-frame-line bg-frame">
      <div className="flex h-[30px] items-center gap-2 border-b border-frame-line px-3.5">
        <span className="size-2 rounded-full bg-frame-dot" />
        <span className="size-2 rounded-full bg-frame-dot" />
        <span className="size-2 rounded-full bg-frame-dot" />
        <span className="ml-3 truncate font-mono text-[11px] text-frame-text">{url}</span>
      </div>
      <div className={crop ? "aspect-[2/1] overflow-hidden" : ""}>
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          sizes={sizes}
          preload={eager}
          loading={eager ? "eager" : "lazy"}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
