/** @format */

import { InboxOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload } from "antd";
import { useState } from "react";

const { Dragger } = Upload;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadPage = () => {
  const [fileList, setFileList] = useState(Array());
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const props = {
    name: "file",
    multiple: true,
    listType: "picture-card",
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    onPreview: async (file) => {
      if (!file.url && !file.preview) file.preview = await getBase64(file.originFileObj);
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    },
    beforeUpload: async (file) => {
      if (!file.percent) file.percent = 0;
      if (!file.preview) file.preview = await getBase64(file);
      if (!file.thumbUrl) file.thumbUrl = await getBase64(file);
      setFileList((fl) => [...fl, file]);
      return false;
    },
    fileList,
  };

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    setUploading(true);
    fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("Carga exitosa.");
      })
      .catch(() => {
        message.error("Algo falló.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  /** @type React.CSSProperties */
  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "80vh",
    maxWidth: "86vw",
  };

  return (
    <>
      {/* @ts-ignore */}
      <Dragger {...props} height={200}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click o arrastre archivos a esta área para Cargar</p>
        <p className="ant-upload-hint">Soporta múltiples archivos. Tenga cuidado con los archivos privados que sube</p>
      </Dragger>
      <Button onClick={handleUpload}></Button>
      <Modal open={previewOpen} title={previewTitle} onCancel={() => setPreviewOpen(false)} footer={null} width="auto" centered>
        <div style={modalStyle}>
          <img alt="example" src={previewImage} style={{ objectFit: "contain", maxHeight: "80vh", maxWidth: "86vw", height: "auto", width: "auto" }} />
        </div>
      </Modal>
    </>
  );
};

export default UploadPage;
