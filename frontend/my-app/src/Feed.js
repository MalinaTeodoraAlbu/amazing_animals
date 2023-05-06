import './index.css';
import PostsList from "./function/PostsLIst";
import SearchBar from "./SearchBar";

function Feed() {
  const userId = localStorage.getItem('userId');

  const addNewPost = async (event) => {
    event.preventDefault();
    window.location.href = '/addNewPost' ;
  }
  return (
    <div className="containerFeed">
    <div className="Feed">
    <div class="Feed_add_post">
  <div class="Animals_details_container_border">
    <h3>Add new post</h3>
  </div>
  <div class="input_container">
    <input type="text" class="post_input" placeholder="Say something"/>
  </div>
  <div class="buttons_feed">
    <button class="add-animal-btn" onClick={addNewPost}>Add a post</button>
  </div>
</div>

      <div className="Feed_container">
        <PostsList></PostsList>
        <div className="end">

        </div>
      </div>
    </div>

    <div className="Feed_side_bar" >
      <div className="Feed_Search">
        <SearchBar/>
      </div>
      <div className="Feed_ADv">
      <div className="_border_adv">
              <h3>Advertising</h3>
    </div>
      </div>
    </div>
    
    </div>
  );
}

export default Feed;