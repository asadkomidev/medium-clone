import SecondaryContainer from "@/components/secondary-container";

export function StoryLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <SecondaryContainer className="py-12 sm:py-24 ">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold sm:text-4xl ">{title}</h1>
        <p className="mt-4 text-base text-muted-foreground">{intro}</p>
      </header>

      {children && <div className="py-6">{children}</div>}
    </SecondaryContainer>
  );
}
