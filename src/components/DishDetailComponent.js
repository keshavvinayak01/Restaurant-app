import React,{Component} from 'react';
import { Card,CardImg,CardBody,CardText,CardTitle
,Breadcrumb, BreadcrumbItem,Button,Label,Col,Row,Modal,ModalHeader,ModalBody} from 'reactstrap';
import {Control,LocalForm,Errors} from 'react-redux-form';
import { Link } from 'react-router-dom';
import '../App.css';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform,Fade,Stagger} from 'react-animation-components';
// Validators for form
	function RenderDish({dish,comments}){
		if (dish != null) {
			return(
				<FadeTransform in 
                transformProps = {{
                    exitTransform : 'scale(0.5) translateX(100%)'
                }}>
					<div className= 'selected'>
					<div className = "col-12 col-md-5 mt-1 image">
					<Card>
						<CardImg object src = {baseUrl + dish.image} alt = {dish.name} />
						<CardBody>
							<CardTitle>
								{dish.name}
							</CardTitle>
							<CardText>
								{dish.description}
							</CardText>	
						</CardBody>
					</Card>
					</div>
					<div className = "col-12 col-md-5 mt-1">
					<Card>
					<RenderComments comments={comments} />
					</Card>
					</div>
					</div>
				</FadeTransform>
				);
		}
		else{
			return(
					<div></div>
				);
		}
	}
	function RenderComments({comments}){
		if(comments.length){
			const comments_render = comments.map((comment) => {
				return (
						<Fade in>
						<li key={comment.id} >
						<p>{comment.comment}</p>
						<p>-- {comment.author}, {new Intl.DateTimeFormat('en-US',
							{year:'numeric',month:'short',day:'2-digit'})
						.format(new Date (Date.parse(comment.date)))}</p>
						</li>
						</Fade>
						
				)
			});
			return(
				<div className="comments">
				<h4>Comments</h4>
				
				<ul className = "list-unstyled">
				<Stagger in>
				{comments_render}
				</Stagger>
				</ul>
				</div>
				)
		}
		else{
			return(
				<div></div>
			);
		}
	}

const DishDetail = (props) =>{
		if (props.isLoading){
			return(
				<div className="container">
					<div className="row">
						<Loading />
					</div>
				</div>

				);
		}
		else if(props.errMess){
			return(
				<div className="container">
					<div className="row">
						<h4>{props.errMess}</h4>
					</div>
				</div>

				);
		}
		else if(props.dish != null)
		return(
			<div>
			<div className="row item">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
			<RenderDish dish={props.dish} comments= {props.comments} />
			<CommentForm dishId={props.dish.id} postComment={props.postComment} />
			</div>
			);
		else
			return ( <div></div>);
	}

export default DishDetail;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			isModalOpen : false
		}
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(values) {
        this.toggleModal();
		this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
    }
	toggleModal(){
		this.setState({
			isModalOpen : !this.state.isModalOpen
		})
}
render(){
	return(
	<React.Fragment>
	
	<Button outline onClick={this.toggleModal} >
	<span className="fa fa-sign-in fa-lg"></span>Submit Comment
	</Button>
	<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> 
	<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
	<ModalBody>
	<LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                        <Row className="form-group">
                            <Label for="rating" md={2}>Rating</Label>
                            <Col md={10}>
                                <Control.select model=".rating" id="rating" name="rating"  
                                 className = "form-control"
                                 value={this.state.rating}
								>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
								</Control.select>
                            </Col> 
                        </Row>
                        <Row className="form-group">
                            <Label for="author" md={2}>Your Name</Label>
                            <Col md={10}>
                                <Control.text model=".author" id="author" name="author" 
                                 placeholder="Kimi no nawa" 
                                value={this.state.author}
                                className="form-control"
                                validators={{
                                    minLength:minLength(3),maxLength:maxLength(25)
                                 }}
                                  />
                                  <Errors
                                 className="text-danger"
                                 model=".name"
                                 show="touched"
                                 messages={{
                                    minLength : "Must be greater than 2 characters",
                                    maxLength: "Must be 20 characters or less"
                                 }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label for="comment" md={2}>Comment</Label>
                            <Col md={10}>
                                <Control.textarea model=".comment" id="comment" 
                                 name="comment"
                                 rows = "8" 
				className="form-control "
                                 value={this.state.comment}
                                 />
                            </Col>
                        </Row>
                        <Button type="submit" color="primary" >
                                Send Feedback
                                </Button>
                        </LocalForm>
					</ModalBody>	
			     </Modal>
			     </React.Fragment>
			     );
			 }
			}
