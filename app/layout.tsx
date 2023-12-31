import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { ApolloWrapper } from "@/lib/apollo-wrapper";

export const metadata = {
  title: "Flexible",
  description: "Showcase developer projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          <ApolloWrapper>{children}</ApolloWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
