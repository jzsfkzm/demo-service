import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useAppThunkDispatch } from "../store";
import { createJob, fetchJobs } from "../store/jobs";

const JobCreator: React.FunctionComponent = () => {
  const [pair, setPair] = React.useState('btcusdt');
  const dispatch = useAppThunkDispatch()

  const handleChange = (event: SelectChangeEvent) => {
    setPair(event.target.value);
  };

  const handleCreateJob = async () => {
    await dispatch(createJob(pair)).unwrap();
    dispatch(fetchJobs(true));
  };

  return (
    <React.Fragment>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={pair}
        label="Pair"
        onChange={handleChange}
      >
        <MenuItem value="btcusdt">BTCUSDT</MenuItem>
        <MenuItem value="ethusdt">ETHUSDT</MenuItem>
      </Select>
      <Button color="primary" onClick={handleCreateJob}>Create job</Button>
    </React.Fragment>
  )
};

export default JobCreator;
