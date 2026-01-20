import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import * as Styled from './styled';

interface IImageGalleryProps {
  images: string[];
  alt?: string;
}

const ImageGallery: React.FC<IImageGalleryProps> = ({
  images,
  alt = 'Gallery image'
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) {
    return null
  }

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnails = thumbnailsRef.current.children;
      const activeThumbnail = thumbnails[selectedIndex] as HTMLElement;

      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > selectedIndex ? 1 : -1);
    setSelectedIndex(index);
  };

  return (
    <Styled.GalleryContainer>
      <Styled.MainImage>
        <AnimatePresence initial={false} custom={direction}>
          <Styled.AnimatedImage
            key={selectedIndex}
            src={images[selectedIndex]}
            alt={`${alt} ${selectedIndex + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.3, ease: "easeOut" },
              opacity: { duration: 0.2 }
            }}
          />
        </AnimatePresence>
      </Styled.MainImage>

      {images.length > 1 && (
        <Styled.ThumbnailsContainer>
          <Styled.ScrollButton onClick={handlePrevious}>
            ‹
          </Styled.ScrollButton>

          <Styled.ThumbnailsWrapper ref={thumbnailsRef} id="thumbnails-scroll">
            {images.map((image, index) => (
              <Styled.Thumbnail
                key={index}
                $active={index === selectedIndex}
                onClick={() => handleThumbnailClick(index)}
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


