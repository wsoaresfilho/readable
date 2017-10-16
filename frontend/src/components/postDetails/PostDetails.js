import { connect } from 'react-redux'
import { deletePost, setSelected, upVotePost, downVotePost } from '../../actions'
import { images, getTime } from '../../utils/util'
import React from 'react'

const PostDetails = (props) => {
    const { post, deletePost, upVotePost, downVotePost } = props
    const path = images.find(image => image.code === post.category)

    return (
        <div className="row cp-post-details">
            <div className="col-8">
                <div className="details">
                    <div className="col-12">
                        <img src={ path.icon }
                             alt="Category Icon"
                             className="img-fluid shadow"
                             width="50"/>
                    </div>

                    <div className="col-12">
                        <span className="title">{ post.title }</span>
                    </div>

                    <div className="col-12">
                        <span>{ post.body }</span>
                    </div>

                    <div className="col-12">
                        <span className="text-uppercase author">Post created by  { post.author + " " + getTime(post.timestamp)} </span>
                    </div>
                </div>
            </div>

            <div className="col-4 menu">

                <div className="row">
                    <div className="col-12 col-sm-6" onClick={() => upVotePost(post.id) }>
                        <div className="col-12 item">
                            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6" onClick={() => downVotePost(post.id) }>
                        <div className="col-12 item">
                            <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-sm-6" onClick={() => deletePost(post.id) }>
                        <div className="col-12 item">
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6">
                        <div className="col-12 item">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>

                <div className="col item">
                    <i className="fa fa-comment-o" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps({ load }) {
    return {
        load: load,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deletePost: (id) => {
            dispatch(deletePost(id))
            dispatch(setSelected('post', {}))
        },
        upVotePost: (postID) => dispatch(upVotePost(postID)),
        downVotePost: (postID) => dispatch(downVotePost(postID)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
