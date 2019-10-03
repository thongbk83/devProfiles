import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default ({ image, onError, removeImage }) => (
    <div className="fadein">
        <div onClick={() => removeImage()} className="delete">
            <FontAwesomeIcon icon={faTimesCircle} size="sm" />
        </div>
        <img
            src={image}
            alt=""
            style={{ width: 100, height: 100 }}
            onError={() => onError()}
        />
    </div>
);
