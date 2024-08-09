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

// @react-jvectormap components
import { VectorMap } from "@react-jvectormap/core";
import { worldMerc } from "@react-jvectormap/world";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import SalesTable from "examples/Tables/SalesTable";

// Data
import salesTableData from "layouts/dashboards/analytics/components/SalesByCountry/data/salesTableData";
import MDButton from "components/MDButton";

function SalesByCountry() {
  return (
    <Card sx={{ width: "100%" }}>
      <MDBox display="flex">
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          variant="gradient"
          bgColor="success"
          color="white"
          shadow="md"
          borderRadius="xl"
          ml={3}
          mt={-2}
        >
          <Icon fontSize="medium" color="inherit">
            language
          </Icon>
        </MDBox>
        <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
          Sales by Country
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={12} md={7} lg={10}>
            <SalesTable rows={salesTableData} shadow={false}/>
          </Grid>
          <Grid item xs={12} md={5} lg={2}>
            <MDButton variant="outlined" color="info"> 
              View Details
            </MDButton>
            <MDButton variant="outlined" color="info"> 
              View Details
            </MDButton>
            </Grid>
          
        </Grid>
      </MDBox>
    </Card>
  );
}

export default SalesByCountry;
