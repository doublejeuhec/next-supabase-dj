import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
      <ThemeSwitcher />
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <ThemeSwitcher />
    </div>
  );
}
