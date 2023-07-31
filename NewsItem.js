import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date} = this.props
    return (
    <div>
      <div className="card border  border-danger border-4  my-4" >
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <footer className="blockquote-footer, my-2">By {author} <cite title="Source Title" className="p-3">{date}</cite></footer>
    {/* target = "_blank" se naya tab khul jaata hai */}
    <a href={newsUrl}target = "_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>

    </div>)
  }
}








