"use client";

import { useCallback, useEffect, useState } from "react";
import { Photo } from "../types/Photo";
import { getMarsPhotos } from "../api/mars-photo";
import GenericSelector from "./utils/GenericSelector";
import { PhotoList } from "./PhotoList";
import { FavoriteSearches } from "./FavoriteSearches";
import { Favorite } from "../types/Favorite";

const roverOptions = [
  { value: "curiosity", label: "Curiosity" },
  { value: "opportunity", label: "Opportunity" },
  { value: "spirit", label: "Spirit" },
];

const cameraOptions = [
  { value: "", label: "All" },
  { value: "FHAZ", label: "Front Hazard Avoidance Camera" },
  { value: "RHAZ", label: "Rear Hazard Avoidance Camera" },
  { value: "MAST", label: "Mast Camera" },
  { value: "CHEMCAM", label: "Chemistry and Camera Complex" },
  { value: "MAHLI", label: "Mars Hand Lens Imager" },
  { value: "MARDI", label: "Mars Descent Imager" },
  { value: "NAVCAM", label: "Navigation Camera" },
  { value: "PANCAM", label: "Panoramic Camera" },
  {
    value: "MINITES",
    label: "Miniature Thermal Emission Spectrometer (Mini-TES)",
  },
];

export const MarsRoverApp = ({ initialPhotos }: { initialPhotos: Photo[] }) => {
  const [rover, setRover] = useState("curiosity");
  const [camera, setCamera] = useState("");
  const [photos, setPhotos] = useState(initialPhotos);
  const [sol, setSol] = useState(1000);
  const [earthDate, setEarthDate] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    }
    return [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const photos = await getMarsPhotos({
        sol,
        camera,
        rover,
        earth_date: earthDate,
        page,
      });
      setPhotos((prevPhotos) =>
        page === 1 ? photos : [...prevPhotos, ...photos]
      );
      setHasNextPage(photos.length === 25);
    } catch (error) {
      console.error("Error fetching photos", error);
    } finally {
      setLoading(false);
    }
  }, [sol, camera, rover, earthDate, page]);

  useEffect(() => {
    fetchPhotos();
  }, [sol, camera, rover, earthDate, page, fetchPhotos]);

  const handleRoverChange = (rover: string) => {
    setRover(rover);
    setCamera("");
    setPage(1);
  };

  const handleCameraChange = (camera: string) => {
    setCamera(camera);
    setPage(1);
  };

  const handleSolChange = (sol: number) => {
    setSol(sol);
    setEarthDate("");
    setPage(1);
  };

  const handleEarthDateChange = (earthDate: string) => {
    setEarthDate(earthDate);
    setSol(0);
    setPage(1);
  };

  const fetchMorePhotos = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleLoadFavorite = (favorite: Favorite) => {
    setRover(favorite.rover);
    setCamera(favorite.camera);
    setSol(favorite.sol);
    setEarthDate(favorite.earthDate);
    setPage(1);
  };

  const handleSaveFavorite = () => {
    const favorite: Favorite = {
      rover,
      camera,
      sol,
      earthDate,
    };
    const updatedFavorites = [...favorites, favorite];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleDeleteFavorite = (favorite: Favorite) => {
    const updatedFavorites = favorites.filter((f: Favorite) => f !== favorite);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <main className="flex flex-col items-center justify-between p-10 space-y-4">
      <h1 className="text-4xl font-bold">Mars Rover Photos</h1>
      <GenericSelector
        label="Select Rover"
        options={roverOptions}
        selectedValue={rover}
        onChange={handleRoverChange}
      />
      <GenericSelector
        label="Filter by Camera"
        options={cameraOptions}
        selectedValue={camera}
        onChange={handleCameraChange}
      />
      <div className="flex items-center space-x-4">
        <label htmlFor="sol">Sol:</label>
        <input
          id="sol"
          type="number"
          value={sol}
          onChange={(e) => handleSolChange(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-md"
        />
        <label htmlFor="earth_date">Earth Date:</label>
        <input
          id="earth_date"
          type="date"
          value={earthDate}
          onChange={(e) => handleEarthDateChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        onClick={toggleShowFavorites}
        className="bg-purple-500 text-white py-2 px-4 rounded"
      >
        {showFavorites ? "Hide Favorites" : "Show Favorites"}
      </button>
      {showFavorites && (
        <FavoriteSearches
          favorites={favorites}
          onLoadFavorite={handleLoadFavorite}
          onSaveFavorite={handleSaveFavorite}
          onDeleteFavorite={handleDeleteFavorite}
        />
      )}
      <PhotoList
        photos={photos}
        loading={loading}
        hasNextPage={hasNextPage}
        fetchMore={fetchMorePhotos}
      />
    </main>
  );
};
function useCallbacl(arg0: () => Promise<void>) {
  throw new Error("Function not implemented.");
}
