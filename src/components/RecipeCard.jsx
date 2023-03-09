import React from "react";
import { Card, CardHeader, CardMedia, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RecipeCard = (props) => {
  const { title, image, id } = props;
  const navigate = useNavigate();
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card
        sx={{ maxWidth: 345 }}
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/recipe/${id}`)}
      >
        <CardHeader title={title} />
        <CardMedia component="img" height="194" image={image} alt={title} />
      </Card>
    </Grid>
  );
};
export default RecipeCard;
