import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="text-muted-foreground mt-2">This page could not be found.</p>
      <Link
        href="/"
        className="text-primary mt-6 text-sm font-medium underline hover:no-underline"
      >
        Back to home
      </Link>
    </div>
  );
}
