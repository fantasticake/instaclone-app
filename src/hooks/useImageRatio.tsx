import { useEffect, useState } from "react";
import { Image } from "react-native";

const useImageRatio = (url: string) => {
  const [photoRatio, setPhotoRatio] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (url) {
      Image.getSize(url, (width, height) => {
        setPhotoRatio(height / width);
        setLoading(false);
      });
    }
  }, [url]);

  return { photoRatio, loading };
};

export default useImageRatio;
