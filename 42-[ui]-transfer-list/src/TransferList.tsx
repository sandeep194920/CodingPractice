import {
  useId,
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";

const leftItemArray = ["HTML", "JavaScript", "CSS", "TypeScript"] as const;
const rightItemArray = ["React", "Angular", "Vue", "Svelte"] as const;

type Item = (typeof leftItemArray)[number] | (typeof rightItemArray)[number];

type Items = ReadonlyArray<Item>;

type ItemMap = Map<Item, boolean>;

const generateMap = (items: Items): ItemMap => {
  return new Map(items.map((item) => [item, false]));
};

const TransferList = () => {
  const [leftItems, setLeftItems] = useState<ItemMap>(
    generateMap(leftItemArray)
  );
  const [rightItems, setRightItems] = useState<ItemMap>(
    generateMap(rightItemArray)
  );

  const hasNoSelectedItems = (items: ItemMap) => {
    return Array.from(items).every(([, val]) => !val);
  };

  return (
    <article className="transfer-list__container">
      <Items items={leftItems} setItems={setLeftItems} />
      <div className="transfer-list__controls">
        <button
          aria-label="Transfer all items to left list"
          aria-hidden="true"
          disabled={rightItems.size === 0}
          onClick={() => {
            transferAllItems(
              rightItems,
              leftItems,
              setRightItems,
              setLeftItems
            );
          }}
        >
          &lt;&lt;
        </button>
        <button
          aria-hidden="true"
          aria-label="Transfer selected items to left list"
          disabled={hasNoSelectedItems(rightItems)}
          onClick={() => {
            transferItems(rightItems, leftItems, setRightItems, setLeftItems);
          }}
        >
          &lt;
        </button>
        <button
          aria-label="Transfer selected items to right list"
          aria-hidden="true"
          disabled={hasNoSelectedItems(leftItems)}
          onClick={() => {
            transferItems(leftItems, rightItems, setLeftItems, setRightItems);
          }}
        >
          &gt;
        </button>
        <button
          aria-label="Transfer all items to right list"
          aria-hidden="true"
          disabled={leftItems.size === 0}
          onClick={() => {
            transferAllItems(
              leftItems,
              rightItems,
              setLeftItems,
              setRightItems
            );
          }}
        >
          &gt;&gt;
        </button>
      </div>
      <Items items={rightItems} setItems={setRightItems} />
    </article>
  );
};

export default TransferList;

interface ItemsProps {
  items: ItemMap;
  setItems: Dispatch<SetStateAction<ItemMap>>;
}

const Items: FC<ItemsProps> = ({ items, setItems }) => {
  const handleCheck = (item: Item) => {
    setItems((prev) => {
      const newItems = new Map(prev);
      newItems.set(item, !newItems.get(item));
      return newItems;
    });
  };

  return (
    <ul className="transfer-list__items">
      {Array.from(items.entries()).map(([key, value]) => (
        <CheckboxItem
          key={key}
          label={key}
          checked={value}
          onChange={() => handleCheck(key)}
        />
      ))}
    </ul>
  );
};

interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onChange: VoidFunction;
}

const CheckboxItem: FC<CheckboxItemProps> = ({ label, checked, onChange }) => {
  const id = useId();

  return (
    <li>
      <input onChange={onChange} type="checkbox" id={id} checked={checked} />
      <label htmlFor={id}>{label}</label>
    </li>
  );
};

const transferItems = (
  itemsSrc: ItemMap,
  itemDest: ItemMap,
  setItemsSrc: Dispatch<SetStateAction<ItemMap>>,
  setItemsDest: Dispatch<SetStateAction<ItemMap>>
) => {
  const newItemsSrc = new Map(itemsSrc);
  const newItemsDest = new Map(itemDest);

  newItemsSrc.forEach((value, key) => {
    if (!value) return; // continue to next item if item is false (not selected).

    // If item is selected, remove from src and add to dest

    newItemsSrc.delete(key);
    newItemsDest.set(key, value);
  });

  setItemsSrc(newItemsSrc);
  setItemsDest(newItemsDest);
};

const transferAllItems = (
  itemsSrc: ItemMap,
  itemDest: ItemMap,
  setItemsSrc: Dispatch<SetStateAction<ItemMap>>,
  setItemsDest: Dispatch<SetStateAction<ItemMap>>
) => {
  setItemsSrc(new Map());
  setItemsDest(new Map([...itemDest, ...itemsSrc]));
};
