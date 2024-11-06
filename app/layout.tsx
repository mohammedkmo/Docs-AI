import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { GeistSans } from 'geist/font/sans';



export const metadata: Metadata = {
    title: "DocsAI - AI Documentation Generator",
    description: "Generate comprehensive documentation for your code with AI. Get instant, accurate documentation for any programming concept, framework, or language.",
    keywords: ["documentation", "AI", "programming", "code", "developer tools", "technical writing"],
    authors: [{ name: "DocsAI" }],
    creator: "DocsAI",
    publisher: "DocsAI",
    robots: "index, follow",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://docs.mohammedk.me",
        title: "DocsAI - AI Documentation Generator",
        description: "Generate comprehensive documentation for your code with AI",
        siteName: "DocsAI"
    },
    twitter: {
        card: "summary_large_image",
        title: "DocsAI - AI Documentation Generator",
        description: "Generate comprehensive documentation for your code with AI",
        creator: "@docsai"
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}