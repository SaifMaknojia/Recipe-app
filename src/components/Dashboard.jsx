import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import RecipeCard from "./RecipeCard";
import BasicPagination from "./BasicPagination";
import { Grid, Snackbar, Chip, Divider, Skeleton } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { customAxios } from "./../utils/axiosConfig";

const Dashboard = (props) => {
  const [recipeList, setRecipeList] = useState([]);
  const [filterValues, setFilterValues] = useState({ query: "", cuisine: "" });
  const [activePage, setActivePage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [searchTriggered, setSearchTriggered] = useState(true);
  const [recipeListLoading, setRecipeListLoading] = useState(true);

  useEffect(() => {
    if (searchTriggered) {
      const offset = (activePage - 1) * 5;
      let endpointURL = `https://api.spoonacular.com/recipes/complexSearch?offset=${offset}&number=5`;
      if (filterValues.query)
        endpointURL = `${endpointURL}&query=${encodeURIComponent(
          filterValues.query
        )}`;
      if (filterValues.cuisine)
        endpointURL = `${endpointURL}&cuisine=${encodeURIComponent(
          filterValues.cuisine
        )}`;

      customAxios
        .get(endpointURL)
        .then((response) => {
          if (response.data) {
            setRecipeList(response.data.results);
            setTotalResults(response.data.totalResults);
            setRecipeListLoading(false);
            setNotification({
              open: true,
              severity: "success",
              message: "Successfully fetched recipe list.",
            });
          } else {
            console.log("Couldn't fetch recipe list ", response);
            setNotification({
              open: true,
              severity: "error",
              message: "Failed to fetch recipe list. Please try again.",
            });
          }
          setSearchTriggered(false);
        })
        .catch((error) => {
          console.log("Couldn't fetch recipe list ", error);
          setNotification({
            open: true,
            severity: "error",
            message: "Failed to fetch recipe list. Please try again.",
          });
          setSearchTriggered(false);
        });
    }
  }, [activePage, searchTriggered]);

  const handleFilterChange = (key, value) => {
    setFilterValues((prevValues) => {
      return {
        ...prevValues,
        [key]: value,
      };
    });
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") return;
    setNotification({
      open: false,
      message: "",
      severity: "success",
    });
  };

  const reset = (page = 1) => {
    setActivePage(page);
    setSearchTriggered(true);
    setRecipeListLoading(true);
  };

  return (
    <Grid
      container
      spacing={2}
      style={{ height: "100%", width: "100%", padding: "20px" }}
    >
      <Grid item xs={12}>
        <Divider>
          <Chip label="Filters" />
        </Divider>
      </Grid>
      <Filters
        filterValues={filterValues}
        handleFilterChange={handleFilterChange}
        handleSearchClick={() => reset()}
        handleResetClick={() => {
          setFilterValues({ query: "", cuisine: "" });
          reset();
        }}
      />
      <Grid item xs={12}>
        <Divider>
          <Chip label="Results" />
        </Divider>
      </Grid>
      <BasicPagination
        totalRecords={totalResults}
        handlePageChange={(event, value) => reset(value)}
        activePage={activePage}
      />
      {recipeListLoading
        ? [0, 1, 2, 3, 4].map((el) => {
            return (
              <Grid item xs={4} key={el}>
                <Skeleton variant="rectangular" width={250} height={180} />
              </Grid>
            );
          })
        : recipeList.map((recipe) => {
            return <RecipeCard key={recipe.id} {...recipe} />;
          })}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleNotificationClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default Dashboard;
