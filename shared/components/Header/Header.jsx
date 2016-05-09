import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Header(props) {
  return (
    <div className="header">
      <div className="header-content">
        <h1 className="site-title">
          <Link to="/" onClick={props.handleLogoClick}>Poller</Link>
        </h1>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  handleLogoClick: PropTypes.func,
};

export default Header;
