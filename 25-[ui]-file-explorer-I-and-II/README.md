# File Explorer

`Approx time - 15 mins`

This is a nested file explorer with ARIA labels

File Explorer III will be done using flatlist

## Things learnt

- Recursive way to think

  `FileList` ->calls `FileObject` -> `FlieList`

- `sort` and `localeCompare`

- `ARIA Labels`

---

#### ARIA Labels used

1. on container of main file explorer

`aria-label="Files Explorer" role="tree"`

```ts
const FileExplorer: FC<FileExplorer> = ({ fileList }) => {
  return (
    <div aria-label="Files Explorer" role="tree">
      <FileList fileList={fileList} level={1} />
    </div>
  );
};
```

2. In `ul` containers - file list

`role="group"`

```ts
 <ul role="group" className="file-list">
```

3. In `li` - file object

```bash
role = "treeitem";
aria-expanded; // true/false for directories based on open/close state and undefined for files

aria-labelledby; // id of file name
id; // must be added to file name based on which we can define aria-labelledby to the li item

aria-level; // level of the file - how nested it is

aria-posinset; // position of the file in the group - Index is sufficient

aria-setsize; // number of elements in the group of the files
```

```ts
 <li
  role="treeitem"
  aria-expanded={isDirectory ? isExpanded : undefined}
  aria-labelledby={id}
  aria-level={level}
  aria-posinset={posinset} // index of the file within the file list
  aria-setsize={setsize} // number of items in this group
>
```
