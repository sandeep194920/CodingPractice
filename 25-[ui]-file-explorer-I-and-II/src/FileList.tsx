import { useId, useState, type FC } from "react";
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
    // ARIA
    <ul role="group" className="file-list">
      {sortedFileList.map((file, index) => (
        <FileObject
          key={file.id}
          file={file}
          level={level}
          posinset={index + 1} // just so it starts from 1
          setsize={sortedFileList.length}
        />
      ))}
    </ul>
  );
};

export default FileList;

interface FileObjectProps {
  file: FileData;
  level: number;
  posinset: number;
  setsize: number;
}

const FileObject: FC<FileObjectProps> = ({
  file,
  level,
  posinset,
  setsize,
}) => {
  const { name: fileName, children: fileChildren } = file;
  const [isExpanded, setIsExpanded] = useState(false);

  const isDirectory = Boolean(fileChildren);

  const id = useId();

  return (
    <li
      role="treeitem"
      aria-expanded={isDirectory ? isExpanded : undefined}
      aria-labelledby={id}
      aria-level={level}
      aria-posinset={posinset} // index of the file within the file list
      aria-setsize={setsize} // number of items in this group
    >
      <button
        onClick={() => {
          if (!isDirectory) return;
          setIsExpanded((prev) => !prev);
        }}
        className={["file", isDirectory && "file-type-dir"]
          .filter(Boolean)
          .join(" ")}
      >
        <span id={id}>{fileName}</span>
        {isDirectory && <span>{isExpanded ? "-" : "+"}</span>}
      </button>
      {isExpanded && fileChildren && fileChildren.length > 0 && (
        <FileList fileList={fileChildren} level={level + 1} />
      )}
    </li>
  );
};
