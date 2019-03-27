/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
    {
        path: "/",
        name: "home",
        view: 'core/Home'
    },
    {
        path: "/not-found",
        name: "Not Found",
        view: 'core/404'
    },
    {
        path: "/cmip6/models",
        name: "CMIP6 Models",
        view: 'cim2/Model'
    },
    {
        path: "/cmip6/models/*/*",
        name: "CMIP6 Model",
        view: 'cim2/Model'
    },
];
