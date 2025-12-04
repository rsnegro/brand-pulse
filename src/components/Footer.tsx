export const Footer = () => {
  return (
    <footer className="w-full py-4 px-6 border-t border-border bg-card">
      <div className="container mx-auto max-w-7xl flex items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">
          © Todos os direitos reservados charisma
        </span>
        <svg
          className="w-5 h-5 text-pink"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27c-3.87 0-7-2.24-7-5s3.13-5 7-5 7 2.24 7 5-3.13 5-7 5z" />
        </svg>
      </div>
    </footer>
  );
};
