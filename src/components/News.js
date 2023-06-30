import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizedFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizedFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aaaf23f501894ebd8787d0c87f77183b&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      // totalResults: 0,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }
  fetchMoreData = async() => {
     this.setState({page: this.state.page + 1})
     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aaaf23f501894ebd8787d0c87f77183b&page=${this.state.page}&pagesize=${this.props.pageSize}`;
     this.setState({ loading: true });
     let data = await fetch(url);
     let parsedData = await data.json();
     this.setState({
       articles: this.state.articles.concat(parsedData.articles),
       totalResults: parsedData.totalResults,
       loading: false,
      //  totalResults: 0,
     });
   };
  // handlePreviousClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };
  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };
  render() {
    return (
      <>
      <h1 className="text-center" style={{ margin: "35px 0px" }}>
              NewsMonkey - Top  {this.capitalizedFirstLetter(this.props.category)} Headlines
            </h1>
            {/* {this.state.loading && <Spinner />} */}
            <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        ><div className="container">
            <div className="row">
            { this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}/>
                  </div>
                );
              })}
              </div>
          </div>
          </InfiniteScroll>
        
       </>
    );
  }
}

export default News;
