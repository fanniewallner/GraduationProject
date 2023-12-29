import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";

import { IStrapiMediaResponse } from "../../models/IStrapiResponse";
import { Box } from "@mui/material";

export default function MediaGrid() {
  const [mediaGallery, setMediaGallery] = useState<IStrapiMediaResponse>({
    data: [],
    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 1,
        total: 0,
      },
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const api = useApi();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getMediaGallery();

        setMediaGallery(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("media", mediaGallery);

  return (
    <ImageList sx={{ width: "100%", height: "auto" }} cols={3} rowHeight={164}>
      {mediaGallery.data[0].attributes.image.data.map((image, index) => (
        <Box key={index}>
          <img
            srcSet={`http://localhost:1337${image.attributes.formats.thumbnail.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`http://localhost:1337${image.attributes.formats.thumbnail.url}?w=164&h=164&fit=crop&auto=format`}
            alt={image.attributes.name}
          />
        </Box>
      ))}
    </ImageList>
  );
}
