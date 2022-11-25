import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        title: "Dashboard",
        subMenu: [
          {
            icon: "",
            pathname: "/dashboard",
            title: "View 1",
          },
        ],
      },
      {
        icon: "Box",
        title: "Mantenimientos",
        subMenu: [
          {
            icon: "",
            pathname: "/users",
            title: "Usuarios",
          },
        ],
      },
    ],
  },
});

export { sideMenu };
