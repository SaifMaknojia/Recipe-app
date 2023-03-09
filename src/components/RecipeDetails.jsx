import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Snackbar,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Grid,
  Button,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { customAxios } from "./../utils/axiosConfig";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const RecipeDetails = (props) => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [recipeDetails, setRecipeDetails] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [expanded, setExpanded] = useState(false);
  const [recipeDetailsLoading, setRecipeDetailsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      customAxios
        .get(`https://api.spoonacular.com/recipes/${id}/information`)
        .then((response) => {
          if (response.data) {
            setRecipeDetails(response.data);
            setRecipeDetailsLoading(false);
            setNotification({
              open: true,
              severity: "success",
              message: "Successfully fetched recipe details.",
            });
          } else {
            console.log("Couldn't fetch recipe details ", response);
            setNotification({
              open: true,
              severity: "error",
              message: "Failed to fetch recipe details. Please try again.",
            });
          }
        })
        .catch((error) => {
          console.log("Couldn't fetch recipe details ", error);
          setNotification({
            open: true,
            severity: "error",
            message: "Failed to fetch recipe details. Please try again.",
          });
        });
    }
  }, [id]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") return;
    setNotification({
      open: false,
      message: "",
      severity: "success",
    });
  };

  const returnYesNo = (flag) => {
    return flag ? "Yes" : "No";
  };

  return (
    <>
      {recipeDetailsLoading ? (
        [0, 1, 2, 3, 4].map((el) => {
          return (
            <Grid item xs={12} key={el} style={{ padding: "10px" }}>
              <Skeleton variant="rectangular" width={"100%"} height={"10vh"} />
            </Grid>
          );
        })
      ) : (
        <>
          <h1>{`Details For ${recipeDetails?.title}`}</h1>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Recipe Name
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {recipeDetails.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <img
                src={recipeDetails?.image}
                alt="recipe-details"
                style={{ width: "400px" }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Health Information
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {`Health Score: ${recipeDetails.healthScore}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Characteristics</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Yes/No</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Dairy Free</TableCell>
                      <TableCell>
                        {returnYesNo(recipeDetails.dairyFree)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gluten Free</TableCell>
                      <TableCell>
                        {returnYesNo(recipeDetails.glutenFree)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ketogenic</TableCell>
                      <TableCell>
                        {returnYesNo(recipeDetails.ketogenic)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Low FODMAP</TableCell>
                      <TableCell>
                        {returnYesNo(recipeDetails.lowFodmap)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Vegan</TableCell>
                      <TableCell>{returnYesNo(recipeDetails.vegan)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Vegetarian</TableCell>
                      <TableCell>
                        {returnYesNo(recipeDetails.vegetarian)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Ingredients
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Name and measure
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Name</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Measure</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recipeDetails.extendedIngredients.map((ing) => {
                      return (
                        <TableRow key={ing?.id}>
                          <TableCell>{ing?.name}</TableCell>
                          <TableCell>{`${ing?.measures?.us?.amount} ${ing?.measures?.us?.unitLong}`}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Cooking Instructions
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{recipeDetails?.instructions}</Typography>
            </AccordionDetails>
          </Accordion>
        </>
      )}
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() => navigate(`/`)}
          style={{ marginTop: "10px" }}
        >
          Back To Dashboard
        </Button>
      </Grid>
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
    </>
  );
};

export default RecipeDetails;
