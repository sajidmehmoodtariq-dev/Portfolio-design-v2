import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import "@fontsource-variable/hubot-sans/wdth.css";
import "@fontsource-variable/mona-sans/index.css";
import "@fontsource/monaspace-neon/400.css";
import "@fontsource/monaspace-neon/500.css";
import "./globals.css";
import { site } from "@/content/site";

const description = `${site.name} is a ${site.role.toLowerCase()} in ${site.location}, building payment, logistics and developer tools.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmad.dev"), // TODO: replace with your real domain
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description,
  openGraph: { title: `${site.name} — ${site.role}`, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0B0A0F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
