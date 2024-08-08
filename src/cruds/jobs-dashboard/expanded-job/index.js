/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.nikam-shreyas.com

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
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


import CrudService from "services/cruds-service";

import { useMaterialUIController } from "context";
import MDButton from "components/MDButton";


function ExpandedJob() {

    const { job_id } = useParams();
    const navigate = useNavigate();

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
            return user_id
        }
        checkToken().then((userId) => setUser(userId));
    }, []);



    // function to get a particular job
    useEffect(() => {
        async function fetchJobData() {
            let response = await CrudService.getJobDataById(job_id);
            return response;
        }
        fetchJobData().then((response) => setJob(response));
    }, []);


    const exploreClickHandler = async () => {
        const result = confirm("Are you sure you want to unlock this job?", "Yes", "No");
        if (result) {
            const response = await CrudService.addJobToVisitedJobs({
                "job_id": job_id,
                "profile_id": user
            });
            navigate(`/jobs-dashboard/visited-job/${response._id}`);
        }
    }


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
                            key="job_description_block"
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
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={2} lg={2}>
                                    {
                                        job.logo_photo_url !== null && job.logo_photo_url != "" ? (
                                            <MDAvatar src={job.logo_photo_url} alt="profile-image" size="xl" shadow="sm" />
                                        ) : null
                                    }
                                </Grid>
                                <Grid item xs={12} md={8} lg={8}>
                                    <MDTypography variant="h3" fontWeight="medium" mt={1}>
                                        {job.title ? job.title : ""}
                                    </MDTypography>
                                    <MDTypography variant="h5" fontWeight="medium" mt={1}>
                                        {job.company ? job.company : ""}
                                    </MDTypography>

                                </Grid>
                                <Grid item xs={12} md={2} lg={2}>
                                    {
                                        job.job_url !== null && job.job_url != "" ? (
                                            <MDButton
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => window.open(job.job_url, "_blank")}
                                            >
                                                Apply
                                            </MDButton>
                                        ) : null
                                    }

                                </Grid>
                            </Grid>

                            <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                {"Job Description"}
                            </MDTypography>
                            {job.description}

                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        {/* Job Location */}
                        {
                            job.location !== null && job.location != "" ? (
                                <MDBox
                                    key="location_block"
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
                                    <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                        {"Location"}
                                    </MDTypography>
                                    {job.location}
                                </MDBox>
                            ) : null
                        }
                        {/* CEO Information */}
                        {job.ceo_name !== null && job.ceo_name != "" && job.ceo_photo_url !== null && job.ceo_photo_url != "" ? (
                            <MDBox
                                key="ceo_block"
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
                                <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                    {"CEO"}
                                </MDTypography>
                                <MDBox display="flex" flexDirection="column" alignItems="center">
                                    <MDBox mb={1}>
                                        <MDAvatar src={job.ceo_photo_url} alt="profile-image" size="xl" shadow="sm" />
                                    </MDBox>
                                    <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                        {job.ceo_name}
                                    </MDTypography>
                                </MDBox>
                            </MDBox>
                        ) : null}
                        {/* Company Address Information */}
                        {job.company_addresses !== null && job.company_addresses != "" ? (
                            <MDBox
                                key="company_address_block"
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
                                <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                    {"Company Address"}
                                </MDTypography>
                                {job.company_addresses}
                            </MDBox>
                        ) : null}
                        {/* Company Industry information */}
                        {
                            job.company_industry !== null && job.company_industry != "" ? (
                                <MDBox
                                    key="company_industry_block"
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
                                    <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                        {"Company Industry"}
                                    </MDTypography>
                                    {job.company_industry}
                                </MDBox>
                            ) : null
                        }
                        {/* Company Revenue Information */}
                        {
                            job.company_revenue !== null && job.company_revenue != "" ? (
                                <MDBox
                                    key="company_revenue_block"
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
                                    <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                        {"Company Revenue"}
                                    </MDTypography>
                                    {job.company_revenue}
                                </MDBox>
                            ) : null
                        }
                        {/* Number of employees information */}
                        {
                            job.company_num_employees !== null && job.company_num_employees != "" ? (
                                <MDBox
                                    key="company_num_employees_block"
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
                                    <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                        {"Number of Employees"}
                                    </MDTypography>
                                    {job.company_num_employees}
                                </MDBox>
                            ) : null
                        }
                        {/* Salary Information */}
                        {
                            job.min_amount !== null && job.max_amount !== null && job.currency !== null && job.min_amount != "" && job.max_amount != "" && job.currency != "" ? (
                                <MDBox
                                    key="salary_block"
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
                                    <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                        {"Salary"}
                                    </MDTypography>
                                    {job.min_amount + " - " + job.max_amount + " " + job.currency}
                                </MDBox>
                            ) : null

                        }
                        {/* Job Type Information */}
                        {
                            job.job_type !== null && job.job_type != "" ? (
                                <MDBox
                                    key="job_type_block"
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
                                    <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                        {"Job Type"}
                                    </MDTypography>
                                    {job.job_type}
                                </MDBox>
                            ) : null
                        }
                        {/* Job Remote Type Information */}
                        {
                            job.is_remote !== null && job.is_remote != "" ? (
                                <MDBox
                                    key="remote_block"
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
                                    <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                        {"Remote"}
                                    </MDTypography>
                                    {job.is_remote}
                                </MDBox>
                            ) : null
                        }
                        {/* Job Site Inforamtion */}
                        {
                            job.site !== null && job.site != "" ? (
                                <MDBox
                                    key="site_block"
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
                                    <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                        {"Site"}
                                    </MDTypography>
                                    {job.site}
                                </MDBox>
                            ) : null
                        }
                        {
                            job.company_description !== null && job.company_description != "" ? (
                                <MDBox
                                    key="company_description_block"
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
                                    <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                        {"Company Description"}
                                    </MDTypography>
                                    {job.company_description}
                                </MDBox>
                            ) : null
                        }
                        {
                            job.company_url !== null && job.company_url != "" ? (
                                <MDBox
                                    key="company_url_block"
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
                                    <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                        {"Company URL"}
                                    </MDTypography>
                                    {job.company_url}
                                </MDBox>
                            ) : null
                        }
                        {
                            job.company_url_direct !== null && job.company_url_direct != "" ? (
                                <MDBox
                                    key="company_url_direct_block"
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
                                    <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                        {"Company URL Direct"}
                                    </MDTypography>

                                    {job.company_url_direct}
                                </MDBox>
                            ) : null
                        }
                        {
                            job.emails !== null && job.emails != "" ? (
                                <MDBox
                                    key="emails_block"
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
                                    <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                        {"Emails"}
                                    </MDTypography>
                                    {job.emails}
                                </MDBox>
                            ) : null
                        }


                    </Grid>
                </Grid>

                <MDBox
                    key="job_unlock_block"
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
                    Do you want QUSkillBridge to help you prepare for this job?
                    <MDButton
                        variant="contained"
                        color="secondary"
                        onClick={exploreClickHandler}
                    >
                        Explore what we can do for you
                    </MDButton>
                </MDBox>
            </MDBox>
            <Footer />
        </DashboardLayout >
    );
}

export default ExpandedJob;