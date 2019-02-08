import React from 'react';
import { Card,CardImg,CardBody,CardText,CardTitle
,Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../App.css';
import { Link } from 'react-router-dom';

	function RenderDish({dish,comments}){
		if (dish != null) {
			return(
				<div className= 'selected'>
				<div className = "col-12 col-md-5 mt-1 image">
				<Card>
					<CardImg object src = {dish.image} alt = {dish.name} />
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
						<div>	
						<p>{comment.comment}</p>
						<p>-- {comment.author}, {new Intl.DateTimeFormat('en-US',
							{year:'numeric',month:'short',day:'2-digit'})
						.format(new Date (Date.parse(comment.date)))}</p>
						</div>
				)
			});
			return(
				<div className="comments">
				<h4>Comments</h4>
				{comments_render}
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
			<RenderDish dish={props.dish} comments= {props.comments}/>
			</div>
			);
	}

export default DishDetail;


