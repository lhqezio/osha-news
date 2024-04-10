import React from "react";
import { render, screen, act } from "@testing-library/react";
import Navbar from "../Navbar/Navbar.jsx";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../userStore";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {
  const resources = {
    en: {
      translation: {
        "Welcome": "Welcome",
        "Hello": "Hello",
      },
    },
  };

  i18n
    .use(initReactI18next) 
    .init({
      resources,
      lng: "en", 
      fallbackLng: "en", 
      keySeparator: false, 
      interpolation: {
        escapeValue: false, 
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
  });
});