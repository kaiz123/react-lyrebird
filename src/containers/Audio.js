import React from 'react';
import {getGenerated, generate} from "../Api/audio";
import {
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupDropdown,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
 } from 'reactstrap';



class Audio extends React.Component {


	state={
		audios:[],
		loading:true
	}
	constructor() {
		super();
	}

	generateVoice = (text) => {

		generate(process.env.REACT_APP_API_TOKEN,text).then((response) => {
        	console.log("post");
        	this.getPaginatedData(0);
        	})
	}
	getPaginatedData = (offset) => {

			this.setState({loading: true})
			getGenerated(process.env.REACT_APP_API_TOKEN,offset).then(({data}) => {
				this.setState({audios: data,loading:false})
        	//console.log(this.state.audios);
		})
	}

	myFunction=()=> {
  		// Declare variables 
		  var input, filter, table, tr, td, i;
		  input = document.getElementById("myInput");
		  filter = input.value.toUpperCase();
		  table = document.getElementById("myTable");
		  tr = table.getElementsByTagName("tr");

		  // Loop through all table rows, and hide those who don't match the search query
		  for (i = 0; i < tr.length; i++) {
		    td = tr[i].getElementsByTagName("td")[0];
		    if (td) {
		      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
		        tr[i].style.display = "";
		      } else {
		        tr[i].style.display = "none";
		      }
		    } 
		  }
	}



	componentDidMount() {

		getGenerated(process.env.REACT_APP_API_TOKEN).then(({data}) => {
			this.setState({audios: data, loading:false})
        	console.log(this.state.audios);
		})
	}


	render() {
		let content;
		if (this.state.loading){
			content=<Container style={{padding:"20%"}}>LOADING.....</Container>

		}
		else{
			content=
				<div>
					<Container style={{paddingTop:"5%"}}>
						<Row style={{paddingBottom:"5%", justifyContent:"center"}}>
							<input type="text" id="myInput" onKeyUp={this.myFunction} placeholder="Search for utterances.."/>
						</Row>
						<Table bordered dark id="myTable">
							<thead>
							</thead>
							<tbody>
								{	this.state.audios.results &&
					                this.state.audios.results.map((utterance) => {
					                	
					                    return (
					                    	<tr>
					                    		<td>
					                    			{utterance.text}
					                    		</td>
					                    		<td>
					                    			{utterance.created_at}
					                    		</td>

					                    		<td>
					                    		<audio controls>
		  											<source src={utterance.url} type="audio/x-wav"/>
													  
													  Your browser does not support the audio tag.
												</audio>
					                    		</td>

					                    	</tr>
					      

					                    );
					                })
					            
					                                              
								}
							</tbody>
						</Table>
					</Container>
					<Container>
						<Row style={{justifyContent:"center"}}>
							<Pagination aria-label="Page navigation example">
						        <PaginationItem>
						          <PaginationLink href="#" onClick={()=>this.getPaginatedData(0)}>
							            1
							          </PaginationLink>
							        </PaginationItem>
							        <PaginationItem>
							          <PaginationLink href="#" onClick={()=>this.getPaginatedData(10)}>
							            2
							          </PaginationLink>
							        </PaginationItem>
							        <PaginationItem>
							          <PaginationLink href="#" onClick={()=>this.getPaginatedData(20)}>
							            3
							          </PaginationLink>
							        </PaginationItem>
							        <PaginationItem>
							          <PaginationLink href="#" onClick={()=>this.getPaginatedData(30)}>
							            4
							          </PaginationLink>
							        </PaginationItem>
							        <PaginationItem>
							          <PaginationLink href="#" onClick={()=>this.getPaginatedData(40)}>
							            5
							          </PaginationLink>
							        </PaginationItem>
								</Pagination>
					      </Row>
					</Container>
				</div>
		}
		return (
		<Container fluid style={{backgroundImage: "url(/background.jpeg)"}}>
			<Row style={{justifyContent:"center",paddingTop:"4%"}}>
				<span style={{fontSize:24,fontWeight:800}}>WELCOME TO LYREBIRD!</span>
			</Row>
			<Row style={{paddingTop:"7%",paddingRight:"4%",paddingLeft:"4%"}}>
			  <InputGroup>
			  	<Input id="gen" placeholder="Type something to hear how you sound" />
			  	<InputGroupAddon addonType="append"><Button color="secondary" onClick={()=>this.generateVoice(document.getElementById('gen').value)}>Generate</Button></InputGroupAddon>
			  </InputGroup>
			</Row>
			{
				content
			}
		</Container>
		);

	}

}


export {Audio};