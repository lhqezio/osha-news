import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Article from "../Article/ArticleDetail";

let container = null;

jest.mock("../Article/Comment.jsx", () => {
  return function DummyComment(props) {
    return (
      <div>
        <p>hi</p>
      </div>
    );
  };
});

export class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return [];
  }

  unobserve() {
    return null;
  }
}
window.IntersectionObserver = IntersectionObserver;
global.IntersectionObserver = IntersectionObserver;

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
  const t = true;
  const f = false;
  const cat = [];
  const currentLang = 'en';
  const article = {0:{
    image: "url",
    headline: "headline",
    short_description: "short description"
  }};

  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(article)
    })
  );

  await act(async() => {
    // const root = createRoot(container);
    render(<Article setUpdateScroll={false} selectedCategories={cat} currentLang={currentLang} />, container);
  });
 
  expect(global.fetch).toHaveBeenCalledTimes(0);
  // const image = screen.getByAltText('add button');
  // expect(image).toBeInTheDocument();
  // expect(global.fetch).toHaveBeenCalledWith('article/random?lang=en');
  // expect(container.textContent).toContain('bob');

  global.fetch.mockRestore();
});
