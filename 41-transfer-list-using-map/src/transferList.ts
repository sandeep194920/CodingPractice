const leftItems = ["HTML", "JavaScript", "CSS", "TypeScript"] as const;

const rightItems = ["React", "Angular", "Vue", "Svelte"] as const;

type Item = (typeof leftItems)[number] | (typeof rightItems)[number];

/* 
Problem

1. Generate a map both left and right items where key is item and value is boolean (initially set to false)
2. Write a function to set a few items from one of the maps to true
3. Write a function to transfer items from one map to another map based on src and dest selected. Note that only items with value "true" must move to another list
*/

// 1. Generate Map from Array

const generateMap = (items: ReadonlyArray<Item>) => {
  return new Map(items.map((item) => [item, false]));
};

const leftItemsMap = generateMap(leftItems);
const rightItemsMap = generateMap(rightItems);

// 2. Set all elements to true in left list except for HTML and CSS

leftItemsMap.forEach((_, key) => {
  if (key === "HTML" || key === "CSS") return;
  leftItemsMap.set(key, true);
});

// 3. Transfer items that are true from left list to right list. i.e., Delete items in src that are true and add it to destination

type ItemMap = Map<Item, boolean>;

const transferItems = (srcItems: ItemMap, destItems: ItemMap): ItemMap => {
  srcItems.forEach((val, key) => {
    if (!val) return;

    destItems.set(key, val);
  });
  return destItems;
};

const destinationMap = transferItems(leftItemsMap, rightItemsMap);

console.log(destinationMap);
