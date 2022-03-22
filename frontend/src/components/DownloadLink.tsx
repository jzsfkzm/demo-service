import { Link } from "@mui/material";
import React from "react";
import { API_URL, Job } from "../store/jobs";

type Props = {
  job: Job;
};

const DownloadLink: React.FunctionComponent<Props> = ({ job }) => {
  return (
    <React.Fragment>
      {job.state === 'completed' && (
        <Link href={`${API_URL}/jobs/${job.id}`}>download</Link>
      )}
      {job.state !== 'completed' && ("in progress")}
    </React.Fragment>
  )
};

export default DownloadLink;
