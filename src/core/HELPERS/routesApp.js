import { HomePage } from "../components/_web/Home/HomePage";
import { EventsPage } from "../components/_web/Events/EventsPage";
import { DetailEvent } from "../components/_web/Events/DetailEvent";
import { DashboardPage } from "../components/_web/Admin/Dashboard/DashboardPage";
import { LayoutPrivate, LayoutPublic } from "../components/Layouts";


const comp_publics = [HomePage, EventsPage, DetailEvent];
const comp_privates = [DashboardPage];

const path_publics = ["/", "/events", "/event/:id"];
const path_privates = ["/"];


export const funcArrRoutes = (access = "") => {

    let arr = [];

    if (access === "PUBLIC" || access === "PRIVATE") {

        for (let i = 0; i < ((access === "PUBLIC" && comp_publics.length) ||
            (access === "PRIVATE" && comp_privates.length)); i++) {

            arr.push({
                path: (access === "PUBLIC" && path_publics[i]) || (access === "PRIVATE" && path_privates[i]),
                element: (access === "PUBLIC" && comp_publics[i]) || (access === "PRIVATE" && comp_privates[i]),
                exact: true
            });
        }
    }
    return arr;
}

export const ROUTES_APP = [

    {
        path: "/*",
        element: LayoutPublic,
        exact: false,
        routes: funcArrRoutes("PUBLIC")
    },

    {
        path: "/admin/*",
        element: LayoutPrivate,
        exact: false,
        routes: funcArrRoutes("PRIVATE")
    }
];