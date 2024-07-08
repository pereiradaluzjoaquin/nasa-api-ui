import { getMarsPhotos } from "./api/mars-photo";
import { MarsRoverApp } from "./components/MarsRoverApp";

export default async function Home() {
  const initialPhotos = await getMarsPhotos({
    rover: "curiosity",
    page: 1,
    sol: 1000,
  });

  return <MarsRoverApp initialPhotos={initialPhotos} />;
}
