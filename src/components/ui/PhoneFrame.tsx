import Image from "next/image";

// A phone with rounded corners and a notch, holding the mobile screenshot.
export default function PhoneFrame({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  return (
    <div className="rounded-[26px] border border-frame-line bg-phone p-[5px] shadow-[0_20px_50px_-18px_rgb(0_0_0_/_0.8)]">
      <div className="relative overflow-hidden rounded-[21px] bg-frame">
        <span
          aria-hidden
          className="absolute top-[2.6%] left-1/2 z-10 h-[3.6%] w-[44%] -translate-x-1/2 rounded-full bg-notch"
        />
        <Image
          src={src}
          alt={alt}
          width={780}
          height={1690}
          sizes="200px"
          loading={eager ? "eager" : "lazy"}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
