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
const mockT = jest.fn().mockReturnValue('Categories');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: mockT }),
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

const cats = ['Violent', 'Buisness', 'Politics'];

jest.spyOn(global, "fetch").mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(cats)
  })
);

it("renders SearchBox", async () => {
  await act(async() => {
    render(<CategoryList currentLang="en" selectedCategories={[]} addSelectedCategory={jest.fn()} removeSelectedCategory={jest.fn()} />, container);
  });
  expect(global.fetch).toHaveBeenCalledWith('/categories?lang=en');
  expect(container.textContent).toContain("hi");
});
