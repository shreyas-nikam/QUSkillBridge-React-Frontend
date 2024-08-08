import HttpService from "./http.service";
import axios from "axios";

const fastapiUrl = "http://localhost:8000";

class CrudService {
  // users requests
  imageUpload = async (formData, id) => {
    const imageUpdate = `uploads/users/${id}/profile-image`;
    return await HttpService.post(imageUpdate, formData);
  };

  getUsers = async () => {
    const usersEndpoint = "users?include=roles";
    return await HttpService.get(usersEndpoint);
  };

  deleteUser = async (id) => {
    const endpoint = `users/${id}`;
    return await HttpService.delete(endpoint);
  };

  createUser = async (payload) => {
    const endpoint = "users";
    return await HttpService.post(endpoint, payload);
  };

  getUser = async (id) => {
    const endpoint = `users/${id}?include=roles`;
    return await HttpService.get(endpoint);
  };

  getUserWithPermissions = async (id) => {
    const endpoint = `users/${id}?include=roles,roles.permissions`;
    return await HttpService.get(endpoint);
  };

  updateUser = async (payload, id) => {
    const endpoint = `users/${id}`;
    return await HttpService.patch(endpoint, payload);
  };

  // roles requests
  getRoles = async () => {
    const rolesEndpoint = "roles";
    return await HttpService.get(rolesEndpoint);
  };

  deleteRole = async (id) => {
    const endpoint = `roles/${id}`;
    return await HttpService.delete(endpoint);
  };

  createRole = async (payload) => {
    const endpoint = "roles";
    return await HttpService.post(endpoint, payload);
  };

  updateRole = async (payload, id) => {
    const endpoint = `roles/${id}`;
    return await HttpService.patch(endpoint, payload);
  };

  getRole = async (id) => {
    const endpoint = `roles/${id}`;
    return await HttpService.get(endpoint);
  };

  // categories requests
  getCategories = async () => {
    const categoriesEndpoint = "categories";
    return await HttpService.get(categoriesEndpoint);
  };

  deleteCategory = async (id) => {
    const endpoint = `categories/${id}`;
    return await HttpService.delete(endpoint);
  };

  createCategory = async (payload) => {
    const endpoint = "categories";
    return await HttpService.post(endpoint, payload);
  };

  getCategory = async (id) => {
    const categoriesEndpoint = `categories/${id}`;
    return await HttpService.get(categoriesEndpoint);
  };

  updateCategory = async (payload, id) => {
    const categoriesEndpoint = `categories/${id}`;
    return await HttpService.patch(categoriesEndpoint, payload);
  };

  // tag requests
  getTags = async () => {
    const tagsEndpoint = "tags";
    return await HttpService.get(tagsEndpoint);
  };

  deleteTag = async (id) => {
    const endpoint = `tags/${id}`;
    return await HttpService.delete(endpoint);
  };

  createTag = async (payload) => {
    const endpoint = "tags";
    return await HttpService.post(endpoint, payload);
  };

  getTag = async (id) => {
    const endpoint = `tags/${id}`;
    return await HttpService.get(endpoint);
  };

  updateTag = async (payload, id) => {
    const endpoint = `tags/${id}`;
    return await HttpService.patch(endpoint, payload);
  };

  // item requests
  getItems = async () => {
    const tagsEndpoint = "items";
    return await HttpService.get(tagsEndpoint);
  };

  deleteItem = async (id) => {
    const endpoint = `items/${id}`;
    return await HttpService.delete(endpoint);
  };

  getCategoryOfItem = async (id) => {
    const endpoint = `items/${id}/category`;
    return await HttpService.get(endpoint);
  };

  getTagsOfItem = async (id) => {
    const endpoint = `items/${id}/tags`;
    return await HttpService.get(endpoint);
  };

  createItem = async (payload) => {
    const endpoint = "items";
    return await HttpService.post(endpoint, payload);
  };

  itemImageUpload = async (formData, id) => {
    const imageUpdate = `uploads/items/${id}/image`;
    return await HttpService.post(imageUpdate, formData);
  };

  getItem = async (id) => {
    const endpoint = `items/${id}?include=category,tags`
    return await HttpService.get(endpoint);
  }

  updateItem = async (payload, id) => {
    const endpoint = `items/${id}`;
    return await HttpService.patch(endpoint, payload);
  };

  // persona requests
  getPersonas = async () => {
    const endpoint = "personas";
    return await HttpService.get(endpoint);
  };

  deletePersona = async (id) => {
    const endpoint = `personas/${id}`;
    return await HttpService.delete(endpoint);
  };

  createPersona = async (payload) => {
    const endpoint = "personas";
    return await HttpService.post(endpoint, payload);
  };

  getPersona = async (id) => {
    const endpoint = `personas/${id}`;
    return await HttpService.get(endpoint);
  };

  updatePersona = async (payload, id) => {
    const endpoint = `personas/${id}`;
    return await HttpService.patch(endpoint, payload);
  };

  // jobs requests
  getJobsByPersona = async (id) => {
    const endpoint = `jobs/personaJobs/${id}`;
    return await HttpService.get(endpoint);
  }

  getJobDataById = async (id) => {
    const endpoint = `jobs/${id}`;
    return await HttpService.get(endpoint);
  }

  getVisitedJobs = async (id) => {
    const endpoint = `jobs/visitedJobs/${id}`;
    console.log("Id passed", id);
    return await HttpService.get(endpoint);
  }

  addJobToVisitedJobs = async (payload) => {
    const endpoint = `jobs/addJobToVisitedJobs/`;
    const response = await HttpService.post(endpoint, payload);
    return response;
  }

  getVisitedJobById = async (id) => {
    const endpoint = `jobs/visitedJob/${id}`;
    return await HttpService.get(endpoint);
  }

  // courses requests
  getCourses = async () => {
    const endpoint = `courses`;
    return await HttpService.get(endpoint);
  }

  getCourse = async (id) => {
    const endpoint = `courses/${id}`;
    return await HttpService.get(endpoint);
  }

  getAvailableCourses = async (id) => {
    const endpoint = `courses/availableCourses/${id}`;
    return await HttpService.get(endpoint);
  }

  // update profile
  updateProfile = async (payload) => {
    const endpoint = `${fastapiUrl}/get_profile_suggestions/`;
    response = await axios.post(endpoint, payload);
    return response.data;
  }

  generateCourseOutline = async (payload) => {
    const endpoint = `${fastapiUrl}/generate_course_outline/`;
    const response = await axios.post(endpoint, payload);
    return response.data;
  }

  generateCoverLetter = async (payload) => {
    const endpoint = `${fastapiUrl}/generate_cover_letter/`;
    const response = await axios.post(endpoint, payload);
    return response.data;
  }

  generateSkillMatchScore = async (payload) => {
    const endpoint = `${fastapiUrl}/generate_skill_match_score/`;
    const response = await axios.post(endpoint, payload);
    return response.data;
  }


}

export default new CrudService();
