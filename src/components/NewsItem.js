import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description } = this.props

        return (
            <div className="card" style={{ width: "18rem" }}>
                <img src="https://www.reuters.com/resizer/oRuZd0_VWAW4BgartWH5dYtGISw=/1013x530/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/QD74PPDJ6VMQVJMJE5IDMZPOMQ.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href="/" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        )
    }
}