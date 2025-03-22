"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { FloatingLabelInput } from "@/components/ui-expansion/floating-label-input";
import MultipleSelector, {
  Option,
} from "@/components/ui-expansion/multiple-selector";
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
  const [selectedCompany, setSelectedCompany] = useState<Option[]>([]);
  const [selectedJob, setSelectedJob] = useState<Option[]>([]);
  const [selectedYear, setSelectedYear] = useState<Option[]>([]);

  // Convert string arrays to Option arrays for MultipleSelector
  const assoOptions: Option[] = associations.map((asso) => ({
    value: asso,
    label: asso,
  }));

  const companyOptions: Option[] = companies.map((company) => ({
    value: company,
    label: company,
  }));

  const jobOptions: Option[] = jobs.map((job) => ({
    value: job,
    label: job,
  }));

  const yearOptions: Option[] = joinYears.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const handleSubmit = async (formData: FormData) => {
    // Add the selected options to the form data
    if (selectedAsso.length > 0) {
      formData.append(
        "other_hec_asso",
        JSON.stringify(selectedAsso.map((option) => option.value))
      );
    }

    if (selectedCompany.length > 0 && selectedCompany[0].value !== "") {
      formData.append("company", selectedCompany[0].value);
    }

    if (selectedJob.length > 0 && selectedJob[0].value !== "") {
      formData.append("job", selectedJob[0].value);
    }

    if (selectedYear.length > 0) {
      formData.append("join_year", selectedYear[0].value);
    }

    // Call the action
    await signUpAction(formData);
  };

  return (
    <form
      className="flex-1 flex flex-col min-w-64 space-y-6"
      action={handleSubmit}
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingLabelInput
            label="First Name"
            name="first_name"
            autoComplete="given-name"
            required
          />
          <FloatingLabelInput
            label="Last Name"
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

        <FloatingLabelInput label="Nickname (optional)" name="nickname" />

        <FloatingLabelInput
          label="Phone Number (optional)"
          name="phone_number"
          type="tel"
          autoComplete="tel"
        />

        <div className="space-y-2">
          <Label htmlFor="join_year">Join Year</Label>
          <MultipleSelector
            value={selectedYear}
            onChange={setSelectedYear}
            placeholder="Select your join year"
            options={yearOptions}
            hidePlaceholderWhenSelected
            maxSelected={1}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="other_hec_asso">HEC Associations</Label>
          <MultipleSelector
            value={selectedAsso}
            onChange={setSelectedAsso}
            placeholder="Select your associations"
            options={assoOptions}
            hidePlaceholderWhenSelected
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company (optional)</Label>
          <MultipleSelector
            value={selectedCompany}
            onChange={setSelectedCompany}
            placeholder="Select your company"
            options={companyOptions}
            hidePlaceholderWhenSelected
            maxSelected={1}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="job">Job (optional)</Label>
          <MultipleSelector
            value={selectedJob}
            onChange={setSelectedJob}
            placeholder="Select your job"
            options={jobOptions}
            hidePlaceholderWhenSelected
            maxSelected={1}
          />
        </div>

        <FloatingLabelInput
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
        />

        <SubmitButton pendingText="Signing up...">Sign up</SubmitButton>

        <FormMessage message={formMessage} />
      </div>
    </form>
  );
}
