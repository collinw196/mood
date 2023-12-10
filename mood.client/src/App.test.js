import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './app/store/store';

test('renders login page', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
  // const linkElement = screen.getByText(/sign/i);
  // expect(linkElement).toBeInTheDocument();
});
