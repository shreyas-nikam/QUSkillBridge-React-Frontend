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


// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import BaseLayout from "layouts/pages/account/components/BaseLayout";

// Overview page components
import Header from "layouts/pages/profile/components/Header";
import PlatformSettings from "layouts/pages/profile/profile-overview/components/PlatformSettings";

// Data
import profileJobData from "layouts/pages/profile/profile-overview/data/profileJobData";
import profileJobLocationData from "layouts/pages/profile/profile-overview/data/profileJobLocationData";
// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import ResumeInformation from "../ResumeInfo";


import AuthService from "services/auth-service";
import getId from "services/helper-service";

function Overview() {

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    newPassword: "",
    currentPassword: "",
    confirmPassword: "",
    profile_image: "",
    linkedin_profile_id: "",
    summary: "",
    headline: "",
    skills: "",
    preferred_jobs: "",
    preferred_locations: "",
    education: "",
    experience: "",
    location_name: "",
    resume_location: "",
    jobs_visited: "",
    available_courses: "",
  });

  useEffect(() => {
    (async () => {
      const response = await AuthService.getProfile();
      setUser((prevUser) => ({
        ...prevUser,
        id: response.data.id,
        name: response.data.attributes.name,
        email: response.data.attributes.email,
        password: response.data.attributes.password,
        newPassword: response.data.attributes.newPassword,
        currentPassword: response.data.attributes.currentPassword,
        confirmPassword: response.data.attributes.confirmPassword,
        profile_image: response.data.attributes.profile_image,
        linkedin_profile_id: response.data.attributes.linkedin_profile_id,
        summary: response.data.attributes.summary,
        headline: response.data.attributes.headline,
        skills: response.data.attributes.skills,
        preferred_jobs: response.data.attributes.preferred_jobs,
        preferred_locations: response.data.attributes.preferred_locations,
        education: response.data.attributes.education,
        experience: response.data.attributes.experience,
        location_name: response.data.attributes.location_name,
        resume_location: response.data.attributes.resume_location,
        jobs_visited: response.data.attributes.jobs_visited,
        available_courses: response.data.attributes.available_courses,
      }));
    })();
  }, []);




  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header user={user}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={2}>
           
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="Profile Summary"
                description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                info={{
                  fullName: "Alec M. Thompson",
                  mobile: "(44) 123 1234 123",
                  email: "alecthompson@mail.com",
                  location: "USA",
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList title="Preferred Jobs" profiles={profileJobData} shadow={false} />
               <Divider orientation="vertical" sx={{ ml: 20, mr: -1 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList title="Preferred locations" profiles={profileJobLocationData} shadow={false} />
               <Divider orientation="vertical" sx={{ ml: 20, mr: -1 }} />
            </Grid>
          </Grid> 
          </MDBox>
          <MDBox mb={3}>
          
        
        </MDBox>
        
      </Header>
      <MDBox mt={3} mb={3}>
      <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ResumeInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              Skill tags
            </Grid>
          </Grid>
          </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
