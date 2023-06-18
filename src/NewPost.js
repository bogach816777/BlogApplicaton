
import { useStoreState, useStoreActions, action  } from 'easy-peasy';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const NewPost = () => {
    const posts = useStoreState((state)=> state.posts);
    const postTitle = useStoreState((state)=> state.postTitle);
    const postBody = useStoreState((state)=> state.postBody);
    const savePost = useStoreActions((actions)=> actions.savePost)
    const setPostTitle = useStoreActions((actions)=> actions.setPostTitle)
    const setPostBody = useStoreActions((actions)=> actions.setPostBody)

    const history = useHistory()
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const id = posts.length ? posts[posts.length -1].id +1 :1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = {id, title: postTitle, datetime, body:postBody};
        savePost(newPost);
        history.push('/')
    
      }
    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form
            onSubmit={handleSubmit} 
            className="newPostForm" action="">
                <label htmlFor="postTitle">Title: </label>
                <input type="text"
                id="postTitle"
                required
                value={postTitle}
                onChange={(e)=> setPostTitle(e.target.value)} />
                <label htmlFor="postBody">Post:</label>
                <textarea name="" id="postBody"
                required
                value={postBody}
                onChange={(e)=> setPostBody(e.target.value)}
                 cols="30" rows="10"></textarea>
                 <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost
