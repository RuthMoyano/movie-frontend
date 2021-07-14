import React, { Component } from "react";
import axios from "axios";

import "./MovieDetail.css";

export class MovieDetail extends Component {
  state = {
    Actors: "",
    Awards: "",
    Country: "",
    Plot: "",
    Poster: "",
    Rated: "",
    Ratings: [],
    Title: "",
    imdbID: "",
    isLoading: true,
  };
  // if a user previously clicks on a movie from the movie roster, we make an ajax request so that the movie detail page is loaded automatically
  async componentDidMount() {
    try {
      //we make our ajax request using axios
      // remember to cloak the api key
      //we complete the url using props from previous page
      let result = await axios.get(
        `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&t=${this.props.match.params.movieTitle}`
      );
      //we set the state with the returned data
      this.setState({
        Actors: result.data.Actors,
        Awards: result.data.Awards,
        Country: result.data.Country,
        Plot: result.data.Plot,
        Poster: result.data.Poster,
        Rated: result.data.Rated,
        Ratings: result.data.Ratings,
        Title: result.data.Title,
        imdbID: result.data.imdbID,
        //isLoading is false but will toggle true if data doesnt return right away
        isLoading: false,
      });

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };


  //showMovieDetail is the tempalte for what will show with the movie details
  // our state will populate the fields
  showMovieDetail = () => {
    return (
      <div className="detail-container">
        <div>
          <img src={this.state.Poster} alt={this.state.Title} />
        </div>
        <div className="movie-stats">
          <div className="detail-div"><span className="detail-category">Actors:</span> {this.state.Actors}</div>
          <div className="detail-div"><span className="detail-category">Awards:</span> {this.state.Awards}</div>
          <div className="detail-div"><span className="detail-category">Country:</span> {this.state.Country}</div>
          <div className="detail-div"><span className="detail-category">Plot:</span> {this.state.Plot}</div>
          {/* <div>Poster: {this.state.Poster}</div> */}
          <div className="detail-div"><span className="detail-category">Rated:</span> {this.state.Rated}</div>
          <div className="detail-div">
          <span className="detail-category">Ratings:</span>{" "}
            {this.state.Ratings.map((item) => {
              return (
                <span key={item.Source}>
                  {item.Source} {item.Value}
                </span>
              );
            })}
          </div>
          <div className="detail-div"><span className="detail-category">Title:</span> {this.state.Title}</div>
          <div className="detail-div"><span className="detail-category">imbdID:</span> {this.state.imdbID}</div>
        </div>

        <div className="form-div">

        </div>


      </div>
    );
  };
  //in render, if isLoading is true, the page will show ---loading, otherwise it will display the movie details
  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            ...Loading
          </div>
        ) : (
          this.showMovieDetail()
        )}
      </div>
    );
  }
}

export default MovieDetail;
