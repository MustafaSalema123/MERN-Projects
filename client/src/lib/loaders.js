import apiRequest from "./apiRequest"
import { defer } from "react-router-dom";

export const singlePostLoader = async ({ request, params }) => 
{
    const res = await apiRequest("/posts/" + params.id);

    return res.data;
}

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1]; //list?
    const postPromise = await apiRequest("/posts?" + query);
    return postPromise.data; 
    return defer({
      postResponse: postPromise,
    });
  };

  export const profilePageLoader = async () => {
    const postPromise = apiRequest("/users/profilePosts");
   // console.log(postPromise);
   // return postPromise.data; 
    const chatPromise = apiRequest("/chats");
    return defer({
      postResponse: postPromise,
      chatResponse: chatPromise,
    });
  };