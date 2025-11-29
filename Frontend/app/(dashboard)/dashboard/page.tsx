import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";

const dummyTasks = [
  {
    _id: "69298be0b54d4d4fd3be3b91",
    title: "Do a Prank",
    description: "Run!......",
    status: "Completed",
    createdAt: "2025-11-28T11:47:44.886Z",
    updatedAt: "2025-11-28T12:08:11.644Z",
    __v: 0,
  },
  {
    _id: "69298be0b54d4d4fd3be3b92",
    title: "Unsubscribe All stupid channels",
    description: "yoi yoii yoiii",
    status: "Pending",
    createdAt: "2025-11-28T11:47:44.886Z",
    updatedAt: "2025-11-28T12:08:11.644Z",
    __v: 0,
  },
];

const DashboardPage = () => {
  return (
    <section className="container mx-auto px-8 py-10">
      <DataTable columns={columns} data={dummyTasks} />
    </section>
  );
};

export default DashboardPage;
