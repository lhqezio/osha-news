import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import CategoryList from "../Navbar/CategoriesList.jsx";

global.fetch = jest.fn();
let container = null;

jest.mock('@uidotdev/usehooks', () => ({
  useClickAway: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));
const mockT = jest.fn().mockReturnValue('Categories');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: mockT }),
}));

beforeEach(() => {
  global.fetch.mockClear();
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders SearchBox", async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(['Violent', 'Buisness', 'Politics']),
    })
  );
  await act(async() => {
    render(<CategoryList currentLang="en" selectedCategories={[]} addSelectedCategory={jest.fn()} removeSelectedCategory={jest.fn()} />, container);
  });
  expect(global.fetch).toHaveBeenCalledWith('/api/categories?lang=en');
  expect(document.querySelector('button')).toBeInTheDocument();
});
