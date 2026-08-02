import { prisma } from "@/app/lib/prisma";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = async () => {
  const [admin, teachers, students, parents, announcements] = await Promise.all([
    prisma.admin.findFirst({ orderBy: { username: "asc" } }),
    prisma.teacher.count(),
    prisma.student.count(),
    prisma.parent.count(),
    prisma.announcement.findMany({
      take: 3,
      orderBy: { date: "desc" },
      include: { class: { select: { name: true } } },
    }),
  ]);

  const cards = [
    { label: "Teachers", value: teachers, href: "/list/teachers" },
    { label: "Students", value: students, href: "/list/students" },
    { label: "Parents", value: parents, href: "/list/parents" },
  ];

  return (
    <div className="flex-1 p-4 flex flex-col gap-4">
      <div className="bg-lamaSky p-6 rounded-md flex flex-col md:flex-row gap-6">
        <Image
          src="/avatar.png"
          alt="Profile"
          width={112}
          height={112}
          className="h-28 w-28 rounded-full object-cover bg-white"
        />
        <div className="flex flex-1 flex-col justify-center gap-3">
          <div>
            <p className="text-sm text-gray-600">Signed in as</p>
            <h1 className="text-2xl font-semibold">
              {admin?.username ?? "School Admin"}
            </h1>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white px-3 py-1">Admin</span>
            <span className="rounded-full bg-white px-3 py-1">
              ScholarSuite
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            href={card.href}
            key={card.label}
            className="bg-white rounded-md p-4 hover:bg-lamaSkyLight transition-colors"
          >
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-semibold mt-2">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-md p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Messages</h2>
          <Link className="text-sm text-gray-500" href="/list/messages">
            View all
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="border-b border-gray-100 pb-3 last:border-b-0"
            >
              <p className="font-medium">{announcement.title}</p>
              <p className="text-sm text-gray-500">
                {announcement.class?.name ?? "All classes"} ·{" "}
                {new Intl.DateTimeFormat("en-US").format(announcement.date)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
