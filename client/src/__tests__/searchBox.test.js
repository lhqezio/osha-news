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
//   // unmountComponentAtNode(container);
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
//   expect(container.textContent).toContain("violet");
//   expect(container.textContent).toContain("violent");

//   global.fetch.mockRestore();
// });
