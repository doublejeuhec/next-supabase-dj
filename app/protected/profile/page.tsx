import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get the profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Profil non trouvé</h1>
        <p className="mt-4">
          Votre profil n'a pas été trouvé. Veuillez contacter l'administrateur.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Mon profil</h1>
          <p className="text-muted-foreground">
            Voir et mettre à jour vos informations personnelles
          </p>
        </div>

        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
