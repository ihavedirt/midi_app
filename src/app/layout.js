import { AudioContextProvider } from '@/contexts/AudioContextProvider';

export const metadata = {
  title: "MIDI App",
  description: "Play music and games with your MIDI keyboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AudioContextProvider>
          {children}
        </AudioContextProvider>
      </body>
    </html>
  );
}