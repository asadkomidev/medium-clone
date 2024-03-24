import { Separator } from "@/components/ui/separator";

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export const AccountPageLayout = ({ children, title, description }: Props) => {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator />
      <div className="py-6">{children}</div>
    </div>
  );
};
