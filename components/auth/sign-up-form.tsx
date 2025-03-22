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

  // Convert string arrays to Option arrays for MultipleSelector
  const assoOptions: Option[] = associations.map((asso) => ({
    value: asso,
    label: asso,
  }));

  const handleSubmit = async (formData: FormData) => {
    // Add the selected options to the form data
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
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="Select your join year" />
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
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger>
              <SelectValue placeholder="Select your company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="job">Job (optional)</Label>
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger>
              <SelectValue placeholder="Select your job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {jobs.map((job) => (
                <SelectItem key={job} value={job}>
                  {job}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

        {formMessage && <FormMessage message={formMessage} />}
      </div>
    </form>
  );
}
