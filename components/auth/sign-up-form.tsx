"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { FloatingLabelInput } from "@/components/ui-expansion/floating-label-input";
import MultipleSelector, {
  Option,
} from "@/components/ui-expansion/multiple-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { companies } from "@/data/companies";
import { associations } from "@/data/hec/list-asso";
import { jobs } from "@/data/jobs";
import Link from "next/link";
import { useState } from "react";
import { Label } from "../ui/label";

const currentYear = new Date().getFullYear();
const joinYears = Array.from({ length: 51 }, (_, i) => currentYear - i);

export function SignUpForm({ message }: { message?: Message }) {
  const [formMessage, setFormMessage] = useState<Message | undefined>(message);
  const [selectedAsso, setSelectedAsso] = useState<Option[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  // Convertir les tableaux de chaînes en tableaux d'options pour MultipleSelector
  const assoOptions: Option[] = associations.map((asso) => ({
    value: asso,
    label: asso,
  }));

  const handleSubmit = async (formData: FormData) => {
    // Ajouter les options sélectionnées aux données du formulaire
    if (selectedAsso.length > 0) {
      formData.append(
        "other_hec_asso",
        JSON.stringify(selectedAsso.map((option) => option.value))
      );
    }

    if (selectedCompany && selectedCompany !== "none") {
      formData.append("company", selectedCompany);
    }

    if (selectedJob && selectedJob !== "none") {
      formData.append("job", selectedJob);
    }

    if (selectedYear) {
      formData.append("join_year", selectedYear);
    }

    // Appeler l'action
    await signUpAction(formData);
  };

  return (
    <form
      className="flex-1 flex flex-col min-w-64 space-y-6"
      action={handleSubmit}
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-medium">S'inscrire</h1>
        <p className="text-sm text-foreground">
          Vous avez déjà un compte ?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Se connecter
          </Link>
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingLabelInput
            label="Prénom"
            name="first_name"
            autoComplete="given-name"
            required
          />
          <FloatingLabelInput
            label="Nom de famille"
            name="last_name"
            autoComplete="family-name"
            required
          />
        </div>

        <FloatingLabelInput
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />

        <FloatingLabelInput label="surnom dans la troupe" name="nickname" />

        <FloatingLabelInput
          label="Numéro de téléphone (optionnel)"
          name="phone_number"
          type="tel"
          autoComplete="tel"
        />

        <div className="space-y-2">
          <Label htmlFor="join_year">En quelle année as-tu rejoint DJ ?</Label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionne l'année" />
            </SelectTrigger>
            <SelectContent>
              {joinYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="other_hec_asso">Étais-tu dans d'autres assos à HEC ?</Label>
          <MultipleSelector
            value={selectedAsso}
            onChange={setSelectedAsso}
            placeholder="Sélectionne tes associations"
            options={assoOptions}
            hidePlaceholderWhenSelected
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Dans quelle entreprise travailles-tu ?</Label>
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionne ton entreprise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucune</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="job">Quel est ton boulot ?</Label>
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionne ton poste" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucun</SelectItem>
              {jobs.map((job) => (
                <SelectItem key={job} value={job}>
                  {job}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <FloatingLabelInput
          label="Mot de passe"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
        />

        <SubmitButton pendingText="Inscription en cours...">
          S'inscrire
        </SubmitButton>

        {formMessage && <FormMessage message={formMessage} />}
      </div>
    </form>
  );
}
