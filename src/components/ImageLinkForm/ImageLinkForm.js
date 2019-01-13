import React from "react";
import "./ImageLinkForm.css";

function ImageLinkForm(props) {
  const { onInputChange, onUrlSubmit } = props;
  return (
    <div>
      <p className="f3 white">
        {"The target seeker will detect the faces in your pictures."}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            name="file"
            id="file"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-navy"
            type="submit"
            onClick={onUrlSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
