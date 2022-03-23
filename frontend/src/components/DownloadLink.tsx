import { LinearProgress, Link } from "@mui/material";
import React from "react";
import { HTTP_API_URL, Job } from "../store/jobs";

type Props = {
  job: Job;
};

const DownloadLink: React.FunctionComponent<Props> = ({ job }) => {
  return (
    <React.Fragment>
      {job.state === 'completed' && (
        <Link href={`${HTTP_API_URL}/jobs/${job.id}`}>download</Link>
      )}
      {job.state === 'active' && (<LinearProgress />)}
      {!['active', 'completed'].includes(job.state) && (`${job.state}`)}
    </React.Fragment>
  )
};

export default DownloadLink;
