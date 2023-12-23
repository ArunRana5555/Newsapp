import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps={
    country:'in',
    category:'general',
  }
  static propTypes={
    country:PropTypes.string,
    category:PropTypes.string,
  }
   
    handlePreviousClick= async()=>{
        this.props.setProgress(0);
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03fe278880fe456dbf15980614c44ab3&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
       this.setState({loading:true});
       let data = await fetch(url);
       let parsedData = await data.json();
       this.setState({
           page: this.state.page-1,
           articles: parsedData.articles,
           loading:false
       })
    }
    handleNextClick=async()=>{
      this.props.setProgress(0);
        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/20))){      
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03fe278880fe456dbf15980614c44ab3&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page+1,
                articles: parsedData.articles,
                loading:false
            })
        }
    }
    constructor(props){
        super(props);
        // console.log("hello i am arun rana")
        this.state={
            articles:[],// this.articles
            loading: false,
            page:1    
        }
        document.title=`NewsMonkey-${this.props.category}`
    }
     async componentDidMount(){
      this.props.setProgress(0);
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03fe278880fe456dbf15980614c44ab3&page=1&pagesize=${this.props.pagesize}`;
       this.setState({loading:true});
       this.props.setProgress(30);
       let data = await fetch(url);
       let parsedData = await data.json();
       this.props.setProgress(70);
       this.setState({articles: parsedData.articles,
                     totalResults: parsedData.totalResults,
                     loading:false
    })
    }
  render() {
    return (
      <div className='container my-3'>
       <h1 className="text-center">NewsMonkey-Top {this.props.category} Heading</h1>   
       {this.state.loading && <Spinner/>} 
        <div className="row">
             {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.urlToImage}>
                <NewsItem tittle={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}/>
                   </div>
             })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr;Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/20)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
