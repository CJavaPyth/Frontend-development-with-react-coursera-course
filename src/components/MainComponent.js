//Container component
import React, { Component } from 'react';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchComments, fetchDishes, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form'; 
import { TransitionGroup, CSSTransition } from 'react-transition-group';

  const mapStateToProps = state => {  //state is from redux store
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    } //these are now available as props to components
  }

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},  //fetchDishes becomes available for MainComponent
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}, //this resets the form, model is called 'feedback'
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
})

class Main extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  } //will be executed just after MainComponent gets mounted into the view of the app

  render() {    /*State that is defined in App component is made available as props to Menu Component*/
    const HomePage = () => {
        return (
            <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
             promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
             promosLoading={this.props.promotions.isLoading}
             promosErrMess={this.props.promotions.errMess}

             leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
             leaderLoading={this.props.leaders.isLoading}
             leaderErrMess={this.props.leaders.errMess}             
            />
        );
    }
    
    const AboutUsPage = () => {
        return(
            <About 
                leaders={this.props.leaders.leaders}
                leaderLoading={this.props.leaders.isLoading}
                leaderErrMess={this.props.leaders.errMess}
            />
        );
    };

    const DishWithId = ({match}) => {
        return (
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id===parseInt(match.params.dishId, 10))[0]}
            comments={this.props.comments.comments.filter((comment) => comment.dishId===parseInt(match.params.dishId, 10))}
            isLoading={this.props.dishes.isLoading}
            ErrMess={this.props.dishes.errMess}
            postComment={this.props.postComment}
            commentsErrMess={this.props.comments.errMess}
            />
        );
    }

    return (
      <div>
        <Header />
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
              <Switch>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} /> 
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                  <Route exact path='/aboutus' component={AboutUsPage}/> 
                  <Redirect to='/home' />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
