import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Image } from 'react-bootstrap';

export default function ImageModal({ img }) {
	const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {img && img[0] && (
        <div className="m-2">
          <Image
            src={
              img?.startsWith("http")
                ? img
                : `${process.env.LIEN_BACK_IMAGE}${img}`
            }
            width="70"
            height="50"
            onClick={() => setIsOpen(true)}
            style={{
              objectFit: "cover",
            }}
          />
          {isOpen && (
            <Lightbox
              style={{ zIndex: 100000000 }}
              mainSrc={
                img?.startsWith("http")
                  ? img
                  : `${process.env.LIEN_BACK_IMAGE}${img}`
              }
              onCloseRequest={() => setIsOpen(false)}
            />
          )}
        </div>
      )}
    </>
  );
}
