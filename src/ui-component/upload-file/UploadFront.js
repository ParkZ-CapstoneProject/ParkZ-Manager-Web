import { UploadOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import cloudinary from "cloudinary";
import "./UploadFront.scss";

cloudinary.config({
  cloud_name: "dkuuolx57",
  api_key: "638792847552244",
  api_secret: "1D-w6BOCi6zkdUqlpnJSiIGnlJM",
});
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadFront = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  function handleUpload(file) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader(file, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
          setImageUrl(result.secure_url);
        }
      });
    });
  }
  console.log("imageUrl", imageUrl);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <UploadOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Tải ảnh mặt trước
      </div>
    </div>
  );
  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={handleUpload}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        // width="300px"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      {/* <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload> */}
    </>
  );
};
export default UploadFront;
