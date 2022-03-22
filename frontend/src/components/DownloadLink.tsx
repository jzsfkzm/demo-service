import { Link } from "@mui/material";
import React from "react";
import { Job } from "../store/jobs";

type Props = {
  job: Job;
};

const DownloadLink: React.FunctionComponent<Props> = ({ job }) => {
  return (
    <React.Fragment>
      {job.state === 'completed' && (
        <Link href={'http://localhost:8080/jobs/' + job.id}>download</Link>
      )}
      {job.state !== 'completed' && ("in progress")}
    </React.Fragment>
  )
};

export default DownloadLink;
