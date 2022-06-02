import { useEffect, useState } from "react";
import { Image } from "react-native";

const useImageRatio = (url: string) => {
  const [photoRatio, setPhotoRatio] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Image.getSize(url, (width, height) => {
      setPhotoRatio(height / width);
      setLoading(false);
    });
  }, []);

  return { photoRatio, loading };
};

export default useImageRatio;
