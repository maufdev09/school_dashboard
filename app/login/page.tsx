import { login } from "@/app/lib/auth-actions";
import { roles } from "@/app/lib/auth";
import Image from "next/image";

const labels = {
  admin: "Admin",
  teacher: "Teacher",
  student: "Student",
  parent: "Parent",
};

const LoginPage = () => {
  return (
    <main className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-md p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Image src="/logo.PNG" alt="" width={48} height={32} />
          <div>
            <h1 className="text-xl font-semibold">ScholarSuite</h1>
            <p className="text-sm text-gray-500">Choose a demo role to enter.</p>
          </div>
        </div>

        <form action={login} className="mt-6 flex flex-col gap-3">
          {roles.map((role) => (
            <button
              key={role}
              name="role"
              value={role}
              className="rounded-md border border-gray-100 p-3 text-left hover:bg-lamaSkyLight"
            >
              <span className="font-semibold">{labels[role]}</span>
              <span className="block text-sm text-gray-500">
                Continue as {labels[role].toLowerCase()}
              </span>
            </button>
          ))}
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
