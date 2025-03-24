"use client";

import { FloatingLabelInput } from "@/components/ui-expansion/floating-label-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/types/database";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ProfileFormProps {
  profile: User;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formState, setFormState] = useState({
    first_name: profile.first_name,
    last_name: profile.last_name,
    nickname: profile.nickname || "",
    email: profile.email,
    phone_number: profile.phone_number || "",
    company: profile.company || "",
    job: profile.job || "",
    join_year: profile.join_year,
    avatar_url: profile.avatar_url || "",
  });

  // Store the current avatar path for cleanup on new upload
  const [currentAvatarPath, setCurrentAvatarPath] = useState<string | null>(
    () => {
      if (!profile.avatar_url) return null;
      // Extract the path from the current avatar URL if it exists
      try {
        const url = new URL(profile.avatar_url);
        const pathParts = url.pathname.split("/");
        const bucketIndex = pathParts.findIndex(
          (part) => part === "user-content"
        );
        if (bucketIndex !== -1 && pathParts.length > bucketIndex + 1) {
          return pathParts.slice(bucketIndex + 1).join("/");
        }
        return null;
      } catch (e) {
        return null;
      }
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "L'image est trop volumineuse. Taille maximum: 5MB",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setMessage({
        type: "error",
        text: "Seuls les fichiers images sont acceptés",
      });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const supabase = createClient();

      // Generate a unique file name with timestamp to avoid conflicts
      const timestamp = new Date().getTime();
      const fileExt = file.name.split(".").pop();
      const fileName = `${timestamp}_${uuidv4()}.${fileExt}`;
      const filePath = `avatars/${profile.id}/${fileName}`;

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from("user-content")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("user-content").getPublicUrl(filePath);

      // Delete the old avatar if it exists and is in our storage
      if (currentAvatarPath) {
        // We don't await this or handle errors critically since it's cleanup
        supabase.storage
          .from("user-content")
          .remove([currentAvatarPath])
          .then(({ error }) => {
            if (error) {
              console.warn("Couldn't remove old avatar:", error.message);
            }
          });
      }

      // Update the current avatar path for future cleanup
      setCurrentAvatarPath(filePath);

      // Update the form state with the new URL
      setFormState({
        ...formState,
        avatar_url: publicUrl,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: `Erreur lors de l'upload: ${error instanceof Error ? error.message : "Une erreur est survenue"}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const supabase = createClient();

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: formState.first_name,
        last_name: formState.last_name,
        nickname: formState.nickname || null,
        phone_number: formState.phone_number || null,
        company: formState.company || null,
        job: formState.job || null,
        avatar_url: formState.avatar_url || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);

    setIsLoading(false);

    if (error) {
      setMessage({
        type: "error",
        text: `Erreur: ${error.message}`,
      });
      return;
    }

    setMessage({
      type: "success",
      text: "Profil mis à jour avec succès!",
    });

    router.refresh();
  };

  // Get initials from the user's first and last name
  const initials =
    `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`.toUpperCase();

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <Card>
        <CardHeader>
          <CardTitle>Photo de profil</CardTitle>
          <CardDescription>
            Ajoutez une photo pour personnaliser votre profil
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={formState.avatar_url || ""}
              alt={`${profile.first_name} ${profile.last_name}`}
            />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col w-full gap-2">
            <div className="flex gap-2 items-center">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                }
                disabled={isUploading}
                className="flex gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Choisir une image</span>
                  </>
                )}
              </Button>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              {formState.avatar_url && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormState({ ...formState, avatar_url: "" })}
                >
                  Supprimer
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>
              Mettez à jour vos informations de profil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingLabelInput
                label="Prénom"
                name="first_name"
                value={formState.first_name}
                onChange={handleChange}
                required
              />
              <FloatingLabelInput
                label="Nom"
                name="last_name"
                value={formState.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <FloatingLabelInput
              label="Surnom (facultatif)"
              name="nickname"
              value={formState.nickname}
              onChange={handleChange}
            />
            <FloatingLabelInput
              label="Email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              disabled
              className="bg-muted"
            />
            <FloatingLabelInput
              label="Téléphone (facultatif)"
              name="phone_number"
              value={formState.phone_number}
              onChange={handleChange}
            />
          </CardContent>

          <CardHeader className="pt-6">
            <CardTitle>Informations professionnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingLabelInput
                label="Entreprise (facultatif)"
                name="company"
                value={formState.company}
                onChange={handleChange}
              />
              <FloatingLabelInput
                label="Poste (facultatif)"
                name="job"
                value={formState.job}
                onChange={handleChange}
              />
            </div>
            <FloatingLabelInput
              label="Année d'adhésion"
              name="join_year"
              type="number"
              value={formState.join_year.toString()}
              onChange={handleChange}
              disabled
              className="bg-muted"
            />
          </CardContent>

          <CardFooter className="flex flex-col items-start space-y-4">
            {message && (
              <div
                className={`w-full p-3 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
              >
                {message.text}
              </div>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading
                ? "Mise à jour en cours..."
                : "Mettre à jour le profil"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
