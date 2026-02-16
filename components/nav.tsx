"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MusicIcon,
  VideoIcon,
  FileAudioIcon,
  ImageIcon,
  MenuIcon,
  HomeIcon,
} from "lucide-react";

const tools = [
  { href: "/extract-audio", label: "Extract Audio", icon: MusicIcon },
  { href: "/convert-video", label: "Convert Video", icon: VideoIcon },
  { href: "/convert-audio", label: "Convert Audio", icon: FileAudioIcon },
  { href: "/convert-image", label: "Convert Image", icon: ImageIcon },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-border sticky top-0 z-50 border-b bg-background">
      <nav className="container mx-auto flex h-14 items-center justify-between gap-6 px-4">
        <Link
          href="/"
          className="text-foreground font-semibold hover:underline"
        >
          MediaThing
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`text-sm transition-colors ${
              pathname === "/"
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <HomeIcon className="size-4 md:hidden" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MenuIcon className="size-4 md:mr-2" />
                <span className="hidden md:inline">Tools</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = pathname === tool.href;
                return (
                  <DropdownMenuItem key={tool.href} asChild>
                    <Link
                      href={tool.href}
                      className={`flex items-center gap-2 ${
                        isActive ? "font-medium" : ""
                      }`}
                    >
                      <Icon className="size-4" />
                      {tool.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
