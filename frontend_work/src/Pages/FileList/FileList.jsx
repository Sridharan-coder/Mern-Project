import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Button,
  Col,
  Pagination,
  Row,
  Stack,
  Table,
} from "react-bootstrap";

const FileList = ({ file }) => {
  const [files, setFiles] = useState([]);
  const [valueCount, setValueCount] = useState(0);

  //   const handleDownload = (file) => {
  //     const path = file.filesPath.split("\\");
  //     const fileName = path[path.length - 1];

  //   };

  const fetchUsers = () => {
    axios
      .get(
        `http://localhost:3320/readAll/${valueCount}`
        // ,
        // {
        //     mode: 'no-cors',
        // }
        // {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET'
        // }
        // {
        //     'Access-Control-Allow-Origin': '*',
        //     'Content-Type': 'application/json',
        //     withCredentials: true,
        //     mode: 'no-cors',
        // }
        // {
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //         "Access-Control-Allow-Origin": "*",
        //     },
        // }
      )
      .then((response) => {
        console.log("resppppppppppppppppppppppppp", response.data.files);

        setFiles(response.data.files);
      })
      .catch((error) => console.error("Error fetching files:", error));
  };

  const handleDownload = (file) => {
    const path = file.filesPath.split("\\");
    const fileName = path[path.length - 1];
    console.log(path[path.length - 1]);
    try {
      axios
        .get(`http://localhost:3320/download/${fileName}`, {
          responseType: "blob", // Important for binary data
        })
        .then((response) => {
          // Create a URL for the file blob
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName); // Set the file name for download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // Cleanup the DOM
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });
    } catch (error) {
      console.log("Errorss ====>", error);
    }
  };

  const handleSendEmail = (file) => {
    const path = file.filesPath.split("\\");
    const fileName = path[path.length - 1];

    axios
      .post("http://localhost:3320/sendEmail", { fileName })
      .then((response) => {
        console.log("Email sent successfully:", response);
        // Optionally show a success message to the user
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        // Optionally show an error message to the user
      });
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [valueCount]);

  useEffect(() => {
    setValueCount(0);
    setFiles([]);
  }, [file]);

  console.log(files.length < 10);
  return (
    <Row style={{ marginTop: 40 }}>
      <Col xs={1}> </Col>
      <Col xs={10}>
        {files.length ? (
          <>
            <Table hover bordered>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>File Name</th>
                  <th colSpan={2}>Actions</th>
                  
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index}>
                    <td>{file._id}</td>
                    <td>{file.fileName}</td>
                    <td>
                      <Button
                        onClick={() => handleDownload(file)}
                        variant="primary"
                      >
                        Download
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => handleSendEmail(file)}
                        variant="primary"
                      >
                        Share
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Stack direction="horizontal" gap={3}>
              <Button
                onClick={() => setValueCount(valueCount - 1)}
                disabled={valueCount <= 0}
              >
                Previous
              </Button>
              <Pagination className="ms-auto paginationCount primary">
                {valueCount + 1}
              </Pagination>
              <Button
                onClick={() => setValueCount(valueCount + 1)}
                disabled={files.length < 10}
                className="ms-auto"
              >
                Next
              </Button>
            </Stack>
          </>
        ) : (
          ""
        )}
      </Col>
      <Col xs={1}> </Col>
    </Row>
  );
};

export default FileList;
