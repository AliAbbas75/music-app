import DataTable from "@/components/TanstackTable"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link } from "react-router-dom"
import ImportSongButton from "@/components/importSongButton"

const data = [
  {
    id: 1,
    name: "Summer Vibes Mix",
    date: "2023-03-01",
    lastEdited: "2023-03-01T10:00:00Z",
    progress: 40,
    status: "in_progress",
    type: "RETRO",
  },
  {
    id: 2,
    name: "Electro Beats 2.0",
    date: "2023-03-02",
    lastEdited: "2023-03-02T08:30:00Z",
    progress: 80,
    status: "in_progress",
    type: "EDM",
  },
  {
    id: 3,
    name: "Chill Night Remix",
    date: "2023-03-03",
    lastEdited: "2023-03-03T12:15:00Z",
    progress: 50,
    status: "draft",
    type: "MIX",
  },
  {
    id: 4,
    name: "Lo-Fi Study Session",
    date: "2023-03-04",
    lastEdited: "2023-03-04T09:20:00Z",
    progress: 70,
    status: "in_progress",
    type: "LOFI",
  },
  {
    id: 5,
    name: "Hip Hop Mashup Vol.1",
    date: "2023-03-05",
    lastEdited: "2023-03-05T11:10:00Z",
    progress: 55,
    status: "draft",
    type: "HIPHOP",
  },
  {
    id: 6,
    name: "Retro Disco Throwback",
    date: "2023-03-06",
    lastEdited: "2023-03-06T07:45:00Z",
    progress: 65,
    status: "in_progress",
    type: "RETRO",
  },
  {
    id: 7,
    name: "Sunset Chill Beats",
    date: "2023-03-07",
    lastEdited: "2023-03-07T14:20:00Z",
    progress: 90,
    status: "completed",
    type: "LOFI",
  },
  {
    id: 8,
    name: "Bass Drop Madness",
    date: "2023-03-08",
    lastEdited: "2023-03-08T13:15:00Z",
    progress: 30,
    status: "draft",
    type: "EDM",
  },
  {
    id: 9,
    name: "Morning Jazz Flow",
    date: "2023-03-09",
    lastEdited: "2023-03-09T09:00:00Z",
    progress: 75,
    status: "in_progress",
    type: "JAZZ",
  },
  {
    id: 10,
    name: "Night Drive Synthwave",
    date: "2023-03-10",
    lastEdited: "2023-03-10T22:10:00Z",
    progress: 85,
    status: "completed",
    type: "SYNTH",
  },
  {
    id: 11,
    name: "Relaxing Piano Sessions",
    date: "2023-03-11",
    lastEdited: "2023-03-11T16:45:00Z",
    progress: 45,
    status: "draft",
    type: "CLASSICAL",
  },
  {
    id: 12,
    name: "Festival Hype Mix",
    date: "2023-03-12",
    lastEdited: "2023-03-12T19:30:00Z",
    progress: 60,
    status: "in_progress",
    type: "EDM",
  },
  {
    id: 13,
    name: "Acoustic Vibes",
    date: "2023-03-13",
    lastEdited: "2023-03-13T12:25:00Z",
    progress: 95,
    status: "completed",
    type: "ACOUSTIC",
  },
  {
    id: 14,
    name: "Deep House Grooves",
    date: "2023-03-14",
    lastEdited: "2023-03-14T15:00:00Z",
    progress: 20,
    status: "draft",
    type: "HOUSE",
  },
  {
    id: 15,
    name: "Pop Hits Remixed",
    date: "2023-03-15",
    lastEdited: "2023-03-15T18:40:00Z",
    progress: 70,
    status: "in_progress",
    type: "POP",
  },
  {
    id: 16,
    name: "Chillhop Essentials",
    date: "2023-03-16",
    lastEdited: "2023-03-16T21:50:00Z",
    progress: 55,
    status: "draft",
    type: "LOFI",
  },
  {
    id: 17,
    name: "Indie Rock Collection",
    date: "2023-03-17",
    lastEdited: "2023-03-17T10:35:00Z",
    progress: 65,
    status: "in_progress",
    type: "ROCK",
  },
  {
    id: 18,
    name: "Funky Groove Night",
    date: "2023-03-18",
    lastEdited: "2023-03-18T09:50:00Z",
    progress: 40,
    status: "draft",
    type: "FUNK",
  },
  {
    id: 19,
    name: "Ambient Soundscape",
    date: "2023-03-19",
    lastEdited: "2023-03-19T20:10:00Z",
    progress: 100,
    status: "completed",
    type: "AMBIENT",
  },
  {
    id: 20,
    name: "Drum & Bass Essentials",
    date: "2023-03-20",
    lastEdited: "2023-03-20T14:00:00Z",
    progress: 85,
    status: "in_progress",
    type: "DNB",
  },
  {
    id: 21,
    name: "Latin Fiesta Mix",
    date: "2023-03-21",
    lastEdited: "2023-03-21T11:25:00Z",
    progress: 50,
    status: "draft",
    type: "LATIN",
  },
  {
    id: 22,
    name: "Trance Energy",
    date: "2023-03-22",
    lastEdited: "2023-03-22T17:35:00Z",
    progress: 75,
    status: "in_progress",
    type: "TRANCE",
  },
  {
    id: 23,
    name: "Classic Rock Legends",
    date: "2023-03-23",
    lastEdited: "2023-03-23T08:45:00Z",
    progress: 60,
    status: "completed",
    type: "ROCK",
  },
  {
    id: 24,
    name: "Soulful Sunday",
    date: "2023-03-24",
    lastEdited: "2023-03-24T10:55:00Z",
    progress: 35,
    status: "draft",
    type: "SOUL",
  },
  {
    id: 25,
    name: "Melodic Techno Vibes",
    date: "2023-03-25",
    lastEdited: "2023-03-25T19:20:00Z",
    progress: 65,
    status: "in_progress",
    type: "TECHNO",
  },
  {
    id: 26,
    name: "Reggae Sunshine",
    date: "2023-03-26",
    lastEdited: "2023-03-26T13:40:00Z",
    progress: 90,
    status: "completed",
    type: "REGGAE",
  },
  {
    id: 27,
    name: "Hardstyle Attack",
    date: "2023-03-27",
    lastEdited: "2023-03-27T16:30:00Z",
    progress: 45,
    status: "draft",
    type: "HARDSTYLE",
  },
  {
    id: 28,
    name: "Blues Classics",
    date: "2023-03-28",
    lastEdited: "2023-03-28T12:00:00Z",
    progress: 80,
    status: "in_progress",
    type: "BLUES",
  },
  {
    id: 29,
    name: "Cinematic Trailer Sounds",
    date: "2023-03-29",
    lastEdited: "2023-03-29T15:45:00Z",
    progress: 55,
    status: "completed",
    type: "CINEMATIC",
  },
  {
    id: 30,
    name: "Experimental Beats",
    date: "2023-03-30",
    lastEdited: "2023-03-30T09:05:00Z",
    progress: 25,
    status: "draft",
    type: "EXPERIMENTAL",
  },
];




