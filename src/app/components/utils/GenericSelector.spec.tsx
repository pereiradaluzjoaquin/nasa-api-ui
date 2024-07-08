import { render, screen, fireEvent } from "@testing-library/react";
import GenericSelector from "./GenericSelector";

describe("GenericSelector", () => {
  const label = "Select option";
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];
  const selectedValue = "option1";
  const onChange = jest.fn();
  const formattedLabel = label + ":";

  it("renders correctly with the provided props", () => {
    render(
      <GenericSelector
        label={label}
        options={options}
        selectedValue={selectedValue}
        onChange={onChange}
      />
    );

    expect(screen.getByLabelText(formattedLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(formattedLabel)).toHaveValue(selectedValue);

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("calls the onChange function with the selected value", () => {
    render(
      <GenericSelector
        label={label}
        options={options}
        selectedValue={selectedValue}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByLabelText(formattedLabel), {
      target: { value: "option2" },
    });

    expect(onChange).toHaveBeenCalledWith("option2");
  });
});
