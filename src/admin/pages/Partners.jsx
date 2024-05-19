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
        window.location.reload(false);

        Swal.fire("Silindi!", "Data silindi.", "success");
      }
    });
  };

  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              name
            </th>
            <th scope="col" className="px-6 py-3">
              img
            </th>
            <th scope="col" className="px-6 py-3">
              actions
            </th>
          </tr>
        </thead>
        <tbody>
          {partners &&
            partners.map((partner) => (
              <tr
                key={partner.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {partner.urlLink}
                </th>
                <td className="px-6 py-4 w-44">
                  <img
                    className="adminadvocates__img object-contain w-full"
                    src={`https://rigforce.az/api/v1/files?filepath=${partner.image.filePath}`}
                    alt=""
                  />
                </td>
                <td className="px-6 py-4 ">
                  <div
                    className="
          flex gap-x-3 text-2xl text-black items-center h-full"
                  >
                    <AiOutlineEdit
                      onClick={() =>
                        navigate(
                          `/adminalshn001907/partners/edit/${partner.id}`
                        )
                      }
                      className="edit__icons"
                    />
                    <AiOutlineDelete
                      onClick={() => handleDelete(partner.id)}
                      className="edit__icons"
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="w-full flex items-center justify-center h-20  bg-black/10 rounded-b-md">
        <button
          onClick={() => navigate("/adminalshn001907/partners/create")}
          className=" text-black  text-2xl"
        >
          <AiOutlinePlusCircle className="plus__icon" />
        </button>
      </div>
    </div>
  );
}
