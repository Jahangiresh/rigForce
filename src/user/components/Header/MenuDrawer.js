import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import navmenu from "../../configs/navmenu";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

export default function MenuDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const { t, i18n } = useTranslation();

  function clickLang(lang) {
    i18n.changeLanguage(lang);
  }
  const list = (anchor) => (
    <Box
      className="menudrawer"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="menu__header   flex justify-end p-4">
        <RxCross2 className="menu__header__x text-xl" />
      </div>
      <ul className="menu__ul flex flex-col items-center ">
        {navmenu &&
          navmenu.map((nav) => (
            <Link key={nav.id} to={nav.path} className="mb-5 flex items-center">
              {nav.name}
              <FiChevronDown
                className={`ml-2 ${!nav.hasAccordion ? "hidden" : ""}`}
              />
            </Link>
          ))}
      </ul>
      <hr />
      <ul className="menu__ul flex justify-center gap-5 py-8">
        <li onClick={() => clickLang("az")} className="menu__ul__li">
          Azərbaycan
        </li>
        <li onClick={() => clickLang("en")} className="menu__ul__li">
          English
        </li>
      </ul>
    </Box>
  );

  return (
    <div>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <FiMenu className="text-3xl" onClick={toggleDrawer(anchor, true)} />

          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
