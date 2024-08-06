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
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";


import CrudService from "services/cruds-service";

import { useMaterialUIController } from "context";
import MDButton from "components/MDButton";
import skill_delta_teaser_image from "assets/images/skill-delta-teaser.jpg";
import cover_letter_teaser_image from "assets/images/cover-letter-teaser.jpg";

function VisitedJob() {

    const { job_id } = useParams();


    const [job, setJob] = useState({
        _id: job_id,
        job: null,
        skills_in_profile: [],
        skills_in_job: [],
        skill_delta: [],
        skill_match_score: 0,
        cover_letter: "",
        course_outline: "",
    });


    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const { setIsAuthenticated, getCurrentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [skillMatchScoreLoader, setSkillMatchScoreLoader] = useState(false);
    const [coverLetterLoader, setCoverLetterLoader] = useState(false);
    const [donutData, setDonutData] = useState({
        labels: ["Skills In Profile", "Skills To Be Learned"],
        datasets: {
            label: "Skill Count",
            backgroundColors: ["info", "error"],
            data: [80, 20],
        },
    });


    useEffect(() => {
        async function checkToken() {
            let user_id = await getCurrentUser();
            if (!user_id) {
                setIsAuthenticated(false);
                localStorage.removeItem("token");
            }
            return user_id;
        }
        checkToken().then((userId) => setUser(userId));
    }, []);

    // function to get a particular job
    useEffect(() => {
        async function fetchJobData() {
            let response = await CrudService.getVisitedJobById(job_id);
            return response;
        }
        fetchJobData().then((response) => {
            setJob(response)
            return response
        })
            .then((response) => {
                setDonutData({
                    labels: ["Skills In Profile", "Skills To Be Learned"],
                    datasets: {
                        label: "Skill Count",
                        backgroundColors: ["info", "error"],
                        data: [response.skills_in_job.length - response.skill_delta.length, response.skill_delta.length],
                    },
                });
            }
            );
    }
        , []);


    const generateSkillMatchScore = async () => {
        setSkillMatchScoreLoader(true);
        // call the backend to get the skill delta
        const response = await CrudService.generateSkillMatchScore({
            "job_id": job._id,
            "profile_id": user
        });
        console.log("response data for skill match score", response);
        setSkillMatchScoreLoader(false);
        setJob({
            ...job,
            skill_match_score: response.match_score,
            skills_in_job: response.job_description_required_skills,
            skill_delta: response.skills_to_be_learned,
            skills_in_profile: response.profile_skills
        });
        setDonutData({
            labels: ["Skills In Profile", "Skills To Be Learned"],
            datasets: {
                label: "Skill Count",
                backgroundColors: ["info", "error"],
                data: [response.skills_in_job.length - response.skill_delta.length, skill_delta.length],
            },
        });
    }


    const generateCoverLetter = async () => {
        // call the backend to get the cover letter
        setCoverLetterLoader(true);
        const response = await CrudService.generateCoverLetter({
            "job_id": job._id,
            "profile_id": user
        });
        setCoverLetterLoader(false);
        console.log("response data for cover letter", response);
        setJob({
            ...job, cover_letter: response
        });
    }



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


    // function to get a particular job description
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
                                        job.job && job.job.logo_photo_url !== null && job.job.logo_photo_url != "" ? (
                                            <MDAvatar src={job.job.logo_photo_url} alt="profile-image" size="xl" shadow="sm" />
                                        ) : null
                                    }
                                </Grid>
                                <Grid item xs={12} md={8} lg={8}>
                                    <MDTypography variant="h3" fontWeight="medium" mt={1}>
                                        {job.job && job.job.title ? job.job.title : ""}
                                    </MDTypography>
                                    <MDTypography variant="h5" fontWeight="medium" mt={1}>
                                        {job.job && job.job.company ? job.job.company : ""}
                                    </MDTypography>

                                </Grid>

                            </Grid>

                            <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                {"Job Description"}
                            </MDTypography>
                            {job.job && job.job.description}

                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <MDBox
                            key="skill_match_score_block"
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
                            {skillMatchScoreLoader ? (
                                <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                    {"Calculating Skill Match Score..."}
                                </MDTypography>
                            ) : (
                                <>
                                    {job.skills_in_profile.length > 0 && job.skills_in_job.length > 0 ? (
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                                    {"Skills in Job Description"}
                                                </MDTypography>
                                                <MDBox>
                                                    {job.skills_in_job.map((skill, index) => {
                                                        return (
                                                            <MDTypography key={index} variant="p1">
                                                                <Icon key={index} color="primary">circle</Icon>
                                                                {skill} <br />
                                                            </MDTypography>
                                                        );
                                                    })}
                                                </MDBox>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                                    {"Skills in Profile"}
                                                </MDTypography>
                                                <MDBox>

                                                    {job.skills_in_profile.map((skill, index) => {
                                                        return (
                                                            <MDTypography key={index} variant="p1">
                                                                <Icon key={index} color="primary">done</Icon>
                                                                {skill} <br />
                                                            </MDTypography>
                                                        );
                                                    })}
                                                </MDBox>
                                            </Grid>
                                            {
                                                job.skill_delta.length > 0 ? (
                                                    <Grid item xs={12}>
                                                        <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                                            {"Skills to be Learned"}
                                                        </MDTypography>
                                                        <MDBox>
                                                            {job.skill_delta.map((skill, index) => {
                                                                return (
                                                                    <MDTypography key={index} variant="p1">
                                                                        <Icon key={index} color="primary">remove</Icon>
                                                                        {skill} <br />
                                                                    </MDTypography>
                                                                );
                                                            })}
                                                        </MDBox>
                                                    </Grid>
                                                ) : null
                                            }
                                            {
                                                <Grid item xs={12}>
                                                    <DefaultDoughnutChart
                                                        title="Skill Match Score"
                                                        description={job.skill_match_score.toFixed(2) + "%"}
                                                        chart={donutData}
                                                    />
                                                </Grid>

                                            }
                                        </Grid>
                                    ) :
                                        <>
                                            {/* Show teaser image and button to generate skill match score */}
                                            <MDBox>
                                                <img src={skill_delta_teaser_image} alt="skill-delta-teaser" />
                                            </MDBox>
                                            <MDButton variant="contained" color="secondary" onClick={generateSkillMatchScore}>
                                                Generate Skill Match Score
                                            </MDButton>
                                        </>
                                    }
                                </>
                            )}
                        </MDBox>
                    </Grid>
                    <Grid item>
                        <MDBox
                            key="cover_letter_block"
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
                            {coverLetterLoader ? (
                                <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                    {"Generating Cover Letter..."}
                                </MDTypography>
                            ) : (
                                <>
                                    {job.cover_letter ? (
                                        <>
                                            <MDTypography variant="h6" fontWeight="medium" mt={1}>
                                                {"Cover Letter"}
                                            </MDTypography>
                                            <MDBox>
                                                {job.cover_letter}
                                            </MDBox>
                                        </>
                                    ) :
                                        <>

                                            {/* Show teaser image and button to generate cover letter */}
                                            <MDBox>
                                                <img src={cover_letter_teaser_image} alt="cover-letter-teaser" />
                                            </MDBox>

                                            <MDButton variant="contained" color="secondary" onClick={generateCoverLetter}>
                                                Generate Cover Letter
                                            </MDButton>

                                        </>

                                    }
                                </>
                            )}
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout >
    );
}

export default VisitedJob;