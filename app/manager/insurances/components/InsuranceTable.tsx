"use client";
import React, { useState, useEffect } from "react";
import { TiDocumentAdd } from "react-icons/ti";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface InsuranceData {
  _id: string;
  vehiclereg: string;
  ownername: string;
  zinarastart: string;
  zinaraend: string;
  expiresIn: string;
  premium: number;
  phonenumber: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const calculateStatus = (endDate: string) => {
  const end = new Date(endDate);
  const today = new Date();
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Expired";
  if (diffDays <= 30) return "About to Expire";
  return "Active";
};

const InsuranceTable: React.FC = () => {
  const [data, setData] = useState<InsuranceData[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    vehicleId: "",
    ownerName: "",
    endDate: "",
    premium: "",
    phonenumber: "",
  });
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
    else console.warn("User is not logged in.");
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
    else setData([]); // Clear data if user isn't logged in
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!userId) return;

  //     try {
  //       const response = await fetch(`/api/data/${userId}`, {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       });

  //       if (!response.ok) {
  //         const errorData = await response.json().catch(() => ({}));
  //         throw new Error(errorData.message || `Error: ${response.statusText}`);
  //       }

  //       const jsonData = await response.json();
  //       setData(jsonData.data || []);
  //     } catch (error: any) {
  //       console.error("Fetch Error:", error);
  //       alert(error.message || "Failed to fetch data.");
  //     }
  //   };

  //   if (userId) fetchData();
  // }, [userId]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setData([]); // Clear data if user isn't logged in
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/data/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch data.");

        const jsonData = await response.json();
        setData(jsonData.data || []);
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("Failed to fetch insurance data.");
      }
    };

    fetchData();
  }, [userId]);

  const handleSubmit = async () => {
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const newData = {
      vehiclereg: formData.vehicleId,
      ownername: formData.ownerName,
      zinarastart: new Date().toISOString().split("T")[0],
      zinaraend: formData.endDate,
      expiresIn: calculateStatus(formData.endDate),
      phonenumber: formData.phonenumber,
      premium: Number(formData.premium),
    };

    try {
      const response = await fetch(`/api/data/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (!response.ok) throw new Error("Failed to save data.");

      const result = await response.json();
      setData([...data, result.data]); // Update state with new data
      handleClose();
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Failed to submit insurance data.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <TableContainer component={Paper}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          bgcolor="white"
          border={1} // Specifies the border width
          borderColor="#003366" // Sets the border color
          height={"60px"}
        >
          <Typography variant="h6" color="#003366" fontWeight={800}>
            All Your Insurance
          </Typography>
          <IconButton onClick={handleOpen} color="primary">
            <TiDocumentAdd size={30} />
          </IconButton>
        </Box>

        {!userId ? (
          <Typography variant="body1" color="error" sx={{ mt: 3 }}>
            Please log in to view your insurance data.
          </Typography>
        ) : data.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 3 }}>
            No insurance data found.
          </Typography>
        ) : (
          <Table>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                {[
                  "Vehicle ID",
                  "Owner Name",
                  "Start Date",
                  "End Date",
                  "Status",
                  "Premium",
                  "Phone Number",
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id} hover>
                  <TableCell>{item.vehiclereg}</TableCell>
                  <TableCell>{item.ownername}</TableCell>
                  <TableCell>{item.zinarastart}</TableCell>
                  <TableCell>
                    {item.zinaraend
                      ? new Intl.DateTimeFormat("en-US", {
                          month: "2-digit",
                          year: "2-digit",
                        }).format(new Date(item.zinaraend))
                      : "Invalid date"}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        item.expiresIn === "Active"
                          ? "green"
                          : item.expiresIn === "About to Expire"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {item.expiresIn}
                  </TableCell>
                  <TableCell>${item.premium}</TableCell>
                  <TableCell>{item.phonenumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 500, borderRadius: 2 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            color="#003366"
            fontWeight={600}
          >
            Add Insurance
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
            <TextField
              label="Vehicle ID"
              name="vehicleId"
              fullWidth
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              label="Owner Name"
              name="ownerName"
              fullWidth
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              name="phonenumber"
              fullWidth
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              label="End Date"
              type="date"
              name="endDate"
              fullWidth
              margin="normal"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Premium"
              type="number"
              name="premium"
              fullWidth
              margin="normal"
              onChange={handleChange}
            />

            <Box
              sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default InsuranceTable;
