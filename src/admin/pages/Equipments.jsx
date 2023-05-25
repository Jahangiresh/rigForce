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
import {
  deleteEquipment,
  getAllEquipments,
} from "../../features/EquipmentSlice";

export default function Equipments() {
  const navigate = useNavigate();
  //   const [blogs, setBlogs] = useState([]);
  const equipments = useSelector(getAllEquipments);
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
        dispatch(deleteEquipment(id));
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
            <TableCell align="left">title</TableCell>
            <TableCell align="left">title</TableCell>
            <TableCell align="left">title</TableCell>
            <TableCell align="left">title</TableCell>
            <TableCell align="left">title</TableCell>
            <TableCell align="left">title</TableCell>
            <TableCell align="left">title</TableCell>
            <TableCell align="left">title</TableCell>
            <TableCell align="left">title</TableCell>
            <TableCell align="right">
              <span>edit</span>/<span>delete</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipments &&
            equipments.map((equipment) => (
              <TableRow
                key={equipment.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    className="adminadvocates__img"
                    src={`http://devserver298-001-site1.ctempurl.com/api/v1/files?filepath=${equipment.equipmentCategory.image.filePath}`}
                    alt="img"
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {equipment &&
                    equipment.images.map((image) => (
                      <img
                        className="adminadvocates__img"
                        src={`http://devserver298-001-site1.ctempurl.com/api/v1/files?filepath=${image.filePath}`}
                        alt="img"
                      />
                    ))}
                </TableCell>
                <TableCell align="left">{equipment.title}</TableCell>
                <TableCell align="left">{equipment.description}</TableCell>
                <TableCell align="left">{equipment.productCode}</TableCell>
                <TableCell align="left">{equipment.accreditedTo}</TableCell>
                <TableCell align="left">{equipment.fittings}</TableCell>
                <TableCell align="left">{equipment.material}</TableCell>
                <TableCell align="left">{equipment.weight}</TableCell>
                <TableCell align="left">{equipment.size}</TableCell>
                <TableCell align="left">{equipment.features}</TableCell>
                <TableCell align="left">
                  {equipment &&
                    equipment.files.map((file) => (
                      <div>
                        <a
                          href={file.filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View File
                        </a>
                      </div>
                    ))}
                </TableCell>

                <TableCell align="right" className="adminadvocates__icons">
                  <AiOutlineEdit
                    onClick={() =>
                      navigate(
                        `/adminalshn001907/equipments/edit/${equipment.id}`
                      )
                    }
                    className="edit__icons"
                  />
                  <AiOutlineDelete
                    onClick={() => handleDelete(equipment.id)}
                    className="edit__icons"
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <button
        onClick={() => navigate("/adminalshn001907/equipments/create")}
        className="adminadvocates__add border"
      >
        slider əlavə et <AiOutlinePlusCircle className="plus__icon" />
      </button>
    </TableContainer>
  );
}
