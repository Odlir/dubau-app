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
          {
            icon: "",
            pathname: "/roles",
            title: "Roles",
          },
          {
            icon: "",
            pathname: "/brand",
            title: "Marcas",
          },
          {
            icon: "",
            pathname: "/line",
            title: "Lineas",
          },
          {
            icon: "",
            pathname: "/area",
            title: "Areas",
          },
          {
            icon: "",
            pathname: "/maker",
            title: "Fabricantes",
          },
          {
            icon: "",
            pathname: "/waytopay",
            title: "Forma de Pago",
          },
          {
            icon: "",
            pathname: "/establishment",
            title: "Establecimiento",
          },
          {
            icon: "",
            pathname: "/typequalification",
            title: "Tipo de Calificacion",
          },
          {
            icon: "",
            pathname: "/unitmeasure",
            title: "Unidad de Medida",
          },/*
          {
            icon: "",
            pathname: "/position",
            title: "Cargo",
          },*/
        ],
      },
    ],
  },
});

export { sideMenu };
