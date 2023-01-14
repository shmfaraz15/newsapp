import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  render() {
    return (
      <div className='container my-3'>
        <h2>NewsMonkey - TopHeadlines</h2>
        <div className='row'>
          <div className='col-md-4'>
            <NewsItem title="my Title" description="my description" />
          </div>
          <div className='col-md-4'>
            <NewsItem title="my Title" description="my description" />
          </div>
          <div className='col-md-4'>
            <NewsItem title="my Title" description="my description" />
          </div>
        </div>
      </div>
    )
  }
}
