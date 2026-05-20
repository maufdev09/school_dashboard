import Announcements from "@/app/components/Announcements";
import BigCalender from "@/app/components/BigCalender";

const parents = () => {
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className=" text-xl font-semibold ">Schedule (4A)</h1>
          <BigCalender />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3">
        <Announcements />
      </div>
    </div>
  );
};

export default parents;
