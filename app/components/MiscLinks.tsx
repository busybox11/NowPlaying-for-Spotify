import { SiGithub, SiDiscord, SiPaypal, SiKofi } from "react-icons/si";

const LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/busybox11/NowPlaying-for-Spotify",
    icon: SiGithub,
  },
  {
    name: "Discord",
    url: "https://discord.gg/DMmk8Sc",
    icon: SiDiscord,
  },
  {
    name: "PayPal",
    url: "https://paypal.me/busybox11",
    icon: SiPaypal,
  },
  {
    name: "Ko-Fi",
    url: "https://ko-fi.com/busybox11",
    icon: SiKofi,
  },
];

export function MiscLinks() {
  return (
    <div className="flex flex-row gap-4 flex-wrap">
      {LINKS.map((link) => (
        <a key={link.name} href={link.url} target="_blank" title={link.name}>
          <link.icon className="text-white/50 hover:text-white transition h-6 w-6" />
        </a>
      ))}
    </div>
  );
}
