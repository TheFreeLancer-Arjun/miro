import Image from "next/image";

/**
 * Loading component is displayed while content is being fetched or loaded.
 * It shows an animated logo to indicate that the content is loading.
 * 
 * @returns {JSX.Element} A loading spinner component with an animated image.
 */
export default function Loading() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Image
        src={"/file.svg"}
        alt="logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
      />
    </div>
  );
}
