import charismaSmile from "@/assets/charisma-smile.svg";

export const Footer = () => {
  return (
    <footer className="w-full py-4 px-6 border-t border-border bg-card">
      <div className="container mx-auto max-w-7xl flex items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">
          © Todos os direitos reservados charisma
        </span>
        <img src={charismaSmile} alt="Charisma" className="h-3 w-auto" />
      </div>
    </footer>
  );
};
