import Image from "next/image";

type FullScreenBackgroundProps = {
  src: string;
  alt: string;
  overlayClassName?: string;
};

export function FullScreenBackground({
  src,
  alt,
  overlayClassName,
}: FullScreenBackgroundProps) {
  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/75 ${overlayClassName ?? ""}`}
      />
    </div>
  );
}


