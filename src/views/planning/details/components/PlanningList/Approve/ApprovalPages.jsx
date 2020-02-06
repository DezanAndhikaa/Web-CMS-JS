import React from 'react';

export default class ApprovalPages extends React.PureComponent {
    state ={
		whatPageIsChoosed : '',
		// approveTotalData : 0,
		// notApproveTotalData : 0,
		// deleteTotalData : 0,
		// sapIssueTotalData : 0
	}


	onClickDownloadSalesApproved = () => {
		let link = document.createElement("a");
		document.body.appendChild(link);
		link.style = "display: none";
		const todayDate = moment(new Date()).format('DD-MM-YYYY');
		// const salesOrder  = this.state.selectedData.So;
		let fileName = "Sales-Order-Planning-"+todayDate+".csv";
		let blob = new Blob([this.props.approveSalesDownloaded.data]),
		  url = window.URL.createObjectURL(blob);
		link.href = url;
		link.download = fileName;
		link.click();
		window.URL.revokeObjectURL(url);
	}

	handleSalesApprovedDownload = async() => {
		let arr = []
		const index = this.props.selectedSalesPlans.length
		if (this.props.selectedSalesPlans.length > 0) {
		  for (let i = 0; i < index; i++) {
			arr = [...arr, this.props.selectedSalesPlans[i].So]
			console.log('pantek');
		  }
		}await this.props.downloadSalesApproved(arr);
		if (
		  this.props.approveSalesDownloaded.status === ApiRequestActionsStatus.FAILED
		) {
		  this.setState({ showError: true });
		}
	}

	//render search button
	_renderSearchBar(){
		return (
			<div className="bottom-rows">
				<SearchInput
				{...this.props}
				webInfo="Search"
				onSalesSearch={this.props.onSearchSales}
				onServiceSearch={this.props.onSearchService}
				/>
		  	</div>
		);
	  }

	_renderBaseButton (){
		return(
			<div className="bottom-row">
			  {/* <BaseButton titles="Total" totalSelectedItems ={this.props.selectedSalesPlans.length}/> */}
			  <BaseButton titles="Approve"
				{...this.props}
				whatTabsIsRendered={this.state.isPaging}
				disabledButton = {this.props.selectedSalesPlans.length < 1 }
				totalSelectedItems ={this.props.selectedSalesPlans.length}
				handleSalesApprove={this.handleSalesApprove}
				selectedData={this.state.selectedData}
			  />
			  <BaseButton titles="Cancel Approve"
				// {...this.props}
				// whatTabsIsRendered={this.state.isPaging}
				// disabledButton = {this.props.selectedSalesPlans.length < 1 }
				// totalSelectedItems ={this.props.selectedSalesPlans.length}
				// handleSalesApprove={this.handleSalesApprove}
				// selectedData={this.state.selectedData}
			  />
			  <BaseButton titles="Download"
				{...this.props}
				whatTabsIsRendered={this.state.isPaging}
				handleSalesApprovedDownload={this.handleSalesApprovedDownload}
				// selectedDownloadData={this.state.selectedData.So} 
			  />
			  <BaseButton titles="Edit" />
			  <BaseButton titles="Delete" 
				{...this.props}
				disabledButton = {this.props.selectedSalesPlans.length < 1 }
				totalSelectedItems ={this.props.selectedSalesPlans.length}
				// whatTabsIsRendered={this.state.isPaging}
				handleDeleteSales={this.handleDeleteSales}
			  />
			</div>
		);
	}

	_renderDownloadBtn(){
		return(
			<BaseButton titles="Download"
			{...this.props}
			whatTabsIsRendered={true}
            handleSalesApprovedDownload={this.handleSalesApprovedDownload}
            // selectedDownloadData={this.state.selectedData.So} 
          />
		)
	}
	onClickSalesOrder = () =>{
		this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
	}

	salesOrderList(){
		return(
		  <div className="plannings-list-containers">
			<SalesOrderList 
			{...this.props}
			displaySalesCheckbox={this.props.salesParameter.paramsData.assigmentFilter || this.props.salesParameter.paramsData.inProgressFilter}
			sortSalesByState={this.props.sortSalesBy}
			onClickSalesOrder={this.onClickSalesOrder}
			onChoosedSales={this.updateAssignmentSalesStates}
			selectedSalesPlanList={this.props.selectedSalesPlans}
			onClickTabHead={this.props.onClickSortBy}
			isTrackingHistory={this.state.isTrackingHistory}
			/>
		  </div>
		);
	  }

	  approvedSalesOrderList(){
		return(
		  <div className="plannings-list-containers">
			<ApprovedSalesOrderList 
			{...this.props}
			displaySalesCheckbox={this.props.salesParameter.paramsData.assigmentFilter || this.props.salesParameter.paramsData.inProgressFilter}
			sortSalesByState={this.props.sortSalesBy}
			onClickSalesOrder={this.onClickSalesOrder}
			onChoosedSales={this.updateAssignmentSalesStates}
			selectedSalesPlanList={this.props.selectedSalesPlans}
			/>
		  </div>
		);
	  }
	//   componentDidUpdate = () => {

