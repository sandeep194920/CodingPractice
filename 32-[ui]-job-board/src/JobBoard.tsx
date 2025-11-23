import { useCallback, useEffect, useRef, useState, type FC } from "react";

const PAGE_SIZE = 6;
const JOB_IDS_URL = "https://hacker-news.firebaseio.com/v0/jobstories.json";
const JOBS_URL = (id: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

type Job = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

const JobBoard = () => {
  const [page, setPage] = useState(0);
  const [jobIds, setJobIds] = useState<null | number[]>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);

  // Since API call is involved (async op), we need to first check if component is still mounted and then only set the state
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    // cleanup function to avoid state updates on unmounted component
    // we use isMounted.current === true check to set the state
    return () => {
      isMounted.current = false;
    };
  }, []);

  const getJobIds = useCallback(
    async (currPage: number): Promise<number[]> => {
      let ids = jobIds;

      if (!ids) {
        // if ids is null then only fetch the api
        const response = await fetch(JOB_IDS_URL);
        ids = await response.json();

        if (!isMounted.current) return [];

        setJobIds(ids);
      }

      const start = currPage * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      return ids?.slice(start, end) || [];
    },
    [jobIds]
  );

  const getJobs = useCallback(
    async (currPage: number): Promise<Job[]> => {
      // For current page, I need to get 6 jobs at max. We have URL to fetch a single job. Each job can be fetched using it's ID which is independent of each other so we can fetch all 6 in parallel.
      // So lets use Promise.all

      // First fetch jobIds for the current page. Then fetch jobs for those ids

      setIsFetchingJobs(true);
      const jobIds = await getJobIds(currPage); // This would give you an array of max 6 job ids

      const jobsForPage = await Promise.all(
        jobIds.map((id) => fetch(JOBS_URL(id)).then((res) => res.json()))
      );

      if (!isMounted.current) return []; // Don't set the state if component is unmounted

      //   setJobs((prev) => [...prev, ...jobsForPage]);

      setJobs((prevJobs) => {
        const jobMap = new Map(prevJobs.map((job) => [job.id, job]));
        jobsForPage.forEach((job) => jobMap.set(job.id, job)); // Add/Overwrite new jobs
        return Array.from(jobMap.values());
      });

      setIsFetchingJobs(false);

      return jobsForPage;
    },
    [getJobIds]
  );

  // Loads for the first time + whenever the page changes
  useEffect(() => {
    getJobs(page);
  }, [page, getJobs]);

  if (isFetchingJobs) return <h1>Loading....</h1>;

  // we can add an error handler if we want to - first make an error state similar to loading if you want to do that. Not doing it here

  return (
    <section className="jobs-container">
      {jobs.map(({ by, time, url, title }) => (
        <JobPostingItem by={by} time={time} url={url} title={title} />
      ))}
      {jobIds && jobIds.length > page * PAGE_SIZE + PAGE_SIZE && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isFetchingJobs}
        >
          {isFetchingJobs ? "Fetching Jobs" : "Load More"}
        </button>
      )}
    </section>
  );
};

export default JobBoard;

interface JobPostingItemProps {
  by: string;
  title: string;
  url: string;
  time: number;
}

const JobPostingItem: FC<JobPostingItemProps> = ({ by, title, url, time }) => {
  return (
    <article className="job-item">
      <h4>
        <a href={url}>{title}</a>
      </h4>
      <div>
        <span>By {by}</span>
        <span>.</span>
        <span>{new Date(time).toDateString()}</span>
      </div>
    </article>
  );
};
