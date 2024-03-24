import Logo from "@/components/logo";
import { cn } from "@/lib/utils";

type Props = {
  description: string;
  className?: string;
};

export const AuthLogo = ({ description, className }: Props) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-y-1 items-center justify-center",
        className
      )}>
      <Logo />
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};
