import React, { useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import Image from "../layout/Image";
import Buttons from "../layout/Buttons";

import api from "../../utils/api";

const UploadAvatar = props => {
    const [imageUrl, setImageUrl] = useState("");
    const [status, setStatus] = useState({
        loading: true,
        uploading: false
    });

    const { loading, uploading } = status;

    useEffect(() => {
        if (props.avatar) {
            setImageUrl(props.avatar);
        }

        setStatus({ ...status, loading: false });
    }, [loading, props]);

    const removeImage = () => {
        setImageUrl("");
    };

    const onError = () => {
        //setImageUrl(avatar || "");
    };

    const onChange = async e => {
        const errs = [];
        const files = Array.from(e.target.files);

        const formData = new FormData();
        const types = ["image/png", "image/jpeg", "image/gif"];

        const file = files[0];

        if (types.every(type => file.type !== type)) {
            errs.push(`'${file.type}' is not a supported format`);
        }

        if (file.size > 150000) {
            errs.push(
                `'${file.name}' is too large, please pick a smaller file`
            );
        }

        formData.append(0, file);

        if (errs.length) {
            return errs.forEach(err => console.log(err));
        }

        setStatus({ ...status, uploading: true });

        try {
            const res = await api.post("/api/profile/image-upload", formData);

            if (res.status !== 200) throw res;

            const images = [res.data];

            setStatus({ ...status, uploading: false });
            setImageUrl(res.data.secure_url);
        } catch (error) {
            error.json().then(e => {
                console.log(e.message);
                setStatus({ ...status, uploading: false });
            });
        }
    };

    const content = () => {
        switch (true) {
            case loading:
            case uploading:
                return <Spinner />;
            case imageUrl && imageUrl.length > 0:
                return (
                    <Image
                        image={imageUrl}
                        removeImage={removeImage}
                        onError={onError}
                    />
                );
            default:
                return <Buttons onChange={onChange} />;
        }
    };

    return (
        <div>
            <div className="buttons">{content()}</div>
        </div>
    );
};

export default UploadAvatar;
