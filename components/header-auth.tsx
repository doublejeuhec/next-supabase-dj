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
      <Link href="/promos" className="text-white hover:text-gray-200">
        Découvrir la troupe
      </Link>
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button
          type="submit"
          variant={"outline"}
          className="bg-white hover:bg-gray-100 text-red-600"
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
