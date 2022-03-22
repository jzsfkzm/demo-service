import { Paper, Table, TableHead, TableCell, TableRow, TableBody, TableContainer } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../store/jobs';
import { RootState } from '../store';

const JobList: React.FunctionComponent = () => {
  const { jobs, loading } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch()

  useEffect(() => {
    if (jobs.length === 0 && !loading) {
      dispatch(fetchJobs(null));
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Pair</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow
              key={job.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {job.id}
              </TableCell>
              <TableCell align="right">{job.pair}</TableCell>
              <TableCell align="right">download</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default JobList;
