import BoardsView from '../containers/BoardsView';
import { useSelector } from 'react-redux';

// dummy authentication... should replace with actual authenticaition state
// switch from true to false to test different views
const userAuth = true


function HomePage() {
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  
  const renderHomePage = () => {
    if (userIsLoggedIn) {
      return( 
        <BoardsView />
        )
    } else {
      return (
        <>
    
          <h1>test render...</h1>
          <p>* change userAuth boolean in HomePage component to test user authentication and view boards </p>
          <p>* also in NavBar, userAuth is dummy state to change login/sign-out text </p>
    
        </>
      )
    }
  };

  return (
    <div>
      {renderHomePage()}
    </div>
  )
}

export default HomePage;
