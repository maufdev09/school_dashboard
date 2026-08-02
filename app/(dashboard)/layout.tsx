import Image from "next/image";
import Link from "next/link";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { getSession } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="h-screen flex ">
      {/* Left Sidebar */}
      <div className="w-[14%] md:w-[8%]  lg:w-[16%] xl:w-[14%] bg-amber-200 overflow-scroll">
        <Link className="flex items-center justify-center gap-2" href="./">
          <Image src="/logo.PNG" alt="Logo" width={50} height={30} />
          <span className=" hidden lg:block font-bold">ScholarSuite</span>
        </Link>
        <Menu role={session.role} />
      </div>
      {/* Right Sidebar */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll  flex flex-col ">
        <Navbar session={session} />
        {children}
      </div>
    </div>
  );
}
