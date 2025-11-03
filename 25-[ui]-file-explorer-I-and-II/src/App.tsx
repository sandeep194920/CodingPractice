import type { FC } from "react";
import "./App.css";
import type { FileData } from "./types";
import FileList from "./FileList";

const data = [
  {
    id: 0,
    name: "Story.md",
  },
  {
    id: 1,
    name: "README.md",
  },
  {
    id: 2,
    name: "Documents",
    children: [
      {
        id: 3,
        name: "Word.doc",
      },
      {
        id: 4,
        name: "Powerpoint.ppt",
      },
    ],
  },
  {
    id: 5,
    name: "Downloads",
    children: [
      {
        id: 6,
        name: "unnamed.txt",
      },
      {
        id: 7,
        name: "Misc",
        children: [
          {
            id: 8,
            name: "foo.txt",
          },
          {
            id: 9,
            name: "bar.txt",
          },
        ],
      },
    ],
  },
];

function App() {
  return (
    <div>
      <h2>File Explorer</h2>
      <FileExplorer fileList={data} />
    </div>
  );
}

export default App;

interface FileExplorer {
  fileList: ReadonlyArray<FileData>;
}

const FileExplorer: FC<FileExplorer> = ({ fileList }) => {
  return <FileList fileList={fileList} level={1} />;
};
