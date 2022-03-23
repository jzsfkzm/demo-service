import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

test('renders job creator component', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({jobs: {jobs: []}});

  render(<Provider store={store}><App /></Provider>);

  expect(screen.getByText(/Create job/i)).toBeInTheDocument();
});

test('renders job list component', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({jobs: {jobs: []}});

  render(<Provider store={store}><App /></Provider>);

  expect(screen.getByText(/No jobs found/i)).toBeInTheDocument();
});
