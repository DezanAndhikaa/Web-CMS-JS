import React from 'react';
import { Button, Modal } from '@material-ui/core';
import './SapGuide.scss';
import CloseButton from '../../../../../../../components/ActionButton/CloseButton/CloseButton';
import { ImgSapGuide } from '../../../../../../../assets/imgs';

export default class SapGuide extends React.Component{

    state={
      isShowModal: false,
    }

    _renderIssue(){
      return(
        <div className="sap-guide-modal">
          <div className="sap-guide-container">
            <div className="top-row-sap-guide">
              <p className="sap-guide-title">Welcome at SAP Issue</p>
              <CloseButton onClose={this.props.onClose}/>
            </div>
            <div className="sap-guide-content">
                <p className="sap-guide-ket"> 1. Kami sudah menyediakan 11 tombol untuk pengajuan revisi jika terjadi kesalahan pada pengisian SAP</p>
                <p className="sap-guide-ket"> 2. Jika terjadi lebih dari 1 kesalahan, kamu bisa pilih lebih dari 1 tombol</p>
                <p className="sap-guide-ket"> 3. Isi <i>description</i> (sesuai dengan kebutuhan)</p>
                <p className="sap-guide-ket"> 4. Setelah itu, klik tombol <i>send SAP Issue untuk mengirimkan email pengajuan revisi SAP</i></p>
                <p className="sap-example-title">Example: </p>
                <img className="sap-guide-image" src={ImgSapGuide} alt="" />
            </div>
            <div className="bottom-row-sap-guide">
                <Button className="btn-go-to-sap" variant="outlined" onClick={ () => {this.props.onClose()} } >Go to SAP Issue Page</Button>
            </div>
          </div>
        </div>
      )
    }

    render(){
      return(
        <div>
          <Modal className="modal-pos-sap-guide" open={this.props.openModal}>
            <div className="body-container-sap">
              {this._renderIssue()}
            </div>
          </Modal>
        </div>
      )
    }
}