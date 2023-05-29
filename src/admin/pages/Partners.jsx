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
import { Toaster } from "react-hot-toast";

import {
  deletePartner,
  getAllPartners,
  getStatus,
} from "../../features/partnerSlice";

export default function Partners() {
  const navigate = useNavigate();
  const partners = useSelector(getAllPartners);
  //   const status = useSelector(getStatus);
  //   const isDeleting = useSelector(getIsDeleting);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Əminsən?",
      text: "silnən data geri qayıtmır!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sil!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePartner(id));
        // window.location.reload(false);

        // if (isDeleting) {
        //   Swal.fire("Silindi!", "Data silindi.", "success");
        // }
      }
    });
  };

  return (
    <TableContainer component={Paper} className="adminadvocates">
      <div>
        <Toaster />
      </div>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">
              <span>edit</span>/<span>delete</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {partners &&
            partners.map((partner) => (
              <TableRow
                key={partner.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    className="adminadvocates__img"
                    src={`http://devserver298-001-site1.ctempurl.com/api/v1/files?filepath=${partner.image.filePath}`}
                    alt=""
                  />
                </TableCell>
                <TableCell align="right">{partner.urlLink}</TableCell>
                <TableCell align="right" className="adminadvocates__icons">
                  <AiOutlineEdit
                    onClick={() =>
                      navigate(`/adminalshn001907/partners/edit/${partner.id}`)
                    }
                    className="edit__icons"
                  />
                  <AiOutlineDelete
                    onClick={() => handleDelete(partner.id)}
                    className="edit__icons"
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <button
        onClick={() => navigate("/adminalshn001907/partners/create")}
        className="adminadvocates__add"
      >
        partner əlavə et <AiOutlinePlusCircle className="plus__icon" />
      </button>
    </TableContainer>
  );
}
