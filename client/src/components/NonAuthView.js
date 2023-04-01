import React from 'react';

function NonAuthView() {
  return (
    // replace href with log-in route (duplicate functionality from navbar?)
    <h5>Please <a href="/">sign in</a> to access your workspaces.</h5>
  )
}

export default NonAuthView;
