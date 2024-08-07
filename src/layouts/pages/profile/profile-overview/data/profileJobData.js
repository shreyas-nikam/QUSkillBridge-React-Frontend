/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Images
{/*import kal from "assets/images/kal-visuals-square.jpg";
import marie from "assets/images/marie.jpg";
import ivana from "assets/images/ivana-square.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";*/}
import userEvent from "@testing-library/user-event";
import AuthService from "services/auth-service";

const profileJobData = [
  {
    
    name: "Product Designer",
    action: {
      type: "internal",
      route: "/pages/profile/profile-overview",
      color: "info",
      label: "Edit",
    },
  },
  {
    
    name: "Product Engineer",
    action: {
      type: "internal",
      route: "/pages/profile/profile-overview",
      color: "info",
      label: "Edit",
    },
  },
  {
    
    name: "UX Designer",
    action: {
      type: "internal",
      route: "/pages/profile/profile-overview",
      color: "info",
      label: "Edit",
    },
  },

  {
    
    name: "UX Researcher",
    action: {
      type: "internal",
      route: "/pages/profile/profile-overview",
      color: "info",
      label: "Edit",
    },
  },
  
  
];

export default profileJobData;
