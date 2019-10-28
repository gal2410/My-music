import React,{Component} from 'react';
import axios from 'axios';
import './posts.css';
import Auth from '../Auth/Auth';
import Modal from 'react-awesome-modal';
import 'bootstrap/dist/css/bootstrap.css';
console.log(Auth.getAutenticate());

class Posts extends Component{
    state = {
        posts:[],
        song_name:"",
        singer_name:"",
        song_url:"",
        img:"http://www.zarias.com/wp-content/uploads/2015/12/61-cute-puppies.jpg",
        _like:0,
        show_fields:0,
        show_error_message:false,
        error_message:"",
        edit_post_id:"",
        edit_music_song_name:"",
        edit_music_singer_name:"",
        edit_music_song_url:"",
        edit_music_img:"",
        edit_music_like:0,
        show_edit_modal:false
    }

    componentDidMount(){
        this.getPosts();
    }
    closeModal(){
        this.setState({
            show_edit_modal:false
        });
    }
    render(){
        return(
            <div>
                <Modal 
                    visible={this.state.show_edit_modal}
                    width="500"
                    height="500"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <div className="modal-edit-post">
                        <i className="fa fa-times" onClick={() => this.closeModal()}></i>
                        <h1>Edit music list</h1>
                        <h4>Change music Data</h4>
                        <div className="edit-fields">
                            <div className="form-group">
                                <label>song name</label>
                                <input className="form-control" id="edit_music_song_name" onChange={this.handleChange} value={this.state.edit_music_song_name} placeholder="song name..." />
                            </div>
                            <div className="form-group">
                                <label>singer name</label>
                                <input className="form-control" id="edit_music_singer_name" onChange={this.handleChange} value={this.state.edit_music_singer_name} placeholder="singer name..." />
                            </div>
                            <div className="form-group">
                                <label>song url</label>
                                <input className="form-control" id="edit_music_song_url" onChange={this.handleChange} value={this.state.edit_music_song_url} placeholder="song url..." />
                            </div>
                            <div className="form-group">
                                <label>Image Url</label>
                                <input className="form-control" id="edit_music_img" onChange={this.handleChange} value={this.state.edit_music_img} placeholder="Image Url..." />
                            </div>
                        </div>
                        <div className="btn btn-success" onClick={this.saveEditedPost.bind(this)} >Save</div>
                    </div>
                </Modal>
                <div className="add-post-wrapper">
                    <div className="buttons-row">
                        <div className="btn btn-success" onClick={this.showHideAddPostFields.bind(this,1)}>Add song</div>
                    </div>
                    {
                        this.state.show_fields?
                        <div className="fields-row">
                            <i className="fa fa-times" onClick={this.showHideAddPostFields.bind(this,0)}></i>
                            <input type="text" className="form-control" id="song_name" onChange={this.handleChange} value={this.state.song_name} placeholder="song name..." />
                            <input type="text" className="form-control" id="singer_name" onChange={this.handleChange} value={this.state.singer_name} placeholder="singer name..." />
                            <input type="text" className="form-control" id="song_url" onChange={this.handleChange} value={this.state.song_url} placeholder="song url..." />
                            <input className="form-control" id="img" onChange={this.handleChange} value={this.state.img} placeholder="Image Url..." />
                            <div className="btn btn-success" onClick={this.savePost.bind(this) } >Save</div>
                        </div>
                        :
                        <div></div>
                    
                    }

                </div>
                {
                    this.state.show_error_message?
                    <div className="alert alert-danger">{this.state.error_message}</div>
                    :
                    <div></div>
                }
               
               <div className="posts-wrapper">
                {
                    this.state.posts.map( (post,index) => {
                        return(
                            <div key={index} className="post">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4  className="post-body">{post.song_name}</h4>
                                        <div className="post-body">{post.singer_name}</div>
                                        <div  className="post-body"><a href={post.song_url} target="_blank">{post.song_url}</a></div>
                                    </div>
                                    <div className="col-md-4">
                                        <img src={post.image} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <i className="post-id">ID: {post.id}</i>
                                        <i className="fa fa-edit" onClick={this.editPost.bind(this,post.id)}></i>
                                        <i className="fa fa-trash" onClick={this.deletePost.bind(this,post.id)}></i>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="like-dislike">
                                            <i onClick={this.setLikeDislike.bind(this,post.id,1)} className={(post._like == 1)?"fa fa-thumbs-up blue":"fa fa-thumbs-up"}></i>
                                            <i onClick={this.setLikeDislike.bind(this,post.id,2)} className={(post._like == 2)?"fa fa-thumbs-down red":"fa fa-thumbs-down"}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )   
                    })
                }
               </div> 
            </div>
        )
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

      showHideAddPostFields(val){
          this.setState({show_fields:val});
      }

      savePost(){
          let post = {
            song_name:this.state.song_name,
            singer_name:this.state.singer_name,
            song_url:this.state.song_url,
              img:this.state.img,
              _like:this.state._like
          }
          axios.post('/posts',{post:post})
          .then( (response) => {
            if( response.data.success ){
                this.showHideAddPostFields(0);
                this.getPosts();
              }else{
                this.state.error_message=response.data.response_text;
                this.state.show_error_message = true;
                this.setState({});
              }
          })
          .catch(function(error){
            console.log(error);
            //Perform action based on error
        });
      }

      saveEditedPost(){
        let post = {
            id:this.state.edit_post_id,
            song_name:this.state.edit_music_song_name,
            singer_name:this.state.edit_music_singer_name,
            song_url:this.state.edit_music_song_url,
            img:this.state.edit_music_img,
            _like:this.state.edit_music_like
        }
        axios.put('/posts',{post:post})
        .then( (response) => {
            this.closeModal();
          if( response.data.success ){
              this.getPosts();
            }else{
              this.state.error_message=response.data.response_text;
              this.state.show_error_message = true;
              this.setState({});
            }
        })
        .catch(function(error){
          console.log(error);
          //Perform action based on error
      });
      }

      getPosts(){
        axios.get('/posts',{})
        .then( (response) => {
          if( response.data.success ){
            this.state.posts = response.data.data;
            this.setState({});
            }else{
              this.state.error_message=response.data.response_text;
              this.state.show_error_message = true;
              this.setState({});
            }
        })
        .catch(function(error){
            console.log(error);
            //Perform action based on error
        });
      }

      deletePost(id){
        axios.delete('/posts',{ data: {id:id} })
        .then( (response) => {
            if( response.data.success ){
                    this.getPosts();
                }else{
                    this.state.error_message=response.data.response_text;
                    this.state.show_error_message = true;
                    this.setState({});
                }
            })
            .catch(function(error){
            console.log(error);
            this.state.error_message=error.response.statusText + ", " + error.response.data;
            this.state.show_error_message = true;
            this.setState({});
            //Perform action based on error
        });
      }

      editPost(id){
        axios.get('/posts/postById',{params:{id:id}})
        .then( (response) => {
            if( response.data.success ){
                    
                    let post_to_edit = response.data.data[0];
                    this.state.edit_post_id = post_to_edit.id;
                    this.state.edit_music_song_name = post_to_edit.song_name;
                    this.state.edit_music_singer_name = post_to_edit.singer_name;
                    this.state.edit_music_song_url = post_to_edit.song_url;
                    this.state.edit_music_img = post_to_edit.image;
                    this.state.edit_music_like = post_to_edit._like;
                    this.state.show_edit_modal = true;
                    this.setState({}); 
                }else{
                    this.state.error_message=response.data.response_text;
                    this.state.show_error_message = true;
                    this.setState({});
                }
            })
            .catch(function(error){
            console.log(error);
            this.state.error_message=error.response.statusText + ", " + error.response.data;
            this.state.show_error_message = true;
            this.setState({});
            //Perform action based on error
        });
      }

      setLikeDislike(post_id,like_ordislike){
        axios.put('/posts/setlike',{id:post_id,_like:like_ordislike})
        .then( (response) => {
            if( response.data.success ){
                    this.getPosts();
                }else{
                    this.state.error_message=response.data.response_text;
                    this.state.show_error_message = true;
                    this.setState({});
                }
            })
            .catch(function(error){
            console.log(error);
            //Perform action based on error
        });
      }
}

export default Posts;