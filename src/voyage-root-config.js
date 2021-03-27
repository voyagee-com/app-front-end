import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';

// registerApplication({
//   name: "@voyage/main-app",
//   app: () =>
//     System.import(
//       "@voyage/main-app"
//     ),
//   activeWhen: ["/"],
// });

// registerApplication({
//   name: "@voyage/flights-app",
//   app: () =>
//     System.import(
//       "@voyage/flights-app"
//     ),
//   activeWhen: ["/flights"],

// });

// registerApplication({
//   name: "@voyage/hotels-app",
//   app: () =>
//     System.import(
//       "@voyage/hotels-app"
//     ),
//   activeWhen: ["/hotels"],
// });

// Example Register Application
// registerApplication({
//   name: "@voyage/navbar",
//   app: () => System.import("@voyage/navbar"),
//   activeWhen: ["/"]
// To Unique path activeWhen: (location) => location.pathname === "/flights",
// });

const routes = constructRoutes(document.querySelector('#single-spa-layout'))
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

const layoutEngine = constructLayoutEngine({ routes, applications });
applications.forEach(registerApplication);

// start({
//   urlRerouteOnly: true,
// });

System.import("@voyage/artigas-ds").then(() => {
  // Activate the layout engine once the styleguide CSS is loaded
  layoutEngine.activate();
  start({
    urlRerouteOnly: true,
  });
});