import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export class Movie extends Component {
  state = {
    movie: "",
    movieArray: [],
  };
  async componentDidMount() {
    try{
      let searchedMovieTitle = window.sessionStorage.getItem("searchedMovieTitle");
    
      if (searchedMovieTitle) {
        let result = await axios.get(
          `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&s=${searchedMovieTitle}`
        );

        this.setState({
          movieArray: result.data.Search,
        })
      }
      
      } catch (e) {
        
        console.log(e);
    }
  }

  handleOnChange = (event) => {
    this.setState({
      movie: event.target.value,
    });
  };
  //when our search button is clicked, onsubmit will run
  onSubmit = async (event) => {
    try {
      //we make our ajax request that will use the user input to complete our url
      //we need to make sure that we cloack our omdb api key to avoid charges
      let result = await axios.get(
        `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&s=${this.state.movie}`
      );
      
      //important to note that sessionStorage is active for the time of using the window, if exited and returned, it will no longer be there
      window.sessionStorage.setItem("searchedMovieTitle", this.state.movie);
      console.log(result);
      // we set the first ten films which is declared above as an empty array
      this.setState({
        movieArray: result.data.Search,
      });
    } catch (e) {
      console.log(e);
    }
  };
  // we use this function to run map on the moviearray of state
  // if there are movies in the array, we do a .map to apply the same <div> layout to each one
  showMovieList = () => {
    return this.state.movieArray.map((item) => {
      return (
        <div
          key={item.imdbID}
          style={{ width: 300, height: 300, marginRight: 25 }}
        >
          {/* we then create link paths using react-router-dom that will take us to the individual movie's own page  */}
          <Link
            to={{
              pathname: `/movie-detail/${item.Title}`,
              //search: `?t=${item.Title}`, //?minPrice=20&maxPrice=59&color=white&size=10
            }}
          >
            <div>
              <img src={item.Poster} alt={item.Title} />
            </div>
            <div>
              Title: {item.Title}
              Year: {item.Year}
            </div>
          </Link>
        </div>
      );
    });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <div
          style={{
            width: 500,
            margin: "0 auto",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <input
            type="text"
            placeholder="Search something..."
            name="movie"
            onChange={this.handleOnChange}
          />
          <button onClick={this.onSubmit}>Search</button>
        </div>
        <div
          style={{
            width: 1200,
            margin: "0 auto",
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
          }}
        >
          {this.showMovieList()}
        </div>
      </div>
    );
  }
}
export default Movie;
/*
Movie.js is what our user will see once they successfully sign up and sign in.
it is a simple search button that will bring out 10 films.
here we are using our omdb api key to access their database and get the movies we need
*/
