import * as React from "react";

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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Language
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {equipments &&
            equipments.map((equipment) => (
              <tr
                key={equipment.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center justify-start px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full object-contain"
                    src={`https://rigforce.az/api/v1/files?filepath=${equipment?.images?.[0]?.filePath}`}
                    alt="img"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {equipment.title > 20
                        ? equipment.title.slice(0, -3).slice(0, 20) + "..."
                        : equipment.title.slice(0, -3)}
                    </div>
                    <div className="font-normal text-gray-500">
                      {equipment.productCode}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {equipment.description && equipment.description.length >= 100
                    ? equipment.description.substring(0, 100)
                    : equipment.description}
                  ...
                </td>
                <td className="px-6 py-4">
                  {equipment.accreditedTo && equipment.accreditedTo}
                </td>
                <td className="px-6 py-4 capitalize">
                  {equipment.title && equipment.title.slice(-2)}
                </td>
                <td className="px-6 py-4">
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
