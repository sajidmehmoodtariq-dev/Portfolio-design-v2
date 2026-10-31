import type { Project } from "@/content/site";
import BrowserFrame from "./BrowserFrame";
import PhoneFrame from "./PhoneFrame";

// Desktop screenshot in a browser frame with the phone overlapping its bottom-right corner.
export default function ProjectShowcase({
  project,
  eager = false,
  crop = false,
}: {
  project: Project;
  eager?: boolean;
  crop?: boolean;
}) {
  return (
    <div className="relative pr-[9%] pb-5">
      <BrowserFrame
        src={project.desktop}
        url={project.url}
        alt={`${project.name} on desktop`}
        eager={eager}
        crop={crop}
      />
      <div className="absolute right-0 bottom-0 w-[23%] min-w-[84px]">
        <PhoneFrame src={project.mobile} alt={`${project.name} on mobile`} eager={eager} />
      </div>
    </div>
  );
}
