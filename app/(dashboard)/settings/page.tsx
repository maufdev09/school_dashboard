import Link from "next/link";

const settings = [
  {
    title: "Account",
    description: "Manage profile details and dashboard identity.",
    href: "/profile",
  },
  {
    title: "Messages",
    description: "Review school-wide communication and announcements.",
    href: "/list/messages",
  },
  {
    title: "Attendance",
    description: "Track attendance records by student, class, and lesson.",
    href: "/list/attendance",
  },
  {
    title: "Academic Lists",
    description: "Open teachers, students, classes, subjects, lessons, exams, and results.",
    href: "/list/students",
  },
];

const SettingsPage = () => {
  return (
    <div className="flex-1 p-4">
      <div className="bg-white rounded-md p-4">
        <h1 className="text-lg font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Quick access to the active school dashboard sections.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {settings.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="rounded-md border border-gray-100 p-4 hover:bg-lamaSkyLight transition-colors"
            >
              <h2 className="font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-gray-500">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
