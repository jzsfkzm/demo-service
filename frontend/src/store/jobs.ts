import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type Job = {
  id: number;
  pair: string;
};

type State = {
  jobs: Job[],
  loading: boolean;
  loaded: boolean;
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetch',
  async () => {
    const response = await axios.get('http://localhost:8080/jobs');
    return response.data;
  }, {
    condition: (arg: any, { getState }) => {
      const { jobs } = getState() as unknown as Record<string, State>;
      if (jobs.loading || jobs.loaded) {
        return false;
      }
    }
  }
);

const slice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    loading: false,
    loaded: false
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
      });
  }
});
export default slice.reducer;
