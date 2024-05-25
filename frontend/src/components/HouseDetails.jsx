import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useContext, useState } from "react";

import { HouseContext } from "../context/HouseContext";
import { AuthContext } from "../context/AuthContext";

import {useNavigate} from 'react-router-dom'

export const HouseDetails = ({ house }) => {
  const { dispatch } = useContext(HouseContext);
  const { user } = useContext(AuthContext);


  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(house.likes);

  const [viewDetails, setViewDetails] = useState(false);
  const [seller, setSeller] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLike = async (e) => {
    e.preventDefault();

    const updated = likes+1
    const response = await fetch(`${apiUrl}/api/houses/` + house._id,{
      method: 'PATCH',
      body: JSON.stringify({likes:updated}),
      headers: {
        "Content-Type":"application/json"
      }
    })
    const json = await response.json()
    
    if(!response.ok){
      setError(json.error)
    }
    
    if(response.ok){
      console.log('likes updated')
      dispatch({type:'SET_HOUSE', payload:json})
      setLiked(!liked);
      setLikes(likes+1)
    }
  };

  const handleDislike = async (e) => {
    e.preventDefault();

    const updated = likes-1
    const response = await fetch(`${apiUrl}/api/houses/` + house._id,{
      method: 'PATCH',
      body: JSON.stringify({likes:updated}),
      headers: {
        "Content-Type":"application/json"
      }
    })
    const json = await response.json()
    
    if(!response.ok){
      setError(json.error)
    }
    
    if(response.ok){
      console.log('likes updated')
      dispatch({type:'SET_HOUSE', payload:json})
      setLiked(!liked);
      setLikes(likes-1)
    }
  };

  const navigate = useNavigate()

  const handleUpdate = () => {
    navigate('/update',{state:{house}})
  }

  const handleDelete = async () => {
    const response = await fetch(
      `${apiUrl}/api/houses/` + house._id,
      {
        method: "DELETE",
        headers: {
          userid: user._id,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_HOUSE", payload: json });
    }
  };

  const handleClick = async () => {
    const response = await fetch(`${apiUrl}/api/user`, {
      headers: {
        houseid: house._id,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      alert(json.error);
    }

    if (response.ok) {
      setSeller(json);
    }
    setViewDetails(!viewDetails);
  };

  const handleInterest = () => {
    alert('Your email to the seller is ready!')
    const email = seller.email;
    const subject = encodeURIComponent("Interested in this house");
    const body = encodeURIComponent(
      `Hello,\n\nI am interested in the house located at ${house.place}.\n\nBest regards,\n${user.phone}\n${user.email}\n`
    );
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    console.log("mailto link: ", mailtoLink); // Debug log
    window.location.href = mailtoLink;
  };

  if (!viewDetails) {
    return (
      <Card
        sx={{
          minWidth: 320,
          maxWidth: 380,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardActionArea onClick={user.userType==='Buyer' ? handleClick : undefined}>
          <CardMedia
            component="img"
            height="150"
            image="https://static.vecteezy.com/system/resources/thumbnails/023/308/053/small/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg"
            alt="house-img"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              fontWeight={600}
              fontFamily={"Poppins"}
            >
              Location: {house.place}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              color="text.primary"
              fontWeight={600}
              fontFamily={"Poppins"}
            >
              Area: {house.area} sq.ft
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontFamily={"Poppins"}
            >
              Bedrooms: {house.noOfBedrooms}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              color="text.secondary"
              fontFamily={"Poppins"}
            >
              Bathrooms: {house.noOfBathrooms}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontFamily={"Poppins"}
            >
              Nearby facilties: {house.nearby}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          &#x2764; {likes}
          {user.userType === "Buyer" ? (
            <>
              {liked ? (
                <Button size="small" sx={{ color: "red" }} onClick={handleDislike}>
                  UNLIKE
                </Button>
              ) : (
                <Button size="small" color="primary" onClick={handleLike}>
                  LIKE
                </Button>
              )}
            </>
          ) : (
            <>
              <Button size="small" color="primary" onClick={handleUpdate}>
                UPDATE
              </Button>
            </>
          )}

          {user.userType === "Seller" && (
            <Button size="small" color="error" onClick={handleDelete}>
              DELETE
            </Button>
          )}
          {user.userType === "Buyer" && (
            <Button size="small" color="primary" onClick={handleClick}>
              VIEW DETAILS
            </Button>
          )}
        </CardActions>
      </Card>
    );
  } else {
    return (
      <Card
        sx={{
          minWidth: 320,
          maxWidth: 380,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardActionArea>
          {/* User details  */}
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              fontWeight={600}
              fontFamily={"Poppins"}
            >
              Seller Info:
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              fontWeight={600}
              fontFamily={"Poppins"}
            >
              Location: {house.place}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="text.secondary"
              fontWeight={600}
              fontFamily={"Poppins"}
            >
              Name: {seller.firstName} {seller.lastName}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="text.secondary"
              fontWeight={600}
              fontFamily={"Poppins"}
            >
              Phone: {seller.phone}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={600}
              fontFamily={"Poppins"}
            >
              Email: {seller.email}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <Button size="small" color="primary" onClick={handleInterest}>
            I'm Interested
          </Button>
          <Button size="small" color="error" onClick={handleClick}>
            BACK
          </Button>
        </CardActions>
      </Card>
    );
  }
};
