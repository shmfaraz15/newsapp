import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  articles = []

  constructor() {
    super();
    console.log("Hello i am constructor from news.js")
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  async componentDidMount() {
    console.log("cdm")
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=207aed86947a43c8b5e999fa0831ea5a&page=${this.state.page}&pageSize=20`
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    })
  }

  handleOnPrevClick = async () => {

    console.log("previous")
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=207aed86947a43c8b5e999fa0831ea5a&page=${this.state.page - 1}&pageSize=20`
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)

    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1
    })
  }

  handleOnNextClick = async () => {
    console.log("next")
    if ((this.state.page + 1) <= Math.ceil(this.state.totalResults / 20)) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=207aed86947a43c8b5e999fa0831ea5a&page=${this.state.page + 1}&pageSize=20`
      let data = await fetch(url)
      let parsedData = await data.json()
      console.log(parsedData)

      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1
      })
    };
  }

  render() {
    return (
      <>
        <div className='container my-3'>
          <h2>NewsMonkey - TopHeadlines</h2>
          <div className='row'>
            {this.state.articles.map((element) => {
              return (<div className='col-md-4' key={element.url}>
                <NewsItem title={element.title} description={element.description} newsUrl={element.url} imageUrl={element.urlToImage} />
              </div>)
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handleOnPrevClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handleOnNextClick}>Next &rarr;</button>
        </div>
      </>
    )
  }
}
