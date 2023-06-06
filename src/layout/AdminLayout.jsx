import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../admin/assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "../admin/scss/App.scss";
import Dashboard from "../admin/pages/Dashboard";
import MainLayout from "../admin/layout/MainLayout";
import Login from "../admin/pages/Login";
import AuthService from "../admin/services/AuthService";
import Categories from "../admin/pages/Categories";
import CreateCategory from "../admin/pages/CreateCategory";
import Partners from "../admin/pages/Partners";
import PartnerCreate from "../admin/pages/PartnerCreate";
import Services from "../admin/pages/Services";
import ServiceCreate from "../admin/pages/ServiceCreate";
import Settings from "../admin/pages/Settings";
import SettingCreate from "../admin/pages/SettingsCreate";
import Sliders from "../admin/pages/Sliders";
import CategoriesEdit from "../admin/pages/CategoriesEdit";
import PartnersEdit from "../admin/pages/PartnersEdit copy";
import ServicesEdit from "../admin/pages/ServicesEdit";
import SettingsEdit from "../admin/pages/SettingsEdit";
import SlidersCreate from "../admin/pages/SlidersCreate";
import SlidersEdit from "../admin/pages/SlidersEdit";
import Equipments from "../admin/pages/Equipments";
import EquipmentsCreate from "../admin/pages/EquipmentsCreate";
import ServiceCategories from "../admin/pages/ServiceCategories";
import ServiceCategoryCreate from "../admin/pages/ServiceCategoryCreate";
import ServiceCategoriesEdit from "../admin/pages/ServiceCategoriesEdit";

import EquipmentsEdit from "../admin/pages/EquipmentsEdit";

const AdminLayout = () => {
  let user1 = localStorage.getItem("user");

  const checkTokenExpiration = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const decodedToken = parseJwt(user.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        try {
          // await AuthService.refreshToken();
          user1 = localStorage.getItem("user");
        } catch (error) {
          AuthService.logout();
        }
      }
    }
  };

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    if (user1) {
      const intervalId = setInterval(checkTokenExpiration, 1000 * 10);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  return (
    <div className="admin-wrapper">
      <Router>
        <Routes>
          {user1 ? (
            <Route path="/adminalshn001907" element={<MainLayout />}>
              <Route index element={<Dashboard />} />

              <Route
                path="/adminalshn001907/categories"
                element={<Categories />}
              />
              <Route
                path="/adminalshn001907/categories/create"
                element={<CreateCategory />}
              />
              <Route
                path="/adminalshn001907/categories/edit/:id"
                element={<CategoriesEdit />}
              />
              <Route path="/adminalshn001907/partners" element={<Partners />} />
              <Route
                path="/adminalshn001907/partners/create"
                element={<PartnerCreate />}
              />
              <Route
                path="/adminalshn001907/partners/edit/:id"
                element={<PartnersEdit />}
              />
              <Route
                path="/adminalshn001907/servicescategories"
                element={<ServiceCategories />}
              />
              <Route
                path="/adminalshn001907/servicescategories/create"
                element={<ServiceCategoryCreate />}
              />
              <Route
                path="/adminalshn001907/servicescategories/edit/:id"
                element={<ServiceCategoriesEdit />}
              />
              <Route path="/adminalshn001907/services" element={<Services />} />
              <Route
                path="/adminalshn001907/services/create"
                element={<ServiceCreate />}
              />
              <Route
                path="/adminalshn001907/services/edit/:id"
                element={<ServicesEdit />}
              />
              <Route path="/adminalshn001907/settings" element={<Settings />} />
              <Route
                path="/adminalshn001907/settings/create"
                element={<SettingCreate />}
              />
              <Route
                path="/adminalshn001907/settings/edit/:id"
                element={<SettingsEdit />}
              />
              <Route path="/adminalshn001907/sliders" element={<Sliders />} />
              <Route
                path="/adminalshn001907/sliders/create"
                element={<SlidersCreate />}
              />
              <Route
                path="/adminalshn001907/sliders/edit/:id"
                element={<SlidersEdit />}
              />
              <Route
                path="/adminalshn001907/equipments"
                element={<Equipments />}
              />
              <Route
                path="/adminalshn001907/equipments/create"
                element={<EquipmentsCreate />}
              />
              <Route
                path="/adminalshn001907/equipments/edit/:id"
                element={<EquipmentsEdit />}
              />

              {/* <Route path="/adminalshn001907/services" element={<Services />} /> */}

              {/* <Route
                path="/adminalshn001907/branches/:id"
                element={<EditBranch />}
              /> */}

              {/* <Route path="/admin/login" element={<Login />} /> */}
              {/* <Route
                path="/adminalshn001907/branches"
                element={<Advocates />}
              /> */}
            </Route>
          ) : (
            <Route path="/adminalshn001907" element={<Login />} />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default AdminLayout;
