import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent'
import '../App.css'

import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent'
import Header from './HeaderComponent';
import About from './AboutComponent'
import Footer from './FooterComponent';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addComment,fetchDishes } from '../redux/ActionCreators';

const mapStateToProps = state => {
   return {
    dishes: state.dishes,
    leaders : state.leaders,
    comments : state.comments,
    promotions : state.promotions
   } 
  }
  const mapDispatchToProps = (dispatch) => ({
  addComment : (dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment)),
  fetchDishes : () => {dispatch(fetchDishes())}
  });

class Main extends Component {
  constructor(props){
    super(props);
  }

    componentDidMount(){
      this.props.fetchDishes();
    }
  
  render() {
    const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading = {this.props.dishes.isLoading}
              dishesErrMess = {this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish = {this.props.dishes.dishes.filter((dish) => 
          dish.id === parseInt(match.params.dishId,10))[0]}
          comments = {this.props.comments.filter((comment) => 
            comment.dishId === parseInt(match.params.dishId,10))}
          addComment ={this.props.addComment}
          isLoading = {this.props.dishes.isLoading}
          errMess = {this.props.dishes.errMess} />
        );
          }
    const AboutPage = () => {
      return(
      <About leaders={this.props.leaders} />
      );
    }
    
    return (
      <div>
      <Header />
      <Switch>
        <Route path='/Home' component={HomePage} />
        <Route exact path ="/menu" component={() => <Menu dishes={this.props.dishes} />} />
        <Route path="/menu/:dishId" component = {DishWithId} />
        <Route exact path="/contactus" component = {Contact} />
        <Route exact path="/aboutus" component = {AboutPage} />
        <Redirect to="/home" />
      </Switch>
      <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));