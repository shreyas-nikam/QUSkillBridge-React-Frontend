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

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexProjectCard from "examples/Cards/ProjectCards/ComplexProjectCard";

// Project page components
import Header from "layouts/pages/profile/components/Header";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

import CourseCard from "examples/Cards/CourseCard";

import AuthService from "services/auth-service";
import getId from "services/helper-service";
import CrudService from "services/cruds-service";

// Images

import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAsana from "assets/images/small-logos/logo-asana.svg";
import logoInvision from "assets/images/small-logos/logo-invision.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import booking1 from "assets/images/products/product-1-min.jpg";
import booking2 from "assets/images/products/product-2-min.jpg";
import booking3 from "assets/images/products/product-3-min.jpg";
// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";

// Action buttons for the CourseCard
const actionButtons = <></>;

function MyLibrary() {
  const [isDemo, setIsDemo] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    newPassword: "",
    currentPassword: "",
    confirmPassword: "",
    profile_image: "",
  });

  const [availableCourses, setAvailableCourses] = useState([]);

  const exploreCard = (course_id) => {
    navigate("/course-content/" + course_id);
  };

  useEffect(() => {
    (async () => {
      const response = await AuthService.getProfile();
      if (
        getId(response.data.id) == 1 ||
        getId(response.data.id) == 2 ||
        getId(response.data.id) == 3
      ) {
        setIsDemo(process.env.REACT_APP_IS_DEMO === "true");
      }
      setUser((prevUser) => ({
        ...prevUser,
        id: response.data.id,
        name: response.data.attributes.name,
        email: response.data.attributes.email,
        profile_image: response.data.attributes.profile_image,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      const courses = await CrudService.getCourses();
      setAvailableCourses(courses.data);
      console.log("Courses", availableCourses);
    })();
  }, []);

  // ComplexProjectCard dropdown menu state
  const [slackBotMenu, setSlackBotMenu] = useState(null);
  const [premiumSupportMenu, setPremiumSupportMenu] = useState(null);
  const [designToolsMenu, setDesignToolsMenu] = useState(null);
  const [lookingGreatMenu, setLookingGreatMenu] = useState(null);
  const [developerFirstMenu, setDeveloperFirstMenu] = useState(null);

  // TeamProfileCard dropdown menu handlers
  const openSlackBotMenu = (event) => setSlackBotMenu(event.currentTarget);
  const closeSlackBotMenu = () => setSlackBotMenu(null);
  const openPremiumSupportMenu = (event) =>
    setPremiumSupportMenu(event.currentTarget);
  const closePremiumSupportMenu = () => setPremiumSupportMenu(null);
  const openDesignToolsMenu = (event) =>
    setDesignToolsMenu(event.currentTarget);
  const closeDesignToolsMenu = () => setDesignToolsMenu(null);
  const openLookingGreatMenu = (event) =>
    setLookingGreatMenu(event.currentTarget);
  const closeLookingGreatMenu = () => setLookingGreatMenu(null);
  const openDeveloperFirstMenu = (event) =>
    setDeveloperFirstMenu(event.currentTarget);
  const closeDeveloperFirstMenu = () => setDeveloperFirstMenu(null);

  // Dropdown menu template for the ComplexProjectCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
    >
      <MenuItem onClick={close}>Action</MenuItem>
      <MenuItem onClick={close}>Another action</MenuItem>
      <MenuItem onClick={close}>Something else here</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar light absolute />
      </MDBox>
      <Header user={user} isDemo={isDemo} />
      <MDBox pb={3}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            <MDBox mb={1}>
              <MDTypography variant="h5">Courses</MDTypography>
            </MDBox>
            <MDBox mb={2}></MDBox>
          </Grid>
          <Grid item xs={12} md={5} sx={{ textAlign: "right" }}>
            <MDButton variant="gradient" color="info" alignItems="center">
              &nbsp; See All
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>

      <MDBox mt={2}>
        <Grid container spacing={3}>
          {availableCourses.map((course) => (
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <CourseCard
                  image={booking1}
                  title={course.attributes.app_name}
                  description={course.attributes.short_description}
                  label="Explore"
                  action={actionButtons}
                  exploreCard={() => exploreCard(course.id)}
                />
              </MDBox>
            </Grid>
          ))}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyLibrary;
