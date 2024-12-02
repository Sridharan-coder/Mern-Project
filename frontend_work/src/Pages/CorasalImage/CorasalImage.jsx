
import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CorasalImage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3320/readAllImage");
        const data = await response.json();
        console.log("------->",data.files);
        
        if (data.success) {
          const imagePaths = data.files
            .map((file) => file.filesPath)
            .filter((path) => {
              const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
              const extension = path.split(".").pop().toLowerCase();
              return imageExtensions.includes(extension);
            });

          setImages(imagePaths);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
  };
  console.log(images);
  

  return (
    <div style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CorasalImage;