// Column definitions for Tanstack Table
const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.getValue("date")).toLocaleDateString(),
    filterFn: "equalsString", // built-in: exact match on the ISO string
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: (info) => `${info.getValue()}%`,   // ✅ cleaner, no "progress" string
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const label =
        status === "in_progress"
          ? "In Progress"
          : status === "completed"
            ? "Completed"
            : "Saved Draft";

      const statusClass =
        status === "in_progress"
          ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
          : status === "completed"
            ? "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
            : "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs";

      return <span className={statusClass}>{label}</span>;
    },
    filterFn: "equalsString", // exact match for select dropdown
  },
  {
    accessorKey: "lastEdited",
    header: "Last Edited",
    cell: ({ row }) => new Date(row.getValue("lastEdited")).toLocaleString(),
  },
  {
    accessorKey: "type", // make sure your data includes this
    header: "Type",
    filterFn: "equalsString",
  },
];



export default function Dashboard() {
  const [rowSelection, setRowSelection] = useState({})
  const [selectedRows, setSelectedRows] = useState([])


  return (
    <>
      <Card className={'m-2 p-2 py-3 shadow-none border-0'}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Welcome back DJ Nova! 🎧</h1>

          <div className="flex flex-wrap gap-2">
            <ImportSongButton/>
            <Link to={"/airemix"}>
              <Button className="h-14 rounded-full text-lg text-accent-foreground bg-background">
                New Remix ➡️
              </Button>
            </Link>
          </div>
        </div>
      </Card>
      <Card className={"m-2 p-0 shadow-none border-0"}>
        <div className="flex flex-col gap-4 p-4">
          {/* Add tanstack table */}
          <h1 className=" text-2xl font-bold">Current Projects</h1>
          <DataTable
            data={data}
            columns={columns}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            onSelectedRowsChange={setSelectedRows}
          />
        </div>
      </Card>
    </>
  )
}

