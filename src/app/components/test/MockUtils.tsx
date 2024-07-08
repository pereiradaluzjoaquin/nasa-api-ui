import { Photo } from "@/app/types/Photo";

export const photos: Partial<Photo>[] = [
  {
    id: 1,
    img_src: "http://example.com/photo1.jpg",
    camera: { full_name: "Camera 1", name: "camera1", rover_id: 1, id: 1 },
    earth_date: "2020-09-22",
  },
  {
    id: 2,
    img_src: "http://example.com/photo2.jpg",
    camera: { full_name: "Camera 2", name: "camera2", rover_id: 2, id: 2 },
    earth_date: "2020-09-23",
  },
];
