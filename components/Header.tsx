import { BookOpen, Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Header({ setIsSearchVisible }: { setIsSearchVisible: (value: boolean) => void }) {
    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-lg w-full"  >
            <div className="container">
                <div className="h-14 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-4">
                        <Image src="/logo.svg" alt="DocMagic" width={40} height={40} />
                    </Link>
                    <Button
                        onClick={() => setIsSearchVisible(true)}
                        variant="ghost" 
                        className="flex items-center gap-2 rounded-full px-4 transition-colors hover:bg-violet-100 group"
                    >
                        <Wand2 className="h-4 w-4 text-violet-400 group-hover:rotate-12 transition-transform" />
                        <span className="font-medium bg-gradient-to-br from-violet-500 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                            New Magic ✨
                        </span>
                    </Button>
                </div>
            </div>
        </header>
        );
}