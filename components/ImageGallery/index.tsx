import React, { useState } from 'react';
import * as Styled from './styled';

interface IImageGalleryProps {
  images: string[];
  alt?: string;
}

const ImageGallery: React.FC<IImageGalleryProps> = ({ images, alt = 'Gallery image' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <Styled.GalleryContainer>
        <Styled.MainImage>
          <Styled.NoImage>No images available</Styled.NoImage>
        </Styled.MainImage>
      </Styled.GalleryContainer>
    );
  }

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Styled.GalleryContainer>
      <Styled.MainImage>
        <img src={images[selectedIndex]} alt={`${alt} ${selectedIndex + 1}`} />
      </Styled.MainImage>

      {images.length > 1 && (
        <Styled.ThumbnailsContainer>
          <Styled.ScrollButton onClick={handlePrevious}>
            ‹
          </Styled.ScrollButton>

          <Styled.ThumbnailsWrapper id="thumbnails-scroll">
            {images.map((image, index) => (
              <Styled.Thumbnail
                key={index}
                $active={index === selectedIndex}
                onClick={() => setSelectedIndex(index)}
              >
                <img src={image} alt={`${alt} thumbnail ${index + 1}`} />
              </Styled.Thumbnail>
            ))}
          </Styled.ThumbnailsWrapper>

          <Styled.ScrollButton onClick={handleNext}>
            ›
          </Styled.ScrollButton>
        </Styled.ThumbnailsContainer>
      )}
    </Styled.GalleryContainer>
  );
};

export default ImageGallery;


