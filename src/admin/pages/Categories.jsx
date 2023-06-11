import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  deleteCategory,
  getAllCategories,
} from "../../../src/features/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import "../scss/adminadvocates.scss";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();
  //   const [blogs, setBlogs] = useState([]);
  const categories = useSelector(getAllCategories);
  const dispatch = useDispatch();
  React.useEffect(() => {}, []);
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
        dispatch(deleteCategory(id));
        // setTimeout(() => {
        //   window.location.reload(false);
        // }, 700);
        // if (true) {
        //   Swal.fire("Deleted!", "Your file has been deleted.", "success");
        // }
      }
    });
  };

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
          {categories &&
            categories.map((category) => (
              <tr
                key={category.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {category.title > 20
                    ? category.title.slice(0, 20) + "..."
                    : category.title}
                </th>
                <td class="px-6 py-4 w-44">
                  <img
                    className="adminadvocates__img w-full object-contain"
                    src={`https://rigforce.az/api/v1/files?filepath=${category.image.filePath}`}
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
                          `/adminalshn001907/categories/edit/${category.id}`
                        )
                      }
                      className="edit__icons"
                    />
                    <AiOutlineDelete
                      onClick={() => handleDelete(category.id)}
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
          onClick={() => navigate("/adminalshn001907/categories/create")}
          className=" text-black  text-2xl"
        >
          <AiOutlinePlusCircle className="plus__icon" />
        </button>
      </div>
    </div>
  );
}
