import { useSelector } from "react-redux";

const RenderCardComments = () => {
  const userAuth = useSelector(state => state.userAuth);

  return (
    <>
    <h4> Comments & Activity </h4>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span className='user-circle'>{userAuth.user[0].toUpperCase()}</span> 
      <span>a comment or activity log item</span>
    </div>
    </>
  )
}

export default RenderCardComments;