import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ShortScroll from "../Article/ShortScroll.jsx";

let container = null;

jest.mock("../Article/ArticleDetail.jsx", () => {
  return function DummyArticles(props) {
    return (
      <div>
        <p>hi</p>
      </div>
    );
  };
});

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
    render(<ShortScroll selectedCategories={[]} currentLang={'en'} />, container);
  });
 
  expect(container.textContent).toContain("hi");
});
