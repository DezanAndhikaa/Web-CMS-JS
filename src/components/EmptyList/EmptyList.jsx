import React from 'react';
import { Empty } from '../../assets/imgs';
import './EmptyList.scss';

export default class EmptyList extends React.PureComponent {
    render() {
        return(
            <div className="paper-empty-list">
                <img className="empty-image" src={Empty} alt="" />
                <div className="caption-image">
                    <p className="header-caption">Revision List</p>
                    <p className="caption1">You still don't have the revision record,</p>
                    <p className="caption2">Let's keep it</p>
                </div>
            </div>
        )
    }
}