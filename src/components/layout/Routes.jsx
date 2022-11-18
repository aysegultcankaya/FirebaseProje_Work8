import SecurityLayoutRoute from "./SecurityLayout";
import UserLayoutRoute from "./UserLayout";
import Login from "../../pages/user/login";
import NotFound from "./NotFound";
import Home from "../../pages/home";

// import AddUser from "../../pages/user/addUser";

// import Companies from "../../pages/company/companies";
// import AddCompany from "../../pages/company/addCompany";

// import AddCompanyAddress from "../../pages/companyAddress/addCompanyAddress";
// import CompanyAddresses from "../../pages/companyAddress/companyAddresses";
// import Languages from "../../pages/settings/language/languages";
// import AddLanguage from "../../pages/settings/language/addLanguage";
// import Terms from "../../pages/settings/term/terms";
// import AddTerm from "../../pages/settings/term/addTerm";
// import EducationLevels from "../../pages/settings/educationLevel/educationLevels";
// import AddEducationLevel from "../../pages/settings/educationLevel/addEducationLevel";
import AddEducation from "../../pages/education/addEducation";
import Educations from "../../pages/education/educations";
// import AddLesson from "../../pages/lesson/addLesson";
// import Lessons from "../../pages/lesson/Lessons";

const routes = [
  {
    path: "/user",
    name: "user",
    component: <UserLayoutRoute />,
    routes: [
      {
        name: "login",
        path: "/user/login",
        component: <Login />,
      }
    ],
  },
  {
    path: "/",
    name: "security",
    component: <SecurityLayoutRoute />,
    routes: [
      {
        name: "dashboard",
        icon: "home",
        path: "/",
        component: <Home />,
      },
      {
        name: "educations",
        icon: "user",
        routes: [
          {
            name: "education",
            icon: "user",
            path: "/educations/add",
            component: <AddEducation />,
          },
          {
            name: "education",
            icon: "user",
            path: "/educations/list",
            component: <Educations />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    name: "notfound",
    component: <NotFound />,
  },
];

export default routes;
