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
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Settings page components
import CrudService from "services/cruds-service";


function CourseHome() {
  return (
    
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      {<MDBox pr={3}
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}>
         <MDBox p={6} lineHeight={1}>
          <MDBox mb={3}>
            <MDTypography variant="h5">Course Title</MDTypography>
          </MDBox>
          <MDTypography variant="h6" color="text">
            Introduction
          </MDTypography>
          <MDTypography variant="button" color="text">
            Course Introduction text 
            (The spectrum of effective attacks against ML is wide, rapidly evolving, and covers all phases of the ML life cycle - from design and implementation to training, testing, and finally, to deployment in the real world.
            This demo is intended to be a step toward developing a taxonomy and terminology of adversarial machine learning (AML), which in turn may aid in securing applications of artificial intelligence (AI) against adversarial manipulations of AI systems.
We adopt the notions of security, resilience, and robustness of ML systems from the NIST AI Risk Management Framework).
          </MDTypography>
          <MDBox mb={3}>
          </MDBox>
          <MDTypography variant="h6" color="text">
              Key takeaways
          </MDTypography>
          <MDTypography variant="button" color="text">
            Course takeaway bullet points
          </MDTypography>
          
        </MDBox>
        
        <MDBox display="flex" justifyContent="" alignItems="flex-end" flexWrap="wrap">
        <MDButton variant="gradient" color="dark" size="small">
          Continue
        </MDButton>
      </MDBox>
       
      </MDBox>
      
      }
    </Card>
    
  
  );
  
}

export default CourseHome;
