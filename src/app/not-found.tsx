import SiteHeader from "@/components/SiteHeader";
import Button from "@/components/ui/Button";
import Dot from "@/components/ui/Dot";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container-page flex min-h-svh flex-col items-center justify-center text-center">
        <p className="eyebrow">404</p>
        <h1 className="title-chapter mt-5">
          Page not found
          <Dot />
        </h1>
        <div className="mt-9">
          <Button href="/" arrow="right">
            Back home
          </Button>
        </div>
      </main>
    </>
  );
}
