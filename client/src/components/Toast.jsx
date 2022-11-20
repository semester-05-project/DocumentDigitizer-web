import React from 'react';

const Toast = ({ msg }) => {
	return (
		<div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
			<div class="toast-header">
				<strong class="me-auto">Bootstrap</strong>
				<small>11 mins ago</small>
				<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
			</div>
			<div className="toast-body">
				{msg}
			</div>
		</div>
	);
}

export default Toast;