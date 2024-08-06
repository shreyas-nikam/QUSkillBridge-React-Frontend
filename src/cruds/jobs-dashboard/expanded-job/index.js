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
import { useContext, useEffect, useState, } from "react";
import { AuthContext } from "context";
import { useNavigate, useParams } from "react-router-dom";

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

import { useMaterialUIController } from "context";


function ExpandedJob() {

    const { job_id } = useParams();

    const [job, setJob] = useState({
        _id: job_id,
        recommended_courses: [],
        site: "",
        job_url: "",
        title: "",
        company: "",
        location: "",
        job_type: "",
        date_posted: "",
        interval: "",
        min_amount: "",
        max_amount: "",
        currency: "",
        is_remote: "",
        emails: "",
        description: "",
        company_url: "",
        company_url_direct: "",
        company_addresses: "",
        company_industry: "",
        company_num_employees: "",
        company_revenue: "",
        company_description: "",
        logo_photo_url: "",
        banner_photo_url: "",
        ceo_name: "",
        ceo_photo_url: "",
    });


    const { sales, tasks } = reportsLineChartData;

    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const { setIsAuthenticated, getCurrentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});


    useEffect(() => {
        async function checkToken() {
            let user_id = await getCurrentUser();
            if (!user_id) {
                setIsAuthenticated(false);
                localStorage.removeItem("token");
            }
        }
        checkToken().then((userId) => setUser(userId));
    }, []);



    // function to get a particular job
    useEffect(() => {
        async function fetchJobData() {
            let response = await CrudService.getJobDataById(job_id);
            console.log("response data for job", response);
        }
        fetchJobData().then((response) => setJob(response));
    }, []);

    // // function to get the jobs data for the particular user
    // useEffect(() => {
    //   async function checkToken() {
    //     let user_id = await getCurrentUser();
    //     if (!user_id) {
    //       setIsAuthenticated(false);
    //       localStorage.removeItem("token");
    //     }
    //     else {
    //       setUser(user_id);
    //       return user_id;
    //     }
    //   }
    //   async function fetchJobsData(userId) {
    //     let response = await CrudService.getJobsByPersona(userId);
    //     console.log("response data", response);
    //     setJobs(response);
    //   }
    //   checkToken().then((userId) => fetchJobsData(userId)).then(() => console.log("jobs", jobs));
    // }, []);


    // // function to get a particular course
    // useEffect(() => {
    //   async function fetchCourseData() {
    //     let response = await CrudService.getCourse("66a91f79a760e1475cb110a4");
    //     console.log("response data for course", response);
    //   }
    //   fetchCourseData();
    // }, []);


    // function to get a particular job
    // useEffect(() => {
    //   async function fetchJobData() {
    //     let response = await CrudService.getJobDataById("66a91f79a760e1475cb110b6");
    //     console.log("response data for job", response);
    //   }
    //   fetchJobData();
    // }, []);

    // function to get skill match score
    // useEffect(() => {
    //   async function fetchSkillMatchScore() {
    //     let response = await CrudService.generateSkillMatchScore({
    //       "job_id": "66a91f79a760e1475cb110b8",
    //       "profile_id": "66aa9eafd221d572880a58a1"
    //     });
    //     console.log("response data for skill match score", response);
    //   }
    //   fetchSkillMatchScore();
    // }, []);

    // function to get the course outline
    // useEffect(() => {
    //   // this function should be called when the skill match score is generated.
    //   // the job_id should be the one from the job that the user has already visited.
    //   async function fetchCourseOutline() {
    //     let response = await CrudService.generateCourseOutline({
    //       "job_id": "66b0dd0c5a072fd2ce4d045a",
    //       "profile_id": "66aa9eafd221d572880a58a1"
    //     });
    //     console.log("response data for course outline", response);
    //   }
    //   fetchCourseOutline();
    // }, []);

    // function to get the cover letter
    // useEffect(() => {
    //   // this function should be called when the skill match score is generated.
    //   // the job_id should be the one from the job that the user has already visited.
    //   async function fetchCoverLetter() {
    //     let response = await CrudService.generateCoverLetter({
    //       "job_id": "66b0dd0c5a072fd2ce4d045a",
    //       "profile_id": "66aa9eafd221d572880a58a1"
    //     });
    //     console.log("response data for cover letter", response);
    //   }
    //   fetchCoverLetter();
    // }, []);

    // function to get the available courses
    // useEffect(() => {
    //   async function fetchAvailableCourses() {
    //     let response = await CrudService.getAvailableCourses("66aa9eafd221d572880a58a1"); // user_id
    //     console.log("response data for available courses", response);
    //   }
    //   fetchAvailableCourses();
    // }, []);

    // function to get the visited jobs
    // useEffect(() => {
    //   async function fetchVisitedJobs() {
    //     let response = await CrudService.getVisitedJobs("66aa9eafd221d572880a58a1"); // user_id
    //     console.log("response data for visited jobs", response);
    //   }
    //   fetchVisitedJobs();
    // }, []);




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
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={8}>
                        <MDBox
                            key="Something"
                            display="block"
                            bgColor={darkMode ? "transparent" : "white"}
                            color="text"
                            borderRadius="xl"
                            mt={2.5}
                            py={1.875}
                            px={1.875}
                            lineHeight={1.5}
                            sx={{
                                border: ({ borders: { borderWidth }, palette: { white } }) =>
                                    darkMode ? `${borderWidth[1]} solid ${white.main}` : 0,
                                fontSize: ({ typography: { size } }) => size.md,
                            }}
                        >
                            <MDTypography variant="h3" fontWeight="medium" mt={1}>
                                {job.title}
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="medium" mt={1}>
                                {job.company}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                {job.location}
                            </MDTypography>

                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <MDBox mb={3}>
                            <MDBox
                                key="Something"
                                display="block"
                                bgColor={darkMode ? "transparent" : "white"}
                                color="text"
                                borderRadius="xl"
                                mt={2.5}
                                py={1.875}
                                px={1.875}
                                lineHeight={1.5}
                                sx={{
                                    border: ({ borders: { borderWidth }, palette: { white } }) =>
                                        darkMode ? `${borderWidth[1]} solid ${white.main}` : 0,
                                    fontSize: ({ typography: { size } }) => size.md,
                                }}
                            >

                            </MDBox>
                        </MDBox>
                    </Grid>

                </Grid>
                {/* <MDBox mt={6}>
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
                </MDBox> */}
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default ExpandedJob;