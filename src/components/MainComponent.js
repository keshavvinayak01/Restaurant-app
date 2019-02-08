import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent'
import '../App.css'
import { dishes } from '../shared/dishes';
import { comments } from '../shared/comments';
import { leaders } from '../shared/leaders';
import { promotions } from '../shared/promotions';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent'
import Header from './HeaderComponent';
import About from './AboutComponent'
import Footer from './FooterComponent';
import {Switch,Route,Redirect} from 'react-router-dom';


class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes : dishes,
      promotions: promotions,
      leaders : leaders,
      comments : comments,
      selectedDish : null
    };
  }
  onDishSelect(dish){
      this.setState({selectedDish : dish});
    }
    
  render() {
    const HomePage = () => {
      return(
          <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish = {this.state.dishes.filter((dish) => 
          dish.id === parseInt(match.params.dishId,10))[0]}
          comments = {this.state.comments.filter((comment) => 
            comment.dishId === parseInt(match.params.dishId,10))} />
        );
          }
    const AboutPage = () => {
      return(
      <About leaders={this.state.leaders} />
      );
    }
    
    return (
      <div>
      <Header />
      <Switch>
        <Route path='/Home' component={HomePage} />
        <Route exact path ="/menu" component={() => <Menu dishes={this.state.dishes} />} />
        <Route path="/menu/:dishId" component = {DishWithId} />
        <Route exact path="/contactus" component = {Contact} />
        <Route exact path="/aboutus" component = {AboutPage} />
        <Redirect to="/home" />
      </Switch>
      {/*<Menu dishes={this.state.dishes} 
      onClick= {(dish) => {this.onDishSelect(dish)}} />
      {console.log(this.state.selectedDish)}*/}
      {/*<DishDetail selectedDish = {this.state.selectedDish} />*/}
      <Footer />
      </div>
    );
  }
}

export default Main;