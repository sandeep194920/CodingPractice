import { useState, type FC } from "react";
import type { FileData } from "./types";

// level is not used anywhere since we are just styling directl in css - padding-left:16px
// But you can omit that css and do style prop based on level
interface FileListProps {
  fileList: ReadonlyArray<FileData>;
  level: number;
}

const FileList: FC<FileListProps> = ({ fileList, level }) => {
  // Files should be sorted. Directories must come first before files

  const directories = fileList
    .filter((file) => file.children)
    .sort((a, b) => a.name.localeCompare(b.name));

  const nonDirectories = fileList
    .filter((file) => !file.children)
    .sort((a, b) => a.name.localeCompare(b.name));

  const sortedFileList = [...directories, ...nonDirectories];

  return (
    <ul className="file-list">
      {sortedFileList.map((file) => (
        <FileObject key={file.id} file={file} level={level} />
      ))}
    </ul>
  );
};

export default FileList;

interface FileObjectProps {
  file: FileData;
  level: number;
}

const FileObject: FC<FileObjectProps> = ({ file, level }) => {
  const { name: fileName, children: fileChildren } = file;
  const [isExpanded, setIsExpanded] = useState(false);

  const isDirectory = Boolean(fileChildren);

  return (
    <li>
      <button
        onClick={() => {
          if (!isDirectory) return;
          setIsExpanded((prev) => !prev);
        }}
        className={["file", isDirectory && "file-type-dir"]
          .filter(Boolean)
          .join(" ")}
      >
        <span>{fileName}</span>
        {isDirectory && <span>{isExpanded ? "-" : "+"}</span>}
      </button>
      {isExpanded && fileChildren && fileChildren.length > 0 && (
        <FileList fileList={fileChildren} level={level + 1} />
      )}
    </li>
  );
};
