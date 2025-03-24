import { SignUpForm } from "@/components/auth/sign-up-form";
import { FormMessage, Message } from "@/components/form-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center h-screen sm:max-w-md mx-auto p-4">
      <SignUpForm message={searchParams} />
    </div>
  );
}
