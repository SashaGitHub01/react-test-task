import React, { useMemo, useState } from "react";

const Images = ({ activeProductWithColor }) => {
  const [activeImg, setActiveImg] = useState(0);

  const prImages = activeProductWithColor?.images;

  const activeSrc = useMemo(() => {
    if (activeProductWithColor) {
      return prImages.find((_, i) => i === activeImg);
    }
  }, [activeImg, activeProductWithColor]);

  return (
    <div className={"images"}>
      <div className="image--main">
        <img src={activeSrc} alt="e" />
      </div>
      <div className="images_row">
        {prImages?.map((img, i) => {
          if (i == activeImg) return null;
          return <img onClick={() => setActiveImg(i)} key={img} src={img} alt="e" />;
        })}
      </div>
    </div>
  );
};

export default Images;
