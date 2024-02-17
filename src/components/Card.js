import { useState, useEffect } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea} from "@mui/material";
import { colorNameToCode } from "color-name-to-code";
import ShimmerUI from "./ShimmerUI";
import "../css/card.css";

const UserCard = () => {
  const [totalCard, setTotalCard] = useState("");
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    "https://swapi.dev/api/people"
  );
  const [prevPageUrl, setprevPageUrl] = useState("");
  const [nextPageUrl, setnextPageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetch(currentPage);
        if (!data) {
          throw new Error("Failed to fetch data");
        }
        const json = await data.json();
        setTotalCard(json?.results);
        setUserData(json?.results);
        setprevPageUrl(json?.previous);
        setnextPageUrl(json?.next);
        setLoading(false);
        console.log(json.results);
      } catch (error) {
        console.log("Error fetching data", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleSearch = (e) => {
    if (e.target.value.length > 0) {
      const searchItem = userData.filter((obj) =>
        obj.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUserData(searchItem);
    } else {
      setUserData(totalCard);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(nextPageUrl);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPageUrl);
  };

  return (
    <>
      {" "}
      <div className="search-container">
        <input
          type="text"
          placeholder="      Search by Name"
          onChange={handleSearch}
          style={{ width: "300px", height: "40px", borderRadius: "10px" }}
        />
      </div>
      {error && <p>{error}</p>}
      {loading ? (
        <ShimmerUI/>
      ) : (
        <div className="user-card-container">
          {userData.map((user, index) => (
            <div className="user-card" key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://picsum.photos/200/300?random=${Math.random()}`}
                    alt="green iguana"
                  />
                  <CardContent
                    style={{
                      backgroundColor:
                        user.hair_color.toLowerCase() === "n/a" ||
                        user.hair_color.toLowerCase() === "none"
                          ? "none"
                          : colorNameToCode(String(user.hair_color), {
                              format: "rgb",
                              alpha: 0.5,
                            }),
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ textAlign: "center" }}
                    >
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <p>
                        <strong>Hair Color: </strong>
                        {user.hair_color}
                      </p>
                      <p>
                        <strong>Skin Color: </strong>
                        {user.skin_color}
                      </p>
                      <p>
                        <strong>Gender: </strong>
                        {user.gender}
                      </p>
                      <p>
                        <strong>Vehicles: </strong>
                        {user.vehicles.length}
                      </p>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        <Button variant="contained" onClick={handlePrevPage} disabled={!prevPageUrl} >Previous</Button>
        <Button variant="contained" onClick={handleNextPage} disabled={!nextPageUrl} >Next</Button>
      </div>
    </>
  );
};

export default UserCard;
