import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import "../scss/adminadvocates.scss";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { deleteSetting, getAllSettings } from "../../features/settingSlice";

export default function Settings() {
  const navigate = useNavigate();
  //   const [blogs, setBlogs] = useState([]);
  const settings = useSelector(getAllSettings);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSetting(id));
        // setTimeout(() => {
        //   window.location.reload(false);
        // }, 700);
        if (true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  return (
    <TableContainer component={Paper} className="adminadvocates">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="left">title</TableCell>
            <TableCell align="right">
              <span>edit</span>/<span>delete</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {settings &&
            settings.map((setting) => (
              <TableRow
                key={setting.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {setting.image ? (
                  <TableCell component="th" scope="row">
                    <img
                      className="adminadvocates__img"
                      src={`http://devserver298-001-site1.ctempurl.com/api/v1/files?filepath=${setting.image.filePath}`}
                      alt="img"
                    />
                  </TableCell>
                ) : (
                  ""
                )}
                <TableCell align="left">{setting.value}</TableCell>
                <TableCell align="left">{setting.key}</TableCell>
                <TableCell align="right" className="adminadvocates__icons">
                  <AiOutlineEdit
                    onClick={() =>
                      navigate(`/adminalshn001907/settings/edit/${setting.id}`)
                    }
                    className="edit__icons"
                  />
                  <AiOutlineDelete
                    onClick={() => handleDelete(setting.id)}
                    className="edit__icons"
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <button
        onClick={() => navigate("/adminalshn001907/settings/create")}
        className="adminadvocates__add border"
      >
        setting əlavə et <AiOutlinePlusCircle className="plus__icon" />
      </button>
    </TableContainer>
  );
}
