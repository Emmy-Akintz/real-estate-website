import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import LandingPage from "pages/LandingPage";
import LogIn from "./modals/LogIn";
import CreateAccount from "./modals/CreateAccount";
import AboutUs from "pages/AboutUs";
import Listing from "pages/Listing";
import ListingMapView from "pages/ListingMapView";
import PropertyDetails from "pages/PropertyDetails";
import AgentList from "pages/AgentList";
import AgentProfile from "pages/AgentProfile";
import ContactPage from "pages/ContactPage";
import BlogPage from "pages/BlogPage";
import BlogDetails from "pages/BlogDetails";
import Error from "pages/Error";
import FAQ from "pages/FAQ";
import PrivacyPolicy from "pages/PrivacyPolicy";
import License from "pages/License";
import EnterOTP from "modals/EnterOTP";
import ResetPassword from "modals/ResetPassword";

const ProjectRoutes = () => {
  return useRoutes([
      { path: "dhiwise-dashboard", element: <Home /> },
      { path: "*", element: <NotFound /> },
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LogIn isOpen={true} />,
      },
      {
        path: "/create-account",
        element: <CreateAccount isOpen={true} />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword isOpen={true} />,
      },
      {
        path: "/enter-otp",
        element: <EnterOTP isOpen={true} />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "listing",
        element: <Listing />,
      },
      {
        path: "listingmapview",
        element: <ListingMapView />,
      },
      {
        path: "propertydetails",
        element: <PropertyDetails />,
      },
      {
        path: "agentlist",
        element: <AgentList />,
      },
      {
        path: "agentprofile",
        element: <AgentProfile />,
      },
      {
        path: "contactpage",
        element: <ContactPage />,
      },
      {
        path: "blogpage",
        element: <BlogPage />,
      },
      {
        path: "blogdetails",
        element: <BlogDetails />,
      },
      {
        path: "error",
        element: <Error />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "privacypolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "license",
        element: <License />,
      },
    ]);
};

export default ProjectRoutes;
