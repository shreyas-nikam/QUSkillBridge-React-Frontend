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

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
//import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Settings page components
//import FormField from "layouts/pages/account/components/FormField";
import CrudService from "services/cruds-service";

// Data
import CourseInfoData from "layouts/pages/account/Course Content/components/CourseHome/data/CourseInfoData";

function CourseHome() {
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Introduction</MDTypography>
      </MDBox>
      
      <MDBox mb={1}>
          <MDTypography variant="body2" color="text">
            Please follow this guide for learning more about the course.
          </MDTypography>
          <MDTypography variant="button" color="text">
            Course introduction scbagdaud
          </MDTypography>
        </MDBox>
        <MDBox ml="auto">
            <MDButton variant="gradient" color="dark" size="small">
              Continue
            </MDButton>
          </MDBox>
    </Card>
  );
}

export default CourseHome;
