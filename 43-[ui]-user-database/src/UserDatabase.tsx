import { useState, type FormEvent } from "react";

const generateId = (() => {
  let id = 0;
  return () => `${id++}`;
})();

const UserDatabase = () => {
  const [search, setSearch] = useState("");

  const [fname, setFname] = useState("");

  const [lname, setLname] = useState("");

  const [selected, setSelected] = useState<string | null>(null);

  const [users, setUsers] = useState([
    { id: generateId(), fname: "Sandeep", lname: "Amarnath" },
  ]);

  const filteredUsers = users.filter(
    ({ fname, lname }) =>
      fname.toLowerCase().includes(search.toLowerCase()) ||
      lname.toLowerCase().includes(search.toLowerCase())
  );

  const disabledStates = {
    create: !!selected || fname === "" || lname === "",
    update: selected === null,
    delete: selected === null,
    cancel: selected === null,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(
      e.currentTarget,
      (e.nativeEvent as SubmitEvent).submitter
    );

    const intent = formData.get("intent");

    switch (intent) {
      case "create":
        handleCreate();
        break;
      case "update":
        handleUpdate();
        break;
      case "delete":
        handleDelete();
        break;
      case "cancel":
        handleCancel();
        break;
      default:
        throw new Error(`Invalid intent ${intent}`);
    }
  };

  const handleCreate = () => {
    setUsers((prev) => {
      //   const newUsers = prev.concat({
      //     id: generateId(),
      //     fname,
      //     lname,
      //   });

      // OR
      const newUsers = [
        ...prev,
        {
          id: generateId(),
          fname,
          lname,
        },
      ];

      return newUsers;
    });
    setFname("");
    setLname("");
  };

  const handleUpdate = () => {
    if (!selected) return;
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === selected) {
          return {
            ...user,
            fname,
            lname,
          };
        }
        return user;
      })
    );
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter(({ id }) => id !== selected));
    handleCancel();
  };

  const handleCancel = () => {
    setSelected(null);
    setFname("");
    setLname("");
  };

  return (
    <form onSubmit={handleSubmit} className="db__container">
      <input
        aria-label="Search users"
        type="search"
        placeholder="Search"
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />

      <div className="middle-row">
        <select
          value={selected || "default"}
          onChange={({ target }) => {
            const selectedId = target.value;

            setSelected(selectedId);

            const user = users.find((user) => user.id === selectedId);

            if (user) {
              setFname(user.fname);
              setLname(user.lname);
            }
          }}
          className="select"
          size={5}
        >
          {/* This is required - which is not in the official solution. Needed so that the selected option when canceled doesnt remain selected (which is browser's default) */}
          <option value="default" style={{ display: "none" }}>
            Default
          </option>
          {filteredUsers.map(({ id, fname, lname }) => (
            <option key={id} value={id}>
              {fname} {lname}
            </option>
          ))}
        </select>

        <div className="name__inputs">
          <label>
            First Name:
            <input
              type="text"
              value={fname}
              onChange={({ target }) => setFname(target.value)}
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              value={lname}
              onChange={({ target }) => setLname(target.value)}
            />
          </label>
        </div>
      </div>

      <div className="buttons">
        <button name="intent" value="create" disabled={disabledStates.create}>
          Create
        </button>
        <button name="intent" value="update" disabled={disabledStates.update}>
          Update
        </button>
        <button name="intent" value="delete" disabled={disabledStates.delete}>
          Delete
        </button>
        <button name="intent" value="cancel" disabled={disabledStates.cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserDatabase;
