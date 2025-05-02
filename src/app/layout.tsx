import './globals.css';
import { Providers } from './providers'; // ✅ Import the wrapper

export const metadata = {
  title: 'Your App',
  description: 'Your app description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>{/* ✅ Wrap in Redux Provider */}
      </body>
    </html>
  );
}
