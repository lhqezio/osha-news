import React from "react";
import { render, screen, act } from "@testing-library/react";
import Navbar from "../Navbar/Navbar.jsx";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../userStore";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import '@testing-library/jest-dom/extend-expect';

// const store = createStore(rootReducer);
beforeEach(() => {
  const resources = {
    en: {
      translation: {
        "Welcome": "Welcome",
        "Hello": "Hello",
        // add other translations here
      },
    },
  };

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: "en", // default language
      fallbackLng: "en", // fallback language
      keySeparator: false, // we do not use keys in form messages.welcome
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
});

describe("Navbar Component", () => {
  jest.mock('i18next', () => ({
    ...jest.requireActual('i18next'),
    changeLanguage: jest.fn(),
  }));
  
  it("renders correctly", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    // Check for the search icon
    const searchIcon = screen.getAllByAltText("search icon");
    expect(searchIcon[0]).toBeInTheDocument();

    // Check for the language select
    const languageSelect = screen.getByRole("combobox", { name: "selectLanguage" });
    expect(languageSelect).toBeInTheDocument();

    // Check for the New Article button
    const newArticleButton = screen.getByRole("button", { name: "New Article" });
    expect(newArticleButton).toBeInTheDocument();

    // Mock the fetch call to simulate user info retrieval
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ name: "TestUser", image: "testImage.jpg" }),
      })
    );

    // Wait for the component to fetch user info
    await act(async () => {
      const userElement = await screen.findByText("TestUser");
      expect(userElement).toBeInTheDocument();
    });

    // Check for the user icon
    const userIcon = screen.getByAltText("profile picture");
    expect(userIcon).toBeInTheDocument();

    // Check for the logout link
    const logoutLink = screen.getByText("Logout");
    expect(logoutLink).toBeInTheDocument();
  });

  it("shows the search box when typing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    // Get the search input
    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();

    // Type in the search input
    act(() => {
      searchInput.focus();
      searchInput.dispatchEvent(new InputEvent("input", { bubbles: true, cancelable: true }));
    });

  });
});