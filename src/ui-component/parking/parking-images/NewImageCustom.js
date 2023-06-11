import { Button, Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const NewImageCustom = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleSave = () => {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: "Xác nhận?",
        text: "Bạn có chắc chắn muốn lưu hình ảnh này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Hủy",
        confirmButtonText: "Xác nhận!",
        customClass: {
          container: "swal-custom", // Apply the custom class to the Swal container
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const uploadPromises = fileList.map(async (file) => {
            return new Promise((resolve) => {
              const formData = new FormData();
              formData.append("file", file.originFileObj, file.name);

              axios
                .post(
                  "https://parkzapi.azurewebsites.net/api/upload-image",
                  formData
                )
                .then((response) => {
                  const imageUrl = response.data.link;
                  console.log(`Uploaded image: ${imageUrl}`);
                  resolve();
                })
                .catch((error) => {
                  console.log("Error uploading image:", error);
                  resolve();
                });
            });
          });

          Promise.all(uploadPromises)
            .then(() => {
              setLoading(false);
              Swal.fire({
                title: "Thành công!",
                text: "Trạng thái cập nhật thành công.",
                icon: "success",
                customClass: {
                  container: "swal-custom", // Apply the custom class to the Swal container
                },
              });
              resolve(); // resolve the Promise
            })
            .catch((error) => {
              setLoading(false);
              console.log("Error uploading images:", error);
              Swal.fire({
                // ... rest of the function ...
              });
              reject(error); // reject the Promise
            });
        } else {
          reject(); // reject the Promise if the user cancels the upload
        }
      });
    });
  };

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={handlePreview}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>

      <Button onClick={handleSave}>Save</Button>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default NewImageCustom;
