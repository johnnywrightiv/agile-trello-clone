import AuthView from './AuthView';
import NonAuthView from './NonAuthView';

// dummy authentication... should replace with actual authenticaition state
// switch from true to false to test different views
const userAuth = true

function HomePage() {
  return (
    <>

      <h1>test render...</h1>
      <p>* change userAuth boolean in HomePage component to test user authentication and view boards </p>
      <p>* also in NavBar, userAuth is dummy state to change login/sign-out text </p>

      {userAuth ? <AuthView/> : <NonAuthView/>}

    </>
  )
}

export default HomePage;
