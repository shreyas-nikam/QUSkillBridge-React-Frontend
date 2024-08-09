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

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import AuthService from "services/auth-service";

function JobList({ title, jobs, shadow }) {
  const renderJobs = jobs.map(({ preferred_job, action }) => (
    <MDBox
      key={preferred_job}
      display="static"
      alignItems="center"
      py={1}
      mb={1}
    >
      <MDBox
        display="flex"
        flexDirection="row"
        alignItems="vertical"
        justifyContent="center"
      >
        <MDTypography variant="button" fontWeight="medium">
          {preferred_job}
        </MDTypography>
        <MDBox ml="auto">
          {action.type === "internal" ? (
            <MDButton
              component={Link}
              to={action.route}
              variant="text"
              color="info"
            >
              {action.label}
            </MDButton>
          ) : (
            <MDButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="text"
              color={action.color}
            >
              {action.label}
            </MDButton>
          )}
        </MDBox>
      </MDBox>
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      {
        <MDBox pt={2} px={2}>
          <MDTypography
            variant="h5"
            fontWeight="medium"
            textTransform="capitalize"
          >
            Preferred Jobs
          </MDTypography>
        </MDBox>
      }
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderJobs}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfilesList
JobList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
JobList.propTypes = {
  title: PropTypes.string.isRequired,
  preferred_jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default JobList;
