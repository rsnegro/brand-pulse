import { ChevronDown, Settings } from "lucide-react";
import charismaLogo from "@/assets/charisma-logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  return (
    <header className="w-full bg-card border-b border-primary py-3 px-6">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        {/* Company Profile - Left */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-muted rounded-lg px-2 py-1 transition-colors">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="18" rx="1" />
                <rect x="14" y="9" width="7" height="12" rx="1" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">QuintoAndar</p>
              <p className="text-xs text-muted-foreground">Mudar Empresa</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem>QuintoAndar</DropdownMenuItem>
            <DropdownMenuItem>Empresa 2</DropdownMenuItem>
            <DropdownMenuItem>+ Adicionar Empresa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logo - Center */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <img src={charismaLogo} alt="Charisma" className="h-7 object-contain" />
        </div>

        {/* User Profile - Right */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-muted rounded-lg px-2 py-1 transition-colors">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=john" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Settings className="w-3 h-3" />
                Configurações
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
