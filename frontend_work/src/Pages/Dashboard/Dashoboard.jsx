import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import FileList from "../FileList/FileList";

const Dashboard = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:3320/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="fileUpload">
                <Form.Label>Upload File</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} required />
              </Form.Group>
              <Button type="submit">Upload</Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <FileList file={file} />
    </>
  );
};

export default Dashboard;
