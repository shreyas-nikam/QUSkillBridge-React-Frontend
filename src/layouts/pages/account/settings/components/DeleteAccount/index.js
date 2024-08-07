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
import MDButton from "components/MDButton";

function DeleteAccount() {
  return (
    <Card id="coursehome">
      <MDBox
        pr={3}
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <MDBox p={6} lineHeight={1}>
          <MDBox mb={3}>
            <MDTypography variant="h5">Course Title</MDTypography>
          </MDBox>
          <MDTypography variant="h6" color="text">
            Introduction
          </MDTypography>
          <MDTypography variant="button" color="text">
            Course Introduction text (The spectrum of effective attacks against
            ML is wide, rapidly evolving, and covers all phases of the ML life
            cycle - from design and implementation to training, testing, and
            finally, to deployment in the real world. This demo is intended to
            be a step toward developing a taxonomy and terminology of
            adversarial machine learning (AML), which in turn may aid in
            securing applications of artificial intelligence (AI) against
            adversarial manipulations of AI systems. We adopt the notions of
            security, resilience, and robustness of ML systems from the NIST AI
            Risk Management Framework).
          </MDTypography>
        </MDBox>
        <MDBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
          <MDButton variant="outlined" color="secondary">
            deactivate
          </MDButton>
          <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
            <MDButton variant="gradient" color="error" sx={{ height: "100%" }}>
              delete account
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default DeleteAccount;
