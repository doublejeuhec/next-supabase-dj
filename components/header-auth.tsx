import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { NavLinks } from "./nav-links";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <Link href="/promos" className="text-primary-foreground hover:opacity-80">
        Découvrir la troupe
      </Link>
      <span className="text-primary-foreground">Hey, {user.email}!</span>
      <form action={signOutAction}>
        <Button
          type="submit"
          variant={"outline"}
          className="bg-background text-foreground hover:bg-muted"
        >
          Sign out
        </Button>
      </form>
      <ThemeSwitcher />
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <NavLinks />
      <ThemeSwitcher />
    </div>
  );
}
