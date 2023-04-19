import React from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import ImageModal from "./ImageModal";

export default function PopOver({
  title,
  body,
  buttonPlaceHolder,
  image,
  color,
}) {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h2">
        <p style={{ fontSize: 14 }}>{title}</p>
      </Popover.Header>
      {body && (
        <Popover.Body>
          <p style={{ fontSize: 13 }}>{body}</p>
          {image && image.length ? (
            <div className="d-flex">
              {image.map((img, key) => {
                return <ImageModal key={key} img={img} />;
              })}
            </div>
          ) : (
            <ImageModal img={image} />
          )}
        </Popover.Body>
      )}
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
      <Button style={{ backgroundColor: color || "#003863" }}>
        {buttonPlaceHolder ? buttonPlaceHolder : "Voir"}
      </Button>
    </OverlayTrigger>
  );
}
