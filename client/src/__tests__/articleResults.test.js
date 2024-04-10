import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ArticleResults from "../Navbar/SearchBox/ArticleResults.jsx";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("render ArticleResult", () => {
  let articles=[{
    headline: "15 dead",
    category: "violent",
    link: "https://google.com/",
    authors: "Billy Bob"
  },
  {
    headline: "Puppy saves human",
    category: "Hero",
    link: "https://legacy.reactjs.org/",
    authors: "Greg Stopper"
  }
  ]
  act(() => {
    render(<ArticleResults articles={articles}/>, container);
  });
  let links = container.querySelectorAll('a');
  expect(container.textContent).toContain("15 dead");
  expect(container.textContent).toContain("violent");
  expect(container.textContent).toContain("Billy Bob");
  expect(container.textContent).toContain("Puppy saves human");
  expect(container.textContent).toContain("Hero");
  expect(container.textContent).toContain("Greg Stopper");
  expect(links[0].href).toBe(articles[0].link);
  expect(links[1].href).toBe(articles[1].link);
});