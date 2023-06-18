import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { action, useStoreActions } from 'easy-peasy';


//npm i date fns -S
// npx json-server -p 3500 -w data/db.json
function App() {
  const setPosts = useStoreActions((actions)=> actions.setPosts)
  const [searchResults, setSearchResults] = useState([]);

  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')
  useEffect(()=>{
    setPosts(data);
  }, [data, setPosts])

  return (
    <div className="App">
      
        <Header title="Blog application" />
        
        <Nav />
        <Switch>
          <Route exact path="/" >
            <Home
            isLoading ={isLoading}
            fetchError ={fetchError} 
            />
          </Route>
          <Route exact path="/post" component={NewPost}>

          </Route>
          <Route exact path="/edit/:id" component={EditPost}>
        
          </Route>
          <Route path="/post/:id" component={PostPage}>
            
          </Route>
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
        </Switch>
        
        <Footer />
     
    </div>
  );
}

export default App;