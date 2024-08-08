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
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Tooltip, IconButton, Icon } from "@mui/material";

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
import DataTable from "examples/Tables/DataTable";


// Overview page components
import Header from "layouts/pages/profile/components/Header";
import PlatformSettings from "layouts/pages/profile/profile-overview/components/PlatformSettings";

// Data
import profilesListData from "layouts/pages/profile/profile-overview/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";


import AuthService from "services/auth-service";
import getId from "services/helper-service";
import CrudService from "services/cruds-service";
import MDAvatar from "components/MDAvatar";

function Overview() {

  const [visitedJobs, setVisitedJobs] = useState([]);
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
    linkedin_profile_id: "",
    summary: "",
    headline: "",
    skills: "",
    preferred_jobs: [],
    preferred_locations: [],
    education: [],
    experience: [],
    location_name: "",
    resume_location: "",
    jobs_visited: "",
    available_courses: "",
  });

  useEffect(() => {
    (async () => {
      const response = await AuthService.getProfile();
      let modified_preferred_jobs = [];
      response.data.attributes.preferred_jobs.map((job) => {
        modified_preferred_jobs.push({
          preferred_job: job,
          action: {
            type: "internal",
            route: "/pages/profile/profile-overview",
            color: "info",
            label: "Edit",
          },
        });
      });

      let modified_preferred_locations = [];
      response.data.attributes.preferred_locations.map((location) => {
        modified_preferred_locations.push({
          preferred_location: location,
          action: {
            type: "internal",
            route: "/pages/profile/profile-overview",
            color: "info",
            label: "Edit",
          },
        });
      });

      let modified_education = [];
      response.data.attributes.education.map((education) => {
        modified_education.push({
          education_new: education,
          action: {
            type: "internal",
            route: "/pages/profile/profile-overview",
            color: "info",
            label: "Edit",
          },
        });
      });

      console.log("experience", response.data.attributes.experience);
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
        preferred_jobs: modified_preferred_jobs,
        preferred_locations: modified_preferred_locations,
        education: modified_education,
        experience: response.data.attributes.experience,
        location_name: response.data.attributes.location_name,
        resume_location: response.data.attributes.resume_location,
        jobs_visited: response.data.attributes.jobs_visited,
        available_courses: response.data.attributes.available_courses,
      }));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!user.id || user.id === "") return;
      const response = await CrudService.getVisitedJobs(user.id);
      console.log("Visited Jobs", response);
      setVisitedJobs(response);
    })();
  }, [user.id]);


  const clickExploreHandler = (e, id) => {
    navigate(`/jobs-dashboard/visited-job/${id}`)
  }

  const dataTableData = {
    columns: [
      // add the company logo
      {
        Header: "",
        accessor: "job.logo_photo_url",
        width: "15%",
        disableSortBy: true,
        Cell: ({ cell: { value } }) => {
          return (
            <MDAvatar src={value} alt="profile-image" size="sm" shadow="sm" />
          )
        }
      },
      // { Header: "ID", accessor: "_id", width: "25%" },

      {
        Header: "Company",
        accessor: "job.company",
        width: "25%",
      },
      {
        Header: "job title",
        accessor: "job.title",
        width: "25%",
      },
      {
        Header: "Skill Match Score",
        accessor: "skill_match_score",
        width: "25%",
        Cell: ({ cell: { value } }) => {
          return (
            <MDTypography variant="button" color="text">
              {/* cast the value to integer, round it off to two decimal places and add a percent sign at the end */}
              {parseInt(value).toFixed(2)} %

            </MDTypography>
          );
        }
      },
      {
        Header: "Explore Job",
        disableSortBy: true,
        accessor: "",
        Cell: (info) => {
          return (
            <Tooltip title="Delete Category" >
              <Icon onClick={(e) => clickExploreHandler(e, info.cell.row.original._id)}>
                explore
              </Icon>
            </Tooltip>
          )
        }
      },
    ],
    rows: visitedJobs,
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header user={user}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
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
              <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
            </Grid>
          </Grid>
        </MDBox>

        {/* Show the jobs visited by the user */}
        {
          visitedJobs.length > 0 && (
            <MDBox pt={2} px={2} lineHeight={1.25}>
              <MDTypography variant="h6" fontWeight="medium">
                Visited jobs
              </MDTypography>
              <MDBox mb={1}>
                <DataTable table={dataTableData} />
              </MDBox>
            </MDBox>
          )
        }
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
