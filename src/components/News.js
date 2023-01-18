import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  articles = []

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
  }

  static defaultProps = {
    pageSize: 8,
    country: 'in',
    category: 'general'
  }

  constructor() {
    super();
    console.log("Hello i am constructor from news.js")
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults: 0
    }
  }

  async componentDidMount() {
    console.log("cdm")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=207aed86947a43c8b5e999fa0831ea5a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  fetchMoreData = async () => {
    console.log("previous")
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=207aed86947a43c8b5e999fa0831ea5a&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };

  // handleOnPrevClick = async () => {

  //   console.log("previous")
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=207aed86947a43c8b5e999fa0831ea5a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
  //   this.setState({ loading: true })
  //   let data = await fetch(url)
  //   let parsedData = await data.json()
  //   console.log(parsedData)

  //   this.setState({
  //     articles: parsedData.articles,
  //     page: this.state.page - 1,
  //     loading: false
  //   })
  // }

  // handleOnNextClick = async () => {
  //   console.log("next")
  //   if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 20)) {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=207aed86947a43c8b5e999fa0831ea5a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
  //     let data = await fetch(url)
  //     let parsedData = await data.json()
  //     console.log(parsedData)

  //     this.setState({
  //       articles: parsedData.articles,
  //       page: this.state.page + 1
  //     })
  //   };
  // }

  render() {
    return (
      <>

        <h2 className='text-center'>NewsMonkey - TopHeadlines</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className='row'>
              {this.state.articles.map((element) => {
                return (<div className='col-md-4' key={element.url}>
                  <NewsItem title={element.title} description={element.description} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>)
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handleOnPrevClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} onClick={this.handleOnNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}
