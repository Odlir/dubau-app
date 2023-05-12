import {atom} from "recoil";

const sideMenu = atom({
    key: "sideMenu",
    default: {
        menu: [
            {
                icon: "Airplay",
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
                icon: "Wrench",
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
                    },
                    {
                        icon: "",
                        pathname: "/category",
                        title: "Categoria",
                    },
                    {
                        icon: "",
                        pathname: "/paymentcondition",
                        title: "Condicion de Pago",
                    },
                    {
                        icon: "",
                        pathname: "/commercialSection",
                        title: "Sector Comercial",
                    },
                    {
                        icon: "",
                        pathname: "/ProductServiceType",
                        title: "Tipo de Producto / Servicio",
                    },

                    /*
                    {
                      icon: "",
                      pathname: "/position",
                      title: "Cargo",
                    }, */
                ],
            },
            {
                icon: "Users",
                title: "Principal",
                subMenu: [


                    {
                        icon: "",
                        pathname: "/businessEntity",
                        title: "Persona",
                    },
                ]
            },
            {
                icon: "Package",
                title: "Almacen",
                subMenu: [
                    {
                        icon: "",
                        pathname: "/Product",
                        title: "Producto",
                    },
                    {
                        icon: "",
                        pathname: "/Service",
                        title: "Servicio",
                    },
                    {
                        icon: "",
                        pathname: "/Inventory",
                        title: "Inventario",
                    },
                    {
                        icon: "",
                        pathname: "/Family",
                        title: "Familia",
                    },
                ]
            },
        ],
    },
});

export {sideMenu};
