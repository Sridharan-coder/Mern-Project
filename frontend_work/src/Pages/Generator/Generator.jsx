import axios from "axios";
import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const Generator = () => {
  const districts = [
    "",
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ];

  const handleGeneratePDF = async (event) => {
    event.preventDefault();
  
    // Get the form element
    const form = event.target.closest("form");
  
    // Extract form data
    const data = new FormData(form);
    const formValues = Object.fromEntries(data.entries());
  
    // Create PDF document
    const doc = new jsPDF();
    Object.entries(formValues).forEach(([key, value], index) => {
      doc.text(20, 20 + index * 10, `${key}: ${value}`);
    });
  
    // Convert PDF to Blob
    const pdfBlob = doc.output("blob");
    const file = new File([pdfBlob], "form-data.pdf", { type: "application/pdf" });
  
    // Prepare FormData
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post("http://localhost:3320/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Error uploading PDF");
    }
  };
  
  
  
  const handleGenerateExcel = async (event) => {
    event.preventDefault();
  
    // Get the form element
    const form = event.target.closest("form");
  
    // Extract form data
    const data = new FormData(form);
    const formValues = Object.fromEntries(data.entries());
  
    // Create Excel file
    const ws = XLSX.utils.json_to_sheet([formValues]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FormData");
    const excelBlob = new Blob([XLSX.write(wb, { bookType: "xlsx", type: "array" })], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const file = new File([excelBlob], "form-data.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  
    // Prepare FormData
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post("http://localhost:3320/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error uploading Excel:", error);
      alert("Error uploading Excel");
    }
  };
  
  
  
  return (
    <Form style={{ marginTop: 50 }} className="w-50 mx-auto">
      <Form.Group controlId="eventName">
        <FloatingLabel className="mb-3" label="Event Name">
          <Form.Control name="eventName" type="text" required />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="name">
        <FloatingLabel className="mb-3" label="Name">
          <Form.Control name="name" type="text" required />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="phoneNumber">
        <FloatingLabel className="mb-3" label="Phone Number">
          <Form.Control name="phoneNumber" type="number" required />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="email">
        <FloatingLabel className="mb-3" label="Email">
          <Form.Control name="email" type="email" required />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="location">
        <FloatingLabel className="mb-3" label="Location">
          <Form.Select name="location" required>
            {districts.map((dis) => (
              <option key={dis} value={dis}>
                {dis}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="eventDate">
        <FloatingLabel className="mb-3" label="Event Date">
          <Form.Control name="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} required />
        </FloatingLabel>
      </Form.Group>
      <Row className="px-2">
        <Col xs={6}>
          <Button variant="dark" type="submit" onClick={handleGeneratePDF}>
            Generate PDF
          </Button>
        </Col>
        <Col xs={6}>
          <Button variant="dark" type="submit" onClick={handleGenerateExcel}>
            Generate Excel
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Generator;
