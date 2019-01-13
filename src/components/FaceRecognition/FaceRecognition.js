import React from "react";

function FaceRecognition(props) {
  const { imageUrl } = props;
  return (
    <div className="center ma">
      <div>
        <img src={imageUrl} alt="" width="500px" height="auto" />
      </div>
    </div>
  );
}

export default FaceRecognition;
