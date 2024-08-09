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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "context";

import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import BookingCard from "examples/Cards/BookingCard";

// Anaytics dashboard components
import SalesByCountry from "layouts/dashboards/analytics/components/SalesByCountry";

// Data
import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";

// Images
import booking1 from "assets/images/products/product-1-min.jpg";
import booking2 from "assets/images/products/product-2-min.jpg";
import booking3 from "assets/images/products/product-3-min.jpg";


import CrudService from "services/cruds-service";
import MDButton from "components/MDButton";
import { set } from "date-fns";


function Analytics() {
  const { sales, tasks } = reportsLineChartData;

  const { setIsAuthenticated, getCurrentUser } = useContext(AuthContext);
  // const [user, setUser] = useState({});


  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function checkToken() {
      let user_id = await getCurrentUser();
      if (!user_id) {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        return user_id;
      }
    }
    checkToken().then((user_id) => {
      setUser(user_id);
    });
  }, []);

  // function to get course modules
  useEffect(() => {
    async function getCourseModules(course_id) {
      const response = await CrudService.getCourseModules(course_id);
      console.log("Course Modules", response);

    }
    // returns a list of course modules
    getCourseModules("66a91f79a760e1475cb110a1");
  }, []);

  // function to get the course home page introduction
  useEffect(() => {
    async function getCourseHomePage(course_id) {
      const response = await CrudService.getCourseHomePage(course_id);
      console.log("Course Home Page", response);
    }
    // returns the course home page introduction markdown string
    getCourseHomePage("66a91f79a760e1475cb110a1");
  }, []);



  // Starter code for getting the video link for a module and setting it in the state to be used in the 
  // component as shown below (the code for the component is commented out as well in the react component below)
  const [videoLink, setVideoLink] = useState("");

  // function to get the course video link
  useEffect(() => {
    async function getVideoLink(course_id, module_num) {
      const response = await CrudService.getVideoLink(course_id, module_num);
      console.log("Video Link", response);
      return response;
    }
    // returns the video link
    getVideoLink("66a91f79a760e1475cb110a1", 0).then((response) => {
      setVideoLink(response);
    });
  }, []);


  // Starter code for getting the pdf slides for a module and setting it in the state to be used in the 
  // component as shown below (the code for the component is commented out as well in the react component below)
  const [pdfBlob, setPdfBlob] = useState("");

  // function to get the course slides
  useEffect(() => {
    async function getSlides(course_id, module_num) {
      const response = await CrudService.getSlides(course_id, module_num);
      // console.log("Slides", response);
      setPdfBlob(response);
    }
    // returns the course slides
    getSlides("66a91f79a760e1475cb110a1", 0);
  }, []);

  // this code is for creating the download button for the pdf slides if you don't want to render the slides.
  const downloadPdf = () => {
    // Create a link and set the URL using the base64 data
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${pdfBlob}`;
    link.download = 'downloaded_file.pdf'; // Set the default filename for the download

    // Append to the body, click, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // // Starter code for getting the quiz for a course
  // const [quiz, setQuiz] = useState({});

  // useEffect(() => {
  //   async function getQuiz(course_id){
  //     const response = await CrudService.getQuiz(course_id);
  //     console.log("Quiz", response);
  //     setQuiz(response);
  //   }
  //   // returns the quiz
  //   getQuiz("66a91f79a760e1475cb110a1");
  // }, []);

  // Starter code for getting the quiz certificate for a course
  // and displaying it in the component as shown below

  // You will first need to set the user id in the state to be used in the getQuizCertificate function
  const [user, setUser] = useState({});
  const [quizCertificate, setQuizCertificate] = useState("");


  useEffect(() => {
    async function checkToken() {
      let user_id = await getCurrentUser();
      if (!user_id) {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
      return user_id;
    }
    async function getQuizCertificate(course_id, user_id) {
      const response = await CrudService.getQuizCertificate(course_id, user_id);
      setQuizCertificate(`data:image/jpeg;base64,${response}`);
    }
    checkToken().then((user_id) => {
      setUser(user_id);
      getQuizCertificate("66a91f79a760e1475cb110a1", user_id);
    });
  }, []);



  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography variant="body1" color="info" lineHeight={1} sx={{ cursor: "pointer", mx: 3 }}>
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* Starter code to embed the video link */}
      {/* Embed the video link here */}
      Video
      {videoLink && (
        <Grid container>
          <Grid item xs={6}>
            <div dangerouslySetInnerHTML={{ __html: videoLink }} />
          </Grid>
        </Grid>
      )}

      {/* Starter code to display the pdf slides */}
      {/* Display the pdf */}
      Slides
      {pdfBlob && (
        <MDBox style={{ width: "50%", float: 'right' }}>
          <iframe
            // align right
            style={{ width: '100%', height: '500px' }}
            src={`data:application/pdf;base64,${pdfBlob}`}
            frameBorder="0"
          />
          <MDButton onClick={downloadPdf} style={{ margin: '20px' }}>
            Download PDF
          </MDButton>
        </MDBox>
      )}


      {/* Starter code to display the quiz certificate */}
      {/* Display the quiz certificate */}

      {quizCertificate && (
        <Grid container>
          <MDTypography>
            Quiz Certificate
          </MDTypography>
          <Grid item xs={6}>
            <img src={quizCertificate} alt="quiz certificate" height={500} />
          </Grid>
        </Grid>
      )}

      <MDBox py={3}>
        <Grid container>
          <SalesByCountry />
        </Grid>
        <MDBox mt={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Bookings"
                  count={281}
                  percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than lask week",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Today's Users"
                  count="2,300"
                  percentage={{
                    color: "success",
                    amount: "+3%",
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="store"
                  title="Revenue"
                  count="34k"
                  percentage={{
                    color: "success",
                    amount: "+1%",
                    label: "than yesterday",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title="Followers"
                  count="+91"
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking1}
                  title="Cozy 5 Stars Apartment"
                  description='The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.'
                  price="$899/night"
                  location="Barcelona, Spain"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking2}
                  title="Office Studio"
                  description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
                  price="$1.119/night"
                  location="London, UK"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking3}
                  title="Beautiful Castle"
                  description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.'
                  price="$459/night"
                  location="Milan, Italy"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Analytics;