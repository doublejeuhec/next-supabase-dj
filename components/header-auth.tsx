import { createClient } from "@/utils/supabase/server";
import { NavLinks } from "./nav-links";
import { ThemeSwitcher } from "./theme-switcher";
import { Separator } from "./ui/separator";
import UserAvatarDropdown from "./user-avatar-dropdown";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <NavLinks />
        <Separator
          orientation="vertical"
          className="bg-white/50 dark:bg-black/50 h-6"
        />
        <ThemeSwitcher />
      </div>
    );
  }

  // Get the user profile data
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex items-center gap-10 text-primary-foreground dark:text-foreground">
      <NavLinks />
      <UserAvatarDropdown user={profileData} />
      <Separator
        orientation="vertical"
        className="bg-white/50 dark:bg-black/50 h-6"
      />
      <ThemeSwitcher />
    </div>
  );
}
