import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Comment from "../Article/Comment.jsx";

let container = null;

jest.mock('@uidotdev/usehooks', () => ({
  useClickAway: jest.fn(),
}));


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
  
  await act(async() => {
    render(<Comment />, container);
  });
 
  expect(container.textContent).toContain("Bob");
});
