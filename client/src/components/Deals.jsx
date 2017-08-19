import React from 'react';
import Deal from './Deal.jsx';

var Deals = (props) => (
	<div>
		{props.dealInfos.map((dealInfo, i) => {
			return <Deal dealInfo={dealInfo} key={i}/> ;
		})}
	</div>
);

export default Deals;