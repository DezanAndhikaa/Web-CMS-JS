import React from 'react'
import {Snackbar} from '@material-ui/core';
import { Spinner } from '../../assets/icons'
import { ApiRequestActionsStatus } from '../../core/RestClientHelpers';
import './Loading.scss'

class Loading extends React.Component{

//still failed


    showLoading(){
        if(this.props.fetchStatusSales === ApiRequestActionsStatus.LOADING){
          return(
            <div className="loading-container">
              <img 
                src={Spinner}
                alt="loading-spinner"
                className="loading-icon"
                />
            </div>
          )
        }
        else if(this.props.fetchStatusPutLifetime === ApiRequestActionsStatus.LOADING){
          return(
                <div>
                <Snackbar
                  anchorOrigin={{ vertical: 'center',horizontal: 'right'}}
                  bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
                  open={this.state.stats}
                  onClose={this.handleClose}
                  autoHideDuration={3000}
                  message="Please Wait. Page will reload automatically"
                />
              </div>
              )
        }
        else if(this.props.fetchStatusSales === ApiRequestActionsStatus.FAILED){
          return(
            <div className="loading-container">
              OOPS THERE WAS AN ERROR :'(
            </div>
          )
        }else if(this.props.salesOrderList.Lists.length === 0){
          return(
            <div className="loading-container">
              DATA NOT FOUND
            </div>
          )
        }
      }     

    // render(){
    //   return(
    //     <div>
    //       {this.showLoading()}
    //     </div>
    //   )
    // }
}

export default Loading;