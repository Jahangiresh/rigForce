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
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Position
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {equipments &&
            equipments.map((equipment) => (
              <tr
                key={equipment.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="flex items-center justify-start px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    class="w-10 h-10 rounded-full object-contain"
                    src={`http://devserver298-001-site1.ctempurl.com/api/v1/files?filepath=${equipment.equipmentCategory.image.filePath}`}
                    alt="img"
                  />
                  <div class="pl-3">
                    <div class="text-base font-semibold">{equipment.title}</div>
                    <div class="font-normal text-gray-500">
                      {equipment.productCode}
                    </div>
                  </div>
                </th>
                <td class="px-6 py-4">
                  {equipment.description && equipment.description.length >= 100
                    ? equipment.description.substring(0, 100)
                    : equipment.description}
                  ...
                </td>
                <td class="px-6 py-4">
                  {equipment.accreditedTo && equipment.accreditedTo}
                </td>
                <td class="px-6 py-4">
                  {equipment.material && equipment.material}
                </td>
                <td class="px-6 py-4">
                  <div className="flex gap-x-4 text-2xl text-black">
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
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="w-full flex items-center justify-center h-20 ">
        <button
          onClick={() => navigate("/adminalshn001907/equipments/create")}
          className=" text-black  text-2xl"
        >
          <AiOutlinePlusCircle className="plus__icon" />
        </button>
      </div>
    </div>
  );
}
