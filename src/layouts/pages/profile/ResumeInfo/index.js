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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
//import Bill from "layouts/pages/account/billing/components/Bill";
import Resume from "layouts/pages/profile/Resume";


function ResumeInformation() {
  return (
    <Card>
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Resume Files
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Resume
            name="oliver liam"
            jobTitle="viking burrito"
            date="oliver@burrito.com"
            fileName="FRB1235476"
          />
          
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ResumeInformation;
