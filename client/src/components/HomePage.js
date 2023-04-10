import BoardsView from '../containers/BoardsView';
import NonAuthView from './NonAuthView';
import { useSelector } from 'react-redux';

function HomePage() {
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);

  // const renderHomePage = () => {
  //   if (userIsLoggedIn) {
  //     return( 
  //       <BoardsView />
  //       )
  //   } else {
  //     return (
  //       <>
    
  //         <h1>test render...</h1>
  //         <p>* change userAuth boolean in HomePage component to test user authentication and view boards </p>
  //         <p>* also in NavBar, userAuth is dummy state to change login/sign-out text </p>
    
  //       </>
  //     )
  //   }
  // };

  return (
    <div>
      { userIsLoggedIn ? <BoardsView /> : <NonAuthView /> }
    </div>
  )
}

export default HomePage;
