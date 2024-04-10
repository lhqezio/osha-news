import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { screen } from '@testing-library/react';
import { useInView } from 'react-intersection-observer';


import '@testing-library/jest-dom/extend-expect';

import Article from "../Article/ArticleDetail";

let container = null;
global.fetch = jest.fn();

jest.mock('react-intersection-observer');

jest.mock("../Article/Comment.jsx", () => {
  return function DummyComment(props) {
    return (
      <div>
        <p>hi</p>
      </div>
    );
  };
});

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
  const update = function (t){return t};
  const cat = [];
  const currentLang = 'en';
  const article = {0:{
    image: "url",
    headline: "headline",
    short_description: "short description"
  }};


  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(article)
    })
  );

  await act(async() => {
    useInView.mockImplementation(() => [null, true]);
    render(<Article setUpdateScroll={update} selectedCategories={cat} 
      currentLang={currentLang} />, container);
  });
  // mockAllIsIntersecting(true);
  expect(global.fetch).toHaveBeenCalledTimes(2);
  expect(global.fetch).toHaveBeenCalledWith('/api/article/random?lang=en');

  global.fetch.mockRestore();
});
