export function missingWords(sent: string, received: string): string[] {
  const sentArr = sent.split(" ");
  const receivedArr = received.split(" ");

  const missing = [];

  let recPointer = 0;

  for (let sentPointer = 0; sentPointer < sentArr.length; sentPointer++) {
    if (sentArr[sentPointer] !== receivedArr[recPointer]) {
      missing.push(sentArr[sentPointer]); // after pushing it to missing, the sentPointer will move automatically forward as it is in for loop
    } else {
      // else means both words are same, so we dont need to add it to missing and also move recPointer now
      recPointer++;
    }
  }

  return missing;
}

const sent = "I choose a lazy person to do a hard job";
const received = "choose a person hard";

console.log(missingWords(sent, received));

/* 

I have to choose a lazy person to do a hard job
            |                            


choose a person hard
       |    


missing = [I, have, to, lazy, to, do, a, job]


- need two pointers - one at sent and other one at received
- do compare words at both the pointers. 
  - If found different, move only the sent
  - If found same, move both

Notice that in the above step, no matter what (same or different words) we move sent. So likely we should have sent inside for loop.
Have a separate pointer for j because it will be moved/incremented only when both the words are same

*/
