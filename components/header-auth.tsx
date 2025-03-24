import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { MobileNav } from "./mobile-nav";
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
        <div className="hidden md:flex">
          <NavLinks />
        </div>
        <Separator
          orientation="vertical"
          className="hidden md:block bg-white/50 dark:bg-black/50 h-6"
        />
        <div className="hidden md:block">
          <ThemeSwitcher />
        </div>

        {/* Mobile Navigation */}
        <MobileNav isLoggedIn={false} />
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
      <div className="hidden md:block">
        <Link
          href="/promos"
          className="text-primary-foreground dark:text-black text-base font-semibold"
        >
          Voir les cocos
        </Link>
      </div>
      <div className="hidden md:block">
        <UserAvatarDropdown user={profileData} />
      </div>
      <Separator
        orientation="vertical"
        className="hidden md:block bg-white/50 dark:bg-black/50 h-6"
      />
      <div className="hidden md:block">
        <ThemeSwitcher />
      </div>

      {/* Mobile Navigation */}
      <MobileNav isLoggedIn={true} />
    </div>
  );
}
