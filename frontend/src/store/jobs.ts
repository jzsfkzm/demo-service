import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const API_HOST = 'localhost:8080';
export const HTTP_API_URL = `http://${API_HOST}`;
export const WS_API_URL = `ws://${API_HOST}`;

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
    const response = await axios.get(`${HTTP_API_URL}/jobs`);
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
    const response = await axios.post(`${HTTP_API_URL}/jobs`, {
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
  reducers: {
    setJobState(state, action) {
      state.jobs = state.jobs.map((job) => {
        if (job.id !== action.payload.id) {
          return job;
        }

        return {
          ...job,
          state: action.payload.state
        };
      });
    }
  },
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
export const { setJobState } = slice.actions;
export default slice.reducer;
