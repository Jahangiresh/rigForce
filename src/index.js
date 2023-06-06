import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18next";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "./assets/css/index.css";
import categorySlice, { categoryFetch } from "./features/categorySlice";
import partnerSlice, { PartnerFetch } from "./features/partnerSlice";
import ServiceSlice, { ServiceFetch } from "./features/serviceSlice";
import settingSlice, { settingFetch } from "./features/settingSlice";
import sliderSlice, { sliderFetch } from "./features/sliderSlice";
import contactSlice, { contactFetch } from "./features/contactSlice";
import EquipmentSlice, { equipmentFetch } from "./features/EquipmentSlice";
import serviceCategorySlice, {
  serviceCategoryFetch,
} from "./features/serviceCategorySlice";
const store = configureStore({
  reducer: {
    categories: categorySlice,
    partners: partnerSlice,
    services: ServiceSlice,
    settings: settingSlice,
    slider: sliderSlice,
    contact: contactSlice,
    equipment: EquipmentSlice,
    serviceCategories: serviceCategorySlice,
  },
});
store.dispatch(categoryFetch());
store.dispatch(PartnerFetch());
store.dispatch(ServiceFetch());
store.dispatch(settingFetch());
store.dispatch(sliderFetch());
store.dispatch(contactFetch());
store.dispatch(equipmentFetch());
store.dispatch(serviceCategoryFetch());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
