## Missing words

Asked at IBM

`Approx time - 10 mins`

It was very difficult to solve the first time I saw. The reason I made it complex in my mind is because I was just randomly thinking should I be using map, or object or any data structure; Am I going in wrong direction and so on....

This kind of thinking often leads to distraction and never allow solving the problem as it hijacks clear thinking.

**What is "Clear thinking"?**

The first priority of solving any problem, specifically DSA problem is that, you need to believe that, 99.9% of problems can be solved and coded the same way you _manually approach_ that problem.

This problem is no different.

### Problem statement

You send a text to someone and a few words are missing at the receivers end. Return those missing words.

```ts
sent = I have to choose a lazy person to do a hard job
received = choose a person hard

return -> [I, have, to, lazy, to, do, a] // these are all missing in sent
```

**Why was it confusing?**

I was overthinking in these lines:

- What about case - should I convert everything to lower case?
- Should I use a frequency map like object or a map ds to store the number of occurrances? I do this in other similar problems, so should I do the same?
- It seems so easy to do but my test cases are failing. Am I an idiot?

All these thoughts are valid. But at the same time, these thoughts would stop you to think clearly.

**How to approach it then?**

Before you go along the above lines of thinking, I'll teach you the right way.

- First and foremost, forget about coding the problem. Focus on clearly understanding the problem and then, _manually approach the problem and get a solution_. This is very easy right.

I mean, if I show you two texts like this

```ts
text1 = "I am a programmer.";
text2 = "I am";
```

If I then ask you what's different, your eyes generally goes through both texts and say "a programmer." is missing.

That's exactly right. Now, how did you know that, that's by practice. Your eyes and brain are so good at recognizing the difference subconsiously. And the best part is, it has a process to do - you need to highlight that and slowdown to recognize and ask, how did my eyes and brain co-ordinate and do that?

Here's the approach it takes

- Go through each word in `text1`, while going through, check if that word exists in `text2`. If yes ignore and keep going. If no, remember that word and keep going.

That's it! That is the pattern. Go over this over and over to put that into code like this.

```

You have 2 sentences:

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

```

Practice this way! It won't come until you practice, but this is the way to practice and trust me, even dynamic programming feels like writing A-Z once you master this approach. Why? Because coding is about writing what you see.

- From now on, I'll try to do a manual write up the approach in this style, and then code.
