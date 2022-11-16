import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        title: "Tablero",
        subMenu: [
          {
            icon: "",
            pathname: "/layoutmain/dashboard-overview-1",
            title: "Overview 1",
          },
          {
            icon: "",
            pathname: "/dashboard-overview-2",
            title: "Overview 2",
          },
          {
            icon: "",
            pathname: "/dashboard-overview-3",
            title: "Overview 3",
          },
          {
            icon: "",
            pathname: "/dashboard-overview-4",
            title: "Overview 4",
          },
        ],
      },

      "devider",

      {
        icon: "Star",
        title: "Administración",
        subMenu: [
          {
            icon: "",
            title: "Principales",
            subMenu: [
              {
                icon: "",
                pathname: "/layoutmain/proveedor",
                title: "Proveedor",
              },
              {
                icon: "",
                pathname: "/layoutmain/cliente",
                title: "Cliente",
              },
              {
                icon: "",
                pathname: "/layoutmain/personal",
                title: "Personal",
              }
           
            ],
          },

          {
            icon: "",
            title: "Table",
            subMenu: [
              {
                icon: "",
                pathname: "/layoutmain/regular-table",
                title: "Regular Table",
              },
              {
                icon: "",
                pathname: "/layoutmain/tabulator",
                title: "Tabulator",
              },
            ],
          },
          {
            icon: "",
            title: "Overlay",
            subMenu: [
              {
                icon: "",
                pathname: "/layoutmain/modal",
                title: "Modal",
              },
              {
                icon: "",
                pathname: "/layoutmain/slide-over",
                title: "Slide Over",
              },
              {
                icon: "",
                pathname: "/layoutmain/notification",
                title: "Notification",
              },
            ],
          },
          {
            icon: "",
            pathname: "/layoutmain/tab",
            title: "Tab",
          },
          {
            icon: "",
            pathname: "/layoutmain/accordion",
            title: "Accordion",
          },
          {
            icon: "",
            pathname: "/layoutmain/button",
            title: "Button",
          },
          {
            icon: "",
            pathname: "/layoutmain/alert",
            title: "Alert",
          },
          {
            icon: "",
            pathname: "/layoutmain/progress-bar",
            title: "Progress Bar",
          },
          {
            icon: "",
            pathname: "/layoutmain/tooltip",
            title: "Tooltip",
          },
          {
            icon: "",
            pathname: "/layoutmain/dropdown",
            title: "Dropdown",
          },
          {
            icon: "",
            pathname: "/layoutmain/typography",
            title: "Typography",
          },
          {
            icon: "",
            pathname: "/layoutmain/layoutmain/icon",
            title: "Icon",
          },
          {
            icon: "",
            pathname: "/layoutmain/loading-icon",
            title: "Loading Icon",
          },
        ],
      },

      // {
      //   icon: "Box",
      //   title: "Menu Layout",
      //   subMenu: [
      //     {
      //       icon: "",
      //       pathname: "/",
      //       title: "Side Menu",
      //       ignore: true,
      //     },
      //     {
      //       icon: "",
      //       pathname: "/simple-menu/dashboard-overview-1",
      //       title: "Simple Menu",
      //       ignore: true,
      //     },
      //     {
      //       icon: "",
      //       pathname: "/top-menu/dashboard-overview-1",
      //       title: "Top Menu",
      //       ignore: true,
      //     },
      //   ],
      // },
      // {
      //   icon: "ShoppingBag",
      //   title: "E-Commerce",
      //   subMenu: [
      //     {
      //       icon: "",
      //       pathname: "/categories",
      //       title: "Categories",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/add-product",
      //       title: "Add Product",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/products",
      //       title: "Products",
      //       subMenu: [
      //         {
      //           icon: "",
      //           pathname: "/product-list",
      //           title: "Product List",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/product-grid",
      //           title: "Product Grid",
      //         },
      //       ],
      //     },
      //     {
      //       icon: "",
      //       pathname: "/transactions",
      //       title: "Transactions",
      //       subMenu: [
      //         {
      //           icon: "",
      //           pathname: "/transaction-list",
      //           title: "Transaction List",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/transaction-detail",
      //           title: "Transaction Detail",
      //         },
      //       ],
      //     },
      //     {
      //       icon: "",
      //       pathname: "/sellers",
      //       title: "Sellers",
      //       subMenu: [
      //         {
      //           icon: "",
      //           pathname: "/seller-list",
      //           title: "Seller List",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/seller-detail",
      //           title: "Seller Detail",
      //         },
      //       ],
      //     },
      //     {
      //       icon: "",
      //       pathname: "/reviews",
      //       title: "Reviews",
      //     },
      //   ],
      // },
      // {
      //   icon: "Inbox",
      //   pathname: "/inbox",
      //   title: "Inbox",
      // },
      // {
      //   icon: "HardDrive",
      //   pathname: "/file-manager",
      //   title: "File Manager",
      // },
      // {
      //   icon: "CreditCard",
      //   pathname: "/point-of-sale",
      //   title: "Point of Sale",
      // },
      // {
      //   icon: "MessageSquare",
      //   pathname: "/chat",
      //   title: "Chat",
      // },
      // {
      //   icon: "FileText",
      //   pathname: "/post",
      //   title: "Post",
      // },
      // {
      //   icon: "Calendar",
      //   pathname: "/calendar",
      //   title: "Calendar",
      // },
      // "devider",
      // {
      //   icon: "Edit",
      //   title: "Crud",
      //   subMenu: [
      //     {
      //       icon: "",
      //       pathname: "/crud-data-list",
      //       title: "Data List",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/crud-form",
      //       title: "Form",
      //     },
      //   ],
      // },
      // {
      //   icon: "Users",
      //   title: "Users",
      //   subMenu: [
      //     {
      //       icon: "",
      //       pathname: "/users-layout-1",
      //       title: "Layout 1",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/users-layout-2",
      //       title: "Layout 2",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/users-layout-3",
      //       title: "Layout 3",
      //     },
      //   ],
      // },
      // {
      //   icon: "Trello",
      //   title: "Profile",
      //   subMenu: [
      //     {
      //       icon: "",
      //       pathname: "/profile-overview-1",
      //       title: "Overview 1",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/profile-overview-2",
      //       title: "Overview 2",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/profile-overview-3",
      //       title: "Overview 3",
      //     },
      //   ],
      // },
      // {
      //   icon: "Layout",
      //   title: "Pages",
      //   subMenu: [
      //     {
      //       icon: "",
      //       title: "Wizards",
      //       subMenu: [
      //         {
      //           icon: "",
      //           pathname: "/wizard-layout-1",
      //           title: "Layout 1",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/wizard-layout-2",
      //           title: "Layout 2",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/wizard-layout-3",
      //           title: "Layout 3",
      //         },
      //       ],
      //     },
      //     {
      //       icon: "",
      //       title: "Blog",
      //       subMenu: [
      //         {
      //           icon: "",
      //           pathname: "/blog-layout-1",
      //           title: "Layout 1",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/blog-layout-2",
      //           title: "Layout 2",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/blog-layout-3",
      //           title: "Layout 3",
      //         },
      //       ],
      //     },
      //     {
      //       icon: "",
      //       title: "Pricing",
      //       subMenu: [
      //         {
      //           icon: "",
      //           pathname: "/pricing-layout-1",
      //           title: "Layout 1",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/pricing-layout-2",
      //           title: "Layout 2",
      //         },
      //       ],
      //     },
      //     {
      //       icon: "",
      //       title: "Invoice",
      //       subMenu: [
      //         {
      //           icon: "",
      //           pathname: "/invoice-layout-1",
      //           title: "Layout 1",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/invoice-layout-2",
      //           title: "Layout 2",
      //         },
      //       ],
      //     },
      //     {
      //       icon: "",
      //       title: "FAQ",
      //       subMenu: [
      //         {
      //           icon: "",
      //           pathname: "/faq-layout-1",
      //           title: "Layout 1",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/faq-layout-2",
      //           title: "Layout 2",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/faq-layout-3",
      //           title: "Layout 3",
      //         },
      //       ],
      //     },
      //     {
      //       icon: "",
      //       pathname: "login",
      //       title: "Login",
      //     },
      //     {
      //       icon: "",
      //       pathname: "register",
      //       title: "Register",
      //     },
      //     {
      //       icon: "",
      //       pathname: "error-page",
      //       title: "Error Page",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/update-profile",
      //       title: "Update profile",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/change-password",
      //       title: "Change Password",
      //     },
      //   ],
      // },
      // "devider",
      // {
      //   icon: "Inbox",
      //   title: "Components",
      //   subMenu: [
      //     {
      //       icon: "",
      //       title: "Table",
      //       subMenu: [
      //         {
      //           icon: "",
      //           pathname: "/regular-table",
      //           title: "Regular Table",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/tabulator",
      //           title: "Tabulator",
      //         },
      //       ],
      //     },
      //     {
      //       icon: "",
      //       title: "Overlay",
      //       subMenu: [
      //         {
      //           icon: "",
      //           pathname: "/modal",
      //           title: "Modal",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/slide-over",
      //           title: "Slide Over",
      //         },
      //         {
      //           icon: "",
      //           pathname: "/notification",
      //           title: "Notification",
      //         },
      //       ],
      //     },
      //     {
      //       icon: "",
      //       pathname: "/tab",
      //       title: "Tab",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/accordion",
      //       title: "Accordion",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/button",
      //       title: "Button",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/alert",
      //       title: "Alert",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/progress-bar",
      //       title: "Progress Bar",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/tooltip",
      //       title: "Tooltip",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/dropdown",
      //       title: "Dropdown",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/typography",
      //       title: "Typography",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/icon",
      //       title: "Icon",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/loading-icon",
      //       title: "Loading Icon",
      //     },
      //   ],
      // },
      {
        icon: "Sidebar",
        title: "Forms",
        subMenu: [
          {
            icon: "",
            pathname: "/layoutmain/regular-form",
            title: "Regular Form",
          },
          {
            icon: "",
            pathname: "/layoutmain/datepicker",
            title: "Datepicker",
          },
          {
            icon: "",
            pathname: "/layoutmain/tom-select",
            title: "Tom Select",
          },
          {
            icon: "",
            pathname: "/layoutmain/file-upload",
            title: "File Upload",
          },
          {
            icon: "",
            pathname: "/layoutmain/wysiwyg-editor",
            title: "Wysiwyg Editor",
          },
          {
            icon: "",
            pathname: "/layoutmain/validation",
            title: "Validation",
          },
        ],
      },
      // {
      //   icon: "HardDrive",
      //   title: "Widgets",
      //   subMenu: [
      //     {
      //       icon: "",
      //       pathname: "/chart",
      //       title: "Chart",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/slider",
      //       title: "Slider",
      //     },
      //     {
      //       icon: "",
      //       pathname: "/image-zoom",
      //       title: "Image Zoom",
      //     },
      //   ],
      // },
    ],
  },
});

export { sideMenu };
