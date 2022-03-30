import React from "react";
import {render} from "@testing-library/react"
import { shallow } from "enzyme";

import App from "./App";
import Form from "./components/Form";

describe("Basic rendering of Todomatic", () => {
  it("Should render todomatic heading", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("todo-heading")).toHaveTextContent("TodoMatic");
  })

  
});