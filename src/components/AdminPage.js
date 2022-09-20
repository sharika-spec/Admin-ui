import { config } from "../App";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import EditUserDetails from "./EditUserDetails";

export const AdminPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPageRows = filteredRows.length
    ? filteredRows.slice(indexOfFirstPost, indexOfLastPost)
    : rows.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const callAPI = async () => {
      const response = await performAPICall();
      setRows(response);
    };
    callAPI();
  }, []);

  const performAPICall = async () => {
    try {
      const { data } = await axios.get(config.endpoint);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(currentPageRows.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleCheckboxClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const handleDelete = (userId) => {
    if (filteredRows.length > 0) {
      const newRows = filteredRows.filter((user) => user.id !== userId);
      setFilteredRows(newRows);
    } else {
      const newRows = rows.filter((user) => user.id !== userId);
      setRows(newRows);
    }

    if (rows.includes(userId) || filteredRows.includes(userId))
      enqueueSnackbar("No data is deleted", {
        variant: "warning",
        autoHideDuration: 1000,
      });
    else {
      enqueueSnackbar("Data deleted successfully", {
        variant: "success",
        autoHideDuration: 1000,
      });
    }
  };

  const handleBulkDelete = () => {
    if (filteredRows.length > 0) {
      const newRows = filteredRows.filter((user) => !isCheck.includes(user.id));
      setFilteredRows(newRows);
    } else {
      const newRows = rows.filter((user) => !isCheck.includes(user.id));
      setRows(newRows);
    }

    if (isCheckAll) setIsCheckAll(!isCheckAll);
    const deletedData = filteredRows.length
      ? filteredRows.filter((user) => isCheck.includes(user.id))
      : rows.filter((user) => isCheck.includes(user.id));

    if (deletedData.length > 0)
      enqueueSnackbar("Data deleted successfully", {
        variant: "success",
        autoHideDuration: 1000,
      });
    else {
      enqueueSnackbar("No data are deleted", {
        variant: "warning",
        autoHideDuration: 1000,
      });
    }
  };

  const filterByNameEmailRole = (item, searchBy) => {
    if (
      item.name.toLowerCase().includes(searchBy.toLowerCase()) ||
      item.email.toLowerCase().includes(searchBy.toLowerCase()) ||
      item.role.toLowerCase() === searchBy.toLowerCase()
    ) {
      return item;
    }
  };

  const searchByNameEmailRole = (e) => {
    setSearchText(e.target.value);
    setFilteredRows(
      rows.filter((item) => filterByNameEmailRole(item, e.target.value))
    );
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdate = (userDetails) => {
    if (filteredRows.length > 0) {
      const newRows = filteredRows.map((item) => {
        if (item.id === userDetails.id) {
          return { ...item, ...userDetails };
        }
        return item;
      });

      setFilteredRows(newRows);
    } else {
      const newRows = rows.map((item) => {
        if (item.id === userDetails.id) {
          return { ...item, ...userDetails };
        }
        return item;
      });
      setRows(newRows);
    }
  };

  return (
    <div>
      <Box
        sx={{
          m: 4,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search by name,email or role"
          variant="outlined"
          name="search"
          value={searchText}
          fullWidth
          onChange={(e) => {
            searchByNameEmailRole(e);
          }}
          InputProps={{
            style: {
              color: "black",
            },
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: "gray" }} />
              </InputAdornment>
            ),
          }}
        />

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">
                <input
                  id="selectAll"
                  name="selectAll"
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={isCheckAll}
                />
              </th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPageRows.map((val, key) => {
              return (
                <tr key={val.id}>
                  <th scope="row">
                    <input
                      id={val.id}
                      name={val.name}
                      type="checkbox"
                      onChange={handleCheckboxClick}
                      checked={isCheck.includes(val.id)}
                    />
                  </th>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.role}</td>
                  <td>
                    <Stack spacing={2} direction="row">
                      <EditUserDetails
                        key={val.id}
                        userId={val.id}
                        username={val.name}
                        emailAddress={val.email}
                        role={val.role}
                        handleUpdate={handleUpdate}
                      />

                      <DeleteOutlineIcon
                        sx={{ color: "red" }}
                        onClick={() => {
                          handleDelete(val.id);
                        }}
                      />
                    </Stack>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Stack
          justifyContent="space-between"
          alignItems="flex-start"
          direction="row"
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "red", borderRadius: 50 }}
            onClick={handleBulkDelete}
          >
            Delete Selected
          </Button>

          <Pagination
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            totalPosts={
              filteredRows.length > 0 ? filteredRows.length : rows.length
            }
            paginate={paginate}
          />
        </Stack>
      </Box>
    </div>
  );
};
