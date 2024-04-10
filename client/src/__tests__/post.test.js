import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Post from "../Post/Post.jsx";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders SearchBox", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(["violent","politics"])
    })
  );
  await act(async() => {
    render(<Post />, container);
  });
 
  expect(global.fetch).toHaveBeenCalledWith('/api/categories');
  expect(global.fetch).toHaveBeenCalledWith('/api/users/user-info');

  global.fetch.mockRestore();
});
