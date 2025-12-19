# [TODO List](https://www.greatfrontend.com/questions/user-interface/todo-list)

`Approx time - 25m`

## Things learnt

- Why GreatFrontEnd solution is not perfect here?

- How to properly handle duplicate results caused by react strict mode? Why the duplicates are caused even after updating the state conditionally by checking if `isMounted.current === true`?

- What is isMounted and why we need to use that? [Strongly recommend reading this claude chat first to know the flow](https://claude.ai/share/c01447f3-dce9-4259-a62c-641cd60276d3). This is when I was revising this problem second time. So I exactly spotted the error.

---

#### 1. React Strict Mode, and why GreatFrontEnd solution is not so great here?

For your reference - [Chat with Claude](https://claude.ai/share/56da85d8-3b59-4a77-8a14-5411b95991b5)

##### What React Strict mode does mainly - what should you be aware of? VERY IMPORTANT FOR INTERVIEWS

- React Strict Mode `mounts => unmounts => remounts` a component (JobBoard) in this case. The reason it does this is to mimic real world edge case that might happen in production (no strict mode in prod, but same behaviour of mount -> unmount and remount can be caused due to multiple things like tab switching and coming back to same tab and so on...).

- When this happens, react checks if our code is resilient to any kind of side effects like memory leaks. For example, if we are using animation inside useEffect, if user goes to other tab and comes back the comp mounts -> unmounts and remounts causing the animation not cleaned up properly so when user comes next time (remount) the animation is not shown properly as it wasn't cleaned up before.

- So react ensures we cleanup all the side effects inside useEffect (using appropriate cleanup functions so that the code is relisient to mount -> unmount -> remount)

---

##### 2. Why GreatFrontend solution is not good here?

Please look at the [official GFE solution](https://www.greatfrontend.com/questions/user-interface/job-board?practice=practice&tab=coding) before we speak further.

The code works but you can see they are doing two things wrong here:

1. Not adding `fetchJobs` as a dependency in the useEffect.

```tsx
useEffect(() => {
  fetchJobs(page);
}, [page]); // missing fetchJobs
```

If we add this, then the problem is - whenever the useEffect runs `fetchJobs` inside it runs. `fetchJobs` has a code that sets the state so the component re-renders due to which _signature of `fetchJobs`_ change and rerun the useEffect again causing it to **infinite renders**

So the right way to handle this is to still include `fetchJobs` inside useEffect and wrap `fetchJobs` inside `useCallback` hook.

2. When we wrap the `fetchJobs` in the `useCallback` there will be a second issue with GreatFrontend solution. Currently they are doing the below in the `fetchJobs`.

```ts
const combinedJobs = [...jobs, ...jobsForPage];
setJobs(combinedJobs);
```

Notice we have `jobs` that must be added as a dependency to the `useCallback` that wraps `fetchJobs`. If we do that then `setJobs(combinedJobs);` causes **infinite renders** again due to `jobs` being one of the dependencies in the `useCallback`.

So the below comment they (GFE) have made is not appropriate.

```ts
// useEffect (and hence `fetchJobs`) runs twice on component mount
// during development in Strict Mode.
//
// But since the value of `jobs` within the closure is the same,
// the resulting combined jobs will be the same, assuming the results
// for the API stays the same between requests.
const combinedJobs = [...jobs, ...jobsForPage];
setJobs(combinedJobs);
```

**What's the solution to this?**

We shouldn't be using the below pattern.

```ts
const combinedJobs = [...jobs, ...jobsForPage];
setJobs(combinedJobs);
```

Instead, we should do a functional state update that gives access to previous jobs like this.

```ts
// const combinedJobs = [...jobs, ...jobsForPage]; // not required as prevJobs below gives access to previous jobs
setJobs((prevJobs) => [...prevJobs, ...jobsForPage]);
```

But this has got another problem now - The Duplicates. See below question to understand how to properly deal with the duplicates.

---

##### 3. How to properly handle duplicate results caused by react strict mode?

First let's understand why duplicates are caused here.

As you know from first question how react strict mode `mounts -> unmounts -> remounts` the component, let's see practically what happens here.

> - First understand why we are using isMount ref. The idea is, `fetchJobs` might take a long time to complete, and we
>   can't be sure if component is still mounted by the time the fetch completes. We don't want to update the state if comp
>   is not mounted, so we check if comp is still mounted by doing `isMounted.current` and then only update the state.

> - **Btw, one key thing to note is, react can update the state on an unmounted component as well (by providing a warning saying - can't apply state updates on an unmounted component). What it actually means is, react puts that state update in the queue but can't really re-render the component with new state update as the component is unmounted. BUT THE IMPORTANT POINT IS, the state update that did on an unmounted component could still be on queue causing us problems if the component gets remounted immediately WHICH IS THE CORE ISSUE IN OUR JOB_BOARD PROBLEM**

**1. First mount**

- useEffect runs

```tsx
useEffect(() => {
  fetchJobs(page);
}, [page, fetchJobs]);
```

- `fetchJobs` runs that's executed by useEffect above

Here, the setJobs run and `prevJobs` is `[]` on this run as there's no previous jobs in the queue yet.

Note that, the component might be still mounted so `if (!isMounted.current)` returns false meaning, isMounted is still true, and `setJobs` is executed.

**2. Unmount**

After running `setJobs` the Strict mode (or some use case in real life prod like tab switching) unmounts the component. The `setJobs` update is now queued and can't perform a re-render as the component doesn't exist.
**But the big takeaway is, the state update could be in the queue, that means, next time prevJobs use this queued state which causes duplicates**

**3. Remount**

Immediately, before the queue is cleared, the strict mode remounts the component. Now same things that was in **Mount** phase (phase 1) run again.

```tsx
useEffect(() => {
  fetchJobs(page);
}, [page, fetchJobs]);
```

runs causing `fetchJobs` to run. Now `setJobs(prevJobs => [...prevJobs, ...jobsForPage])` gets run. `prevJobs` is now the one taken from queue (that wasn't applied before due to sudden unmounting of component) and applied. This causes duplicates as `jobsForPage` is same as `prevJobs`.

So the proper solution to this is to check and remove duplicates using the `Map` like this.

```tsx
setJobs((prevJobs) => {
  const jobMap = new Map(prevJobs.map((job) => [job.id, job])); // jobsMap keeps only one copy and not the duplicates
  jobsForPage.forEach((job) => jobMap.set(job.id, job));
  return Array.from(jobMap.values());
});
```

**_This is now a perfect solution!_**

---
