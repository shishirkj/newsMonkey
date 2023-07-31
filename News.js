import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';


export default class extends Component {
 


  
  constructor(props) {
      super(props);
      this.state = {
        articles: [],
       
        loading:true,
        page:1,
        totalResults:0
        
      };
      document.title= `${this.props.category}-News Monkey`
    }
  
 async updateNews(){

      const  url= `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=2d8c46af272445519f3e18dc5ed25c04&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading:true,});
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({ 
        articles: parsedData.articles,
        totalResults:parsedData.totalResults,
        loading:false
      });
    };

    async componentDidMount() {
           this.updateNews();

    }
     
    fetchMoreData = async() =>
    { 
      this.setState({ page: this.state.page + 1 });
      const  url= `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=2d8c46af272445519f3e18dc5ed25c04&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading:true,});
      let data = await fetch(url);
      let parsedData = await data.json();
  
      this.setState({ 
        articles: this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
        page: this.state.page+1
        
      });
    }


    

  render() {
    return (
      <div className="container my-4  ">
        <h1 className="text-center">NewsMonkey-headlines-from {`${this.props.category}`}</h1>
        <p> <b>click on above options to see news of particular topics</b>

        </p>
        {this.state.loading &&<Spinner/>}
       <InfiniteScroll style={{overflow: 'hidden'}}
         dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="row">
        
          { //displaying all details of api using mapping  this.state.articles to check is map dosent go out of bound or undefined
         // (cannot read properties)
       this.state.articles.map((index) =>
          {
     return <div className="col-md-4 " key={index.url}>
            <NewsItem title={index.title?index.title.slice(0,44):"Pristyn Care suspends Lybrate founders after..."} description={index.description?index.description.slice(0,88):"Going by recent times, it appears that Indian equity bulls are unstoppable as the index ..."} imageUrl={index.urlToImage!==null?index.urlToImage:"https://img.etimg.com/thumb/msid-101989091,width-1070,height-580,imgsize-79546,overlay-economictimes/photo.jpg"} newsUrl = {index.url} 
            author = {index.author===null?"unknown":index.author} date ={ new Date(index.publishedAt).toGMTString}/>
            </div>
          
            
          }
          )
        }

        </div>
        </InfiniteScroll>

     

      </div>
    );
  }
}
