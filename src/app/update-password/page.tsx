import Navbar from "@/app/components/Navbar";
// import { UpdatePassword } from "@/components/update-password-form";
import UpdatePassword from "@/components/update-password-form";

export default function page() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <UpdatePassword />
        </div>
      </div>
    </>
  );
}
