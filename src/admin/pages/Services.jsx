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
import { deleteService, getAllServices } from "../../features/serviceSlice";

export default function Services() {
  const navigate = useNavigate();
  //   const [blogs, setBlogs] = useState([]);
  const services = useSelector(getAllServices);
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
        dispatch(deleteService(id));
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
        if (true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  return (
    <div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              name
            </th>
            <th scope="col" class="px-6 py-3">
              img
            </th>
            <th scope="col" class="px-6 py-3">
              actions
            </th>
          </tr>
        </thead>
        <tbody>
          {services &&
            services.map((service) => (
              <tr
                key={service.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {service.title > 20
                    ? service.title.slice(0, 20) + "..."
                    : service.title}
                </th>
                <td class="px-6 py-4 w-44">
                  <img
                    className="adminadvocates__img w-full object-contain"
                    src={`http://devserver298-001-site1.ctempurl.com/api/v1/files?filepath=${service.images[0].filePath}`}
                    alt="img"
                  />
                </td>
                <td class="px-6 py-4 ">
                  <div
                    className="
          flex gap-x-3 text-2xl text-black items-center h-full"
                  >
                    <AiOutlineEdit
                      onClick={() =>
                        navigate(
                          `/adminalshn001907/services/edit/${service.id}`
                        )
                      }
                      className="edit__icons"
                    />
                    <AiOutlineDelete
                      onClick={() => handleDelete(service.id)}
                      className="edit__icons"
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="w-full flex items-center justify-center h-20 bg-black/10 rounded-b-sm ">
        <button
          onClick={() => navigate("/adminalshn001907/services/create")}
          className=" text-black  text-2xl"
        >
          <AiOutlinePlusCircle className="plus__icon" />
        </button>
      </div>
    </div>
  );
}
