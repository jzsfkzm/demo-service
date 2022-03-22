import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const API_URL = 'http://localhost:8080';

export type Job = {
  id: number;
  pair: string;
  state: string;
};

type State = {
  jobs: Job[],
  loading: boolean;
  loaded: boolean;
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetch',
  async (_: boolean) => {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  }, {
    condition: (force: boolean, { getState }) => {
      const { jobs } = getState() as unknown as Record<string, State>;
      if (!force && (jobs.loading || jobs.loaded)) {
        return false;
      }
    }
  }
);

export const createJob = createAsyncThunk(
  'jobs/create',
  async (pair: string) => {
    const response = await axios.post(`${API_URL}/jobs`, {
      pair
    });
    return response.data;
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
