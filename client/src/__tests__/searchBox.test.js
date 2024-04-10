// import React from "react";
// import { createRoot, render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
// import { screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';

// import SearchBox from "../Navbar/SearchBox/SearchBox";

// let container = null;

// jest.mock("../Navbar/SearchBox/ArticleResults", () => {
//   return function DummyArticles(props) {
//     return (
//       <div>
//         <p>hi</p>
//       </div>
//     );
//   };
// });

// jest.mock("../Navbar/SearchBox/UserResults", () => {
//   return function DummyUsers(props) {
//     return (
//       <div data-testid="map">
//         <p>hi</p>
//       </div>
//     );
//   };
// });

// beforeEach(() => {
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// it("renders SearchBox", async () => {
//   jest.spyOn(global, 'fetch').mockImplementation((url) => {
//     if (url.includes('article')) {
//       return Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve({ result: ["violent"] })
//       });
//     } else if (url.includes('users')) {
//       return Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve({0:[{ data: "violet" }]})
//       });
//     }
//   });

//   await act(async() => {
//     render(<SearchBox show={true} searchTerm="vio" />, container);
//   });
 
//   expect(global.fetch).toHaveBeenCalledWith('/article/search?search=vio&page=1&amount=15');
//   expect(global.fetch).toHaveBeenCalledWith('users/search?name=vio');
//   // expect(container.textContent).toContain("violet");
//   // expect(container.textContent).toContain("violent");

//   global.fetch.mockRestore();
// });

// import React from 'react';
// import { render, act, waitFor, screen } from '@testing-library/react';
// import SearchBox from '../Navbar/SearchBox/SearchBox.jsx';
// // import { useTranslation } from 'react-i18next';

// // Mock the useTranslation hook
// // jest.mock('react-i18next', () => ({
// //   useTranslation: jest.fn(),
// // }));

// // Mock the fetch function
// global.fetch = jest.fn();

// describe('<SearchBox />', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders loading state', () => {
//     // useTranslation.mockReturnValueOnce({ t: jest.fn().mockReturnValue('Search for articles and users') });

//     const { getByText } = render(<SearchBox show={true} searchTerm="" />);
    
//     // expect(getByText('LOADING...')).toBeInTheDocument();
//   });

//   it('fetches and displays article results', async () => {
//     const mockArticles = {
//       result: [
//         { id: 1, title: 'Article 1' },
//         { id: 2, title: 'Article 2' },
//       ],
//     };
//     const mockUsers = {
//       data: [
//         { id: 1, name: 'User 1' },
//         { id: 2, name: 'User 2' },
//       ],
//     };

//     global.fetch.mockResolvedValueOnce({
//       ok: true,
//       json: () => Promise.resolve(mockArticles),
//     });
//     global.fetch.mockResolvedValueOnce({
//       ok: true,
//       json: () => Promise.resolve(mockUsers),
//     });

//     // useTranslation.mockReturnValueOnce({ t: jest.fn().mockReturnValue('Search for articles and users') });

//     await act(async () => {
//       render(<SearchBox show={true} searchTerm="test" />);
//       // await waitFor(() => expect(screen.getByText('2 Search for articles and users')).toBeInTheDocument());
//     });

//     expect(screen.getByText('Article 1')).toBeInTheDocument();
//     expect(screen.getByText('Article 2')).toBeInTheDocument();
//     expect(screen.getByText('User 1')).toBeInTheDocument();
//     expect(screen.getByText('User 2')).toBeInTheDocument();
//   });

//   it('handles fetch errors', async () => {
//     global.fetch.mockResolvedValueOnce({
//       ok: false,
//     });

//     // useTranslation.mockReturnValueOnce({ t: jest.fn().mockReturnValue('Error fetching data') });

//     await act(async () => {
//       render(<SearchBox show={true} searchTerm="test" />);
//       await waitFor(() => expect(screen.getByText('Error fetching data')).toBeInTheDocument());
//     });

//     expect(screen.getByText('Error fetching data')).toBeInTheDocument();
//   });
// });
