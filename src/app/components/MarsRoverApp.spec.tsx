import { photos } from "./test/MockUtils";
import { render, fireEvent } from "@testing-library/react";
import * as marsPhotoApi from "../api/mars-photo";
import { Photo } from "../types/Photo";
import { MarsRoverApp } from "./MarsRoverApp";

jest.mock("../api/mars-photo");

const mockGetMarsPhotos = jest
  .spyOn(marsPhotoApi, "getMarsPhotos")
  .mockResolvedValue(photos as Photo[]);

describe("MarsRoverApp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with no InitialPhotos", async () => {
    const { getByText, getByLabelText } = render(
      <MarsRoverApp initialPhotos={[]} />
    );

    expect(getByText("Mars Rover Photos")).toBeInTheDocument();
    expect(getByLabelText("Select Rover:")).toBeInTheDocument();
    expect(getByLabelText("Filter by Camera:")).toBeInTheDocument();
    expect(getByLabelText("Sol:")).toBeInTheDocument();
    expect(getByLabelText("Earth Date:")).toBeInTheDocument();
    expect(getByText("No photos found")).toBeInTheDocument();
  });

  it("renders correctly with InitialPhotos", async () => {
    const { getByText, getByLabelText } = render(
      <MarsRoverApp initialPhotos={photos as Photo[]} />
    );
    expect(getByText("Mars Rover Photos")).toBeInTheDocument();
    expect(getByLabelText("Select Rover:")).toBeInTheDocument();
    expect(getByLabelText("Filter by Camera:")).toBeInTheDocument();
    expect(getByLabelText("Sol:")).toBeInTheDocument();
    expect(getByLabelText("Earth Date:")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
  });

  it("calls getMarsPhotos with the correct parameters", async () => {
    render(<MarsRoverApp initialPhotos={[]} />);

    expect(mockGetMarsPhotos).toHaveBeenCalledWith({
      camera: "",
      earth_date: "",
      rover: "curiosity",
      page: 1,
      sol: 1000,
    });
  });

  it("calls getMarsPhotos with the selected rover", async () => {
    const { getByLabelText } = render(<MarsRoverApp initialPhotos={[]} />);

    const roverSelector = getByLabelText("Select Rover:") as HTMLSelectElement;
    fireEvent.change(roverSelector, { target: { value: "opportunity" } });

    expect(mockGetMarsPhotos).toHaveBeenCalledWith({
      camera: "",
      earth_date: "",
      rover: "opportunity",
      page: 1,
      sol: 1000,
    });
  });

  it("calls getMarsPhotos with the selected camera", async () => {
    const { getByLabelText } = render(<MarsRoverApp initialPhotos={[]} />);

    const cameraSelector = getByLabelText(
      "Filter by Camera:"
    ) as HTMLSelectElement;
    fireEvent.change(cameraSelector, { target: { value: "NAVCAM" } });

    expect(mockGetMarsPhotos).toHaveBeenCalledWith({
      camera: "NAVCAM",
      earth_date: "",
      rover: "curiosity",
      page: 1,
      sol: 1000,
    });
  });

  it("calls getMarsPhotos with the selected sol", async () => {
    const { getByLabelText } = render(<MarsRoverApp initialPhotos={[]} />);

    const solInput = getByLabelText("Sol:") as HTMLInputElement;
    fireEvent.change(solInput, { target: { value: "1001" } });

    expect(mockGetMarsPhotos).toHaveBeenCalledWith({
      camera: "",
      earth_date: "",
      rover: "curiosity",
      page: 1,
      sol: 1001,
    });
  });

  it("calls getMarsPhotos with the selected earth date", async () => {
    const { getByLabelText } = render(<MarsRoverApp initialPhotos={[]} />);

    const earthDateInput = getByLabelText("Earth Date:") as HTMLInputElement;
    fireEvent.change(earthDateInput, { target: { value: "2020-09-22" } });

    expect(mockGetMarsPhotos).toHaveBeenCalledWith({
      camera: "",
      earth_date: "2020-09-22",
      rover: "curiosity",
      page: 1,
      sol: 0,
    });
  });

  it("toggle favorites visibility", async () => {
    const { getByText, queryByText } = render(
      <MarsRoverApp initialPhotos={[]} />
    );

    fireEvent.click(getByText("Show Favorites"));

    expect(getByText("Favorite Searches")).toBeInTheDocument();

    fireEvent.click(getByText("Hide Favorites"));

    expect(queryByText("Favorite Searches")).not.toBeInTheDocument();
  });
});
