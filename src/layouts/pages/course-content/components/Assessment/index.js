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

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Settings page components
import CrudService from "services/cruds-service";

function Assessment() {
  return (
    <Card id="quiz" sx={{ overflow: "visible" }}>
      {
        <MDBox
          pr={3}
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDBox p={6} lineHeight={1}>
            <MDBox mb={3}>
              <MDTypography variant="h5">Quiz</MDTypography>
            </MDBox>
            <MDTypography variant="h6" color="text">
              Course Name
            </MDTypography>
            

            <MDBox mb={3}></MDBox>
          </MDBox>

          <MDBox
            display="flex"
            justifyContent=""
            alignItems="flex-end"
            flexWrap="wrap"
          >
            <MDButton variant="gradient" color="dark" size="small">
              Continue
            </MDButton>
          </MDBox>
        </MDBox>
      }
    </Card>
  );
}

export default Assessment;
