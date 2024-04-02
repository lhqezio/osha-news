import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from "react-dom/test-utils";

import UserResults from "../Navbar/SearchBox/UserResults.jsx";

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

it("render UserResult", () => {
  let user=[{
    name: "Bob",
    image: "https://media.istockphoto.com/id/1495088043/vector/" + 
      "user-profile-icon-avatar-or-person-icon-profile-picture-" + 
      "portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=" +
      "dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
  },
  {
    name: "Billy",
    image: "https://media.istockphoto.com/id/1393750072/vector/" +
      "flat-white-icon-man-for-web-design-silhouette-flat-illustration" +
      "-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB" +
      "_WtzQV9KhoMUP9R9gVohoU="
  }
  ]
  act(() => {
    render(<UserResults users={user}/>, container);
  });
  const images = screen.getAllByAltText('profile pic');
  expect(container.textContent).toContain("Bob");
  expect(container.textContent).toContain("Billy");
  expect(images[0]).toBeInTheDocument();
  expect(images[0]).toHaveAttribute('src', user[0].image);
  expect(images[1]).toBeInTheDocument();
  expect(images[1]).toHaveAttribute('src', user[1].image);
});