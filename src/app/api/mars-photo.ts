import { Photo } from "../types/Photo";

type getMarsPhotoProps = {
  sol?: number;
  camera?: string;
  rover: string;
  earth_date?: string;
  page: number;
};

export const getMarsPhotos = async ({
  sol,
  camera,
  rover,
  earth_date,
  page,
}: getMarsPhotoProps) => {
  console.log("getMarsPhotos", sol, camera, rover, earth_date, page);
  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=DEMO_KEY
&page=${page}`;
  if (sol) {
    url += `&sol=${sol}`;
  }
  if (camera) {
    url += `&camera=${camera}`;
  }
  if (earth_date) {
    url += `&earth_date=${earth_date}`;
  }
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch Mars photos");
  }
  const data: { photos: Photo[] } = await response.json();
  return data.photos;
};
