import ImageList from "@mui/material/ImageList";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";

import { IStrapiMediaResponse } from "../../models/IStrapiResponse";
import { Box, Container } from "@mui/material";

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
  const [loading, setLoading] = useState<boolean>(true);
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

  return (
    <Container>
      <ImageList sx={{ height: "auto" }} cols={3} rowHeight={164}>
        {mediaGallery.data.length > 0 &&
          mediaGallery.data[0].attributes.image.data.map((image, index) => (
            <Box key={index}>
              <img
                loading="lazy"
                srcSet={`http://localhost:1337${image.attributes.formats.thumbnail.url}?w=328&h=328&fit=crop&auto=format&dpr=2 2x`}
                src={`http://localhost:1337${image.attributes.formats.thumbnail.url}?w=328&h=328&fit=crop&auto=format`}
                alt={image.attributes.name}
              />
            </Box>
          ))}
      </ImageList>
    </Container>
  );
}
