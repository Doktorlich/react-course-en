import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting test", () => {
    test("renders  Hello World as a text", () => {
        // Arrange
        render(<Greeting />);

        // Act
        // ... nothing

        // Assert
        const element = screen.getByText("Hello World!", { exact: true });
        // eslint-disable-next-line jest/valid-expect
        expect(element).toBeInTheDocument();
    });
    test("renders   good to see you the button wos NOT CLICKED", () => {
        // Arrange
        render(<Greeting />);

        // Act
        // ... nothing

        // Assert
        const element = screen.getByText("good to see you", { exact: false });
        // eslint-disable-next-line jest/valid-expect
        expect(element).toBeInTheDocument();
    });
    test("renders  'Changed!' if the button was clicked", async () => {
        // Arrange
        render(<Greeting />);
        // Act
        const button = screen.getByRole("button");
        await userEvent.click(button);

        // Assert
        const element = screen.getByText("Changed!", { exact: false });
        // eslint-disable-next-line jest/valid-expect
        expect(element).toBeInTheDocument();
    });
    test("renders is hidden  'It's good to see you'", async () => {
        // arrange
        render(<Greeting />);

        //act
        const button = screen.getByRole("button");
        await userEvent.click(button);

        //assert
        const element = screen.queryByText("good to see you", { exact: false });
        // eslint-disable-next-line jest/valid-expect
        expect(element).toBeNull();
    });
});
