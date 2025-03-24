import { Member } from "@/types/member";
import promo2022 from "./2022";
import promo2023 from "./2023";
import promo2024 from "./2024";
import promo2025 from "./2025";

export const promos: Record<string, Member[]> = {
  "2024": promo2024,
  "2025": promo2025,
  "2023": promo2023,
  "2022": promo2022,
};

export const roleAbbreviations: Record<string, string> = {
  MML: "Le médecin malgré lui",
  FIL: "Un fil à la patte",
  JV: "Les Jumeaux Vénitiens",
  SNE: "Le Songe d'une Nuit d'Été",
  H: "Hortense a dit je m'en fous!",
  VVD: "La visite de la vieille dame",
};

export { promo2024, promo2025 };
