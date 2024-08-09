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

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import ChatBot from "components/ChatBot";

// Settings page components
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import Sidenav from "layouts/pages/course-content/components/Sidenav";
import CourseHome from "layouts/pages/course-content/components/CourseHome";
import CourseSlides from "layouts/pages/course-content/components/CourseSlides";
import CourseVideos from "layouts/pages/course-content/components/CourseVideos";
import QuCoPilot from "layouts/pages/course-content/components/QuCoPilot";
import Assessment from "layouts/pages/course-content/components/Assessment";

// context
import { useMaterialUIController, setOpenChatBot } from "context";

function CourseContent() {
  const [activeStep, setActiveStep] = useState(0);
  const [content, setActiveContent] = useState(<CourseHome />);
  const [controller, dispatch] = useMaterialUIController();
  const {
    openChatBot,
  } = controller;

  // get the course id from the url
  const location = useLocation();
  const courseId = location.pathname.split("/").pop();

  // Change the openChatBot state
  const handleChatBotOpen = () => setOpenChatBot(dispatch, !openChatBot);

  function getSteps() {
    return [
      "Course Home",
      "Course Slides",
      "Course Videos",
      "QuCoPilot",
      "Assessment",
    ];
  }

  const chatBotButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleChatBotOpen}
    >
      <Icon fontSize="small" color="inherit">
        chat
      </Icon>
    </MDBox>
  );

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        setActiveContent(<CourseHome />);
        break;
      case 1:
        setActiveContent(<CourseSlides />);
        break;
      case 2:
        setActiveContent(<CourseVideos />);
        break;
      case 3:
        setActiveContent(<QuCoPilot />);
        break;
      case 4:
        setActiveContent(<Assessment />);
        break;
    }
  }

  const steps = getSteps();
  return (
    <BaseLayout>
      <ChatBot courseId={courseId} />
      {chatBotButton}
      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Sidenav clickHandler={getStepContent} />
          </Grid>
          <Grid item xs={12} lg={9}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {content}
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </BaseLayout>
  );
}

export default CourseContent;
