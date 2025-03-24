import { SignInForm } from "@/components/auth/sign-in-form";
import { Message } from "@/components/form-message";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full flex-1 flex items-center justify-center h-screen sm:max-w-md mx-auto p-4">
      <SignInForm message={searchParams} />
    </div>
  );
}