	approvedSalesOrderList(){
	return(
		<div className="plannings-list-containers">
		<ApprovedSalesOrderList 
		{...this.props}
		displaySalesCheckbox={this.props.salesParameter.paramsData.assigmentFilter || this.props.salesParameter.paramsData.inProgressFilter}
		// sortSalesByState={this.props.sortSalesBy}
		onClickSalesOrderApproved={this.onClickSalesOrderApproved}
		onChoosedSales={this.updateAssignmentSalesStates}
		selectedSalesPlanList={this.props.selectedSalesPlans}
		// onClickTabHead={this.props.onClickSortBy}
		/>
		</div>
	);
	}

	_renderList = (whatPageIsChoosed) =>{
	// const whatPageIsChoosed = '';
	this.setState({
		whatPageIsChoosed : whatPageIsChoosed
	})
	switch (this.state.whatPageIsChoosed) {
		case 'Approve':
			console.log('this is ', whatPageIsChoosed)
			return(
				this.approvedSalesOrderList()
			)
		case 'Not Approve': 
		console.log('this is ', whatPageIsChoosed)
			return (
				this.salesOrderList()
			)
		case 'Delete': 
		console.log('this is ', whatPageIsChoosed)
			// return (
			// 	this.salesOrderList()
			// )
		case 'SAP ISSUE': 
		console.log('this is ', whatPageIsChoosed)
			// return (
			// 	this.salesOrderList()
			// )
		default:
			console.log('this is default', whatPageIsChoosed)
			// return(
			// 	this.approvedSalesOrderList()
			// )
	}
	}

	updateAssignmentSalesStates = (plan) => {
	if (this.props.selectedSalesPlans
		.some((plans) => plans.So === plan.So,
		// console.log('sssss sales', this.state.selectedData.So)
		)) 
	{ return this.props.unselectSalesPlan(plan); }
	return this.props.selectSalesPlan(plan);
	};
	componentDidMount = async() =>{
		await this.props.fetchApprovedSales(this.props.salesParameter.dataFilter);
		await this.props.fetchSalesOrder(this.props.salesParameter.dataFilter);
		// await this.props.fetchServiceOrder(this.props.serviceParameter.dataFilter);
		// await this.props.fetchApprovedService(this.props.serviceParameter.dataFilter);
		await this.props.fetchDeletedSales(this.props.salesParameter.dataFilter);
		// await this.props.fetchDeletedService(this.props.serviceParameter.dataFilter);
		this.setPropsToState();
	}

	componentDidUpdate = (prevProps) => {
		if (this.props.approveSalesDownloaded.status === ApiRequestActionsStatus.SUCCEEDED &&
			prevProps.approveSalesDownloaded.status === ApiRequestActionsStatus.LOADING) {
			this.onClickDownloadSalesApproved()
		  }
		//   if (this.props.approveServiceDownloaded.status === ApiRequestActionsStatus.SUCCEEDED &&
		// 	prevProps.approveServiceDownloaded.status === ApiRequestActionsStatus.LOADING) {
		// 	this.onClickDownloadServiceApproved()
		//   }
	}

	setPropsToState(){
		// console.log('pantek ke trigger')
		this.setState({
			approveTotalData : this.props.salesOrderListApproved.TotalData,
			notApproveTotalData : this.props.salesOrderList.TotalData,
			deleteTotalData : this.props.salesOrderListDeleted.TotalData,
			sapIssueTotalData : 0
		})
	}

	render(){
		return(
			<main className="content" >
				<div className="table-bar">
					<div className="title-containers">
						<div className="title">
							Tracking history - Sales Order
						</div>
						<div className="approval-search-bar">							
							{this._renderSearchBar()}
							{this._renderBaseButton()}
						</div>
					</div>
					{/* <div className="base-button-containers">
						
					</div> */}
					{/* <div className="filters-containers">
						<div className="dropdowns-containers">
							<Cards title="Approve" totalData={this.state.approveTotalData} renderList={this._renderList} /> &nbsp; 
							<Cards title="Not Approve" totalData={this.state.notApproveTotalData} renderList={this._renderList} /> &nbsp; 
							<Cards title="Delete" totalData={this.state.deleteTotalData} renderList={this._renderList} /> &nbsp; 
							<Cards title="SAP ISSUE" totalData={this.state.sapIssueTotalData} renderList={this._renderList} />
						</div>
					</div> */}
					<div>
						{/* {this._renderList(this.state.whatPageIsChoosed)} */}
					</div>
				</div>
			</main>
		);
	}
}