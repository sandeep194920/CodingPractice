/* 
Implement a deepClone function that performs a deep clone operation on JavaScript objects. 
You can assume the input only contains JSON-serializable values (null, boolean, number, string, Array, Object) 
and will not contain any other objects like Date, Regex, Map or Set.
*/

const deepClone = <T>(val: T): T => {
  // check if value is array (this should come first before object, because, even array is the object)

  /* test a value to be array in 2 ways
  Either val?.constructor === Array
  Or     Array.isArray(value)
*/
  if (Array.isArray(val)) {
    return val.map((el) => deepClone(el)) as T;
  }

  // here the object can be anything like Date, String, and so on, val[key] complains.
  // Since we know from the question description that we only support Object, and Array, (Array is taken care of above)
  // we can be confident that this is going to be an object {}, so we can typecast it to {} or Record<string,unknown>
  if (typeof val === "object" && val !== null) {
    const clonedObject: Record<string, unknown> = {};

    for (const key of Object.keys(val)) {
      clonedObject[key] = deepClone((val as Record<string, unknown>)[key]);
    }

    return clonedObject as T;
  }

  // check if value is object
  // default return val (this would involve null, string, number, boolean, undefined)
  return val;
};

const obj1 = { user: { role: "admin" } };
const clonedObj1 = deepClone(obj1);

console.log(clonedObj1);

const obj2 = { foo: [{ bar: "baz" }] };
const clonedObj2 = deepClone(obj2);

console.log(clonedObj2);
