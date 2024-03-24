import { homeNavigationLinks } from "../data/home-navigation-links";

import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-x-4">
      {homeNavigationLinks.map((item) => (
        <p className="text-sm text-muted-foreground" key={item.id}>
          <Link href={item.href} className="hover:text-primary">
            {item.label}
          </Link>
        </p>
      ))}
    </div>
  );
};

export default Navigation;
