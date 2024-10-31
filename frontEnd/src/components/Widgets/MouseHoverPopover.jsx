
import React from 'react';
import PropTypes from 'prop-types';


const MouseHoverPopover = ({ message }) => {
    return (
        <div className="popover">
            {message}
        </div>
    );
};

MouseHoverPopover.propTypes = {
    message: PropTypes.string.isRequired,
};

export default MouseHoverPopover;
