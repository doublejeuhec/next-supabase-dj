"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { FloatingLabelInput } from "@/components/ui-expansion/floating-label-input";
import MultipleSelector, {
  Option,
} from "@/components/ui-expansion/multiple-selector";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Check, ChevronsUpDown, EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
const currentYear = new Date().getFullYear();
const joinYears = Array.from({ length: 51 }, (_, i) => currentYear - i);

export function SignUpForm({ message }: { message?: Message }) {
  const [formMessage, setFormMessage] = useState<Message | undefined>(message);
  const [selectedAsso, setSelectedAsso] = useState<Option[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyInput, setCompanyInput] = useState("");
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [jobOpen, setJobOpen] = useState(false);
  const [jobInput, setJobInput] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [secretPassword, setSecretPassword] = useState<string>("");
  const [secretPasswordError, setSecretPasswordError] = useState<string | null>(
    null
  );
  const [showSecretPassword, setShowSecretPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Show toast notification for errors
  useEffect(() => {
    if (formMessage && "error" in formMessage) {
      toast.error(formMessage.error);
    }
    if (secretPasswordError) {
      toast.error(secretPasswordError);
    }
  }, [formMessage, secretPasswordError]);

  // Convertir les tableaux de chaînes en tableaux d'options pour MultipleSelector
  const assoOptions: Option[] = associations.map((asso) => ({
    value: asso,
    label: asso,
  }));

  // Filter companies based on input
  const filteredCompanies = companyInput
    ? companies.filter((company) =>
        company.toLowerCase().includes(companyInput.toLowerCase())
      )
    : companies;

  // Filter jobs based on input
  const filteredJobs = jobInput
    ? jobs.filter((job) => job.toLowerCase().includes(jobInput.toLowerCase()))
    : jobs;

  // Handle popover close for company
  const handleCompanyOpenChange = (open: boolean) => {
    setCompanyOpen(open);
    if (open && selectedCompany) {
      // When opening, populate the input with current selection
      setCompanyInput(selectedCompany);
    }
    if (!open && companyInput && !selectedCompany) {
      // If popover closes and we have input but no selection,
      // use the input as the selected value
      setSelectedCompany(companyInput);
    }
  };

  // Handle popover close for job
  const handleJobOpenChange = (open: boolean) => {
    setJobOpen(open);
    if (open && selectedJob) {
      // When opening, populate the input with current selection
      setJobInput(selectedJob);
    }
    if (!open && jobInput && !selectedJob) {
      // If popover closes and we have input but no selection,
      // use the input as the selected value
      setSelectedJob(jobInput);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    // Vérifier le mot de passe secret
    if (secretPassword !== "tirebouchon") {
      setSecretPasswordError("Le mot de passe secret est incorrect");
      return;
    }

    // Ajouter les options sélectionnées aux données du formulaire
    if (selectedAsso.length > 0) {
      formData.append(
        "other_hec_asso",
        JSON.stringify(selectedAsso.map((option) => option.value))
      );
    }

    if (selectedCompany) {
      formData.append("company", selectedCompany);
    }

    if (selectedJob) {
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
      suppressHydrationWarning
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
        <div className="space-y-2">
          <div className="relative">
            <FloatingLabelInput
              label="Mot de passe secret de la troupe"
              name="secret_password"
              type={showSecretPassword ? "text" : "password"}
              required
              value={secretPassword}
              onChange={(e) => {
                setSecretPassword(e.target.value);
                setSecretPasswordError(null);
              }}
              suppressHydrationWarning
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowSecretPassword(!showSecretPassword)}
            >
              {showSecretPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showSecretPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
        </div>

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
          <Label htmlFor="other_hec_asso">
            Étais-tu dans d'autres assos à HEC ?
          </Label>
          <MultipleSelector
            value={selectedAsso}
            onChange={setSelectedAsso}
            placeholder="Sélectionne tes associations"
            options={assoOptions}
            hidePlaceholderWhenSelected
          />
        </div>

        <div className="rounded-md bg-muted p-4 mt-2">
          <p className="text-sm">
            Petit moment networking pour s'entraider — le réseau c'est important
            !
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">
            Dans quelle entreprise travailles-tu ?
          </Label>
          <Popover open={companyOpen} onOpenChange={handleCompanyOpenChange}>
            <PopoverTrigger asChild>
              <div
                role="combobox"
                aria-expanded={companyOpen}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
              >
                {selectedCompany
                  ? selectedCompany
                  : "Sélectionne ou saisis ton entreprise"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command shouldFilter={true}>
                <CommandInput
                  placeholder="Recherche d'entreprise..."
                  className="h-9"
                  value={companyInput}
                  onValueChange={setCompanyInput}
                />
                <CommandList>
                  {companyInput &&
                    !filteredCompanies.some(
                      (company) =>
                        company.toLowerCase() === companyInput.toLowerCase()
                    ) && (
                      <CommandGroup heading="Créer nouveau">
                        <CommandItem
                          key="new"
                          value={`new-${companyInput}`}
                          onSelect={() => {
                            setSelectedCompany(companyInput);
                            setCompanyOpen(false);
                          }}
                        >
                          Utiliser "{companyInput}"
                        </CommandItem>
                      </CommandGroup>
                    )}

                  <CommandGroup heading="Entreprises">
                    {filteredCompanies.length === 0 && !companyInput && (
                      <CommandItem disabled value="no-results">
                        Aucune entreprise trouvée
                      </CommandItem>
                    )}

                    {filteredCompanies.map((company) => (
                      <CommandItem
                        key={company}
                        value={company}
                        onSelect={() => {
                          setSelectedCompany(company);
                          setCompanyOpen(false);
                        }}
                      >
                        {company}
                        {selectedCompany === company && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="job">Quel est ton boulot ?</Label>
          <Popover open={jobOpen} onOpenChange={handleJobOpenChange}>
            <PopoverTrigger asChild>
              <div
                role="combobox"
                aria-expanded={jobOpen}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
              >
                {selectedJob ? selectedJob : "Sélectionne ou saisis ton poste"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command shouldFilter={true}>
                <CommandInput
                  placeholder="Recherche de poste..."
                  className="h-9"
                  value={jobInput}
                  onValueChange={setJobInput}
                />
                <CommandList>
                  {jobInput &&
                    !filteredJobs.some(
                      (job) => job.toLowerCase() === jobInput.toLowerCase()
                    ) && (
                      <CommandGroup heading="Créer nouveau">
                        <CommandItem
                          key="new"
                          value={`new-${jobInput}`}
                          onSelect={() => {
                            setSelectedJob(jobInput);
                            setJobOpen(false);
                          }}
                        >
                          Utiliser "{jobInput}"
                        </CommandItem>
                      </CommandGroup>
                    )}

                  <CommandGroup heading="Postes">
                    {filteredJobs.length === 0 && !jobInput && (
                      <CommandItem disabled value="no-results">
                        Aucun poste trouvé
                      </CommandItem>
                    )}

                    {filteredJobs.map((job) => (
                      <CommandItem
                        key={job}
                        value={job}
                        onSelect={() => {
                          setSelectedJob(job);
                          setJobOpen(false);
                        }}
                      >
                        {job}
                        {selectedJob === job && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Label htmlFor="password">Choisis un mot de passe</Label>
        <div className="relative">
          <FloatingLabelInput
            label="Mot de passe"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            minLength={6}
            required
            suppressHydrationWarning
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>

        <SubmitButton pendingText="Inscription en cours...">
          S'inscrire
        </SubmitButton>

        {formMessage && "success" in formMessage && (
          <FormMessage message={formMessage} />
        )}
      </div>
    </form>
  );
}
