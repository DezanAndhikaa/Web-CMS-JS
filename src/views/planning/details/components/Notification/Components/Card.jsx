import React from 'react';
import '../Notification.scss';

export default class CardData extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      col: [
        {},
        {},
        {},{},{}
      ],
      events: [
        { id: 1, time: "22 agustus 2018 - 9:00", title: "Jembayan", location: "Telah Menginput Lifetime Component", push: "dengan SO : 138580736 dan 13751973" },
        { id: 2, time: "22 agustus 2018 - 9:00", title: "Jembayan", location: "Telah Menginput Lifetime Component", push: "dengan SO : 138580733 dan 13151973" },
        { id: 3, time: "22 agustus 2018 - 9:00", title: "Jembayan", location: "Telah Menginput Lifetime Component", push: "dengan SO : 138580731 dan 13451973" },
      ],
      notif: [{}],
      list: [
        { id: 1, time: "22 Agustus 2018 - 10:00", title: "Jembayan", location: "Telah Menginput Lifetime Component", push: "dengan SO : 138580736 dan 13751973" },
        { id: 2, time: "20 September 2018 - 9:00", title: "Jakarta", location: "Telah Menginput Lifetime Component", push: "dengan SO : 138580733 dan 13151973" },
        { id: 3, time: "12 Oktober 2018 - 11:00", title: "Bandung", location: "Telah Menginput Lifetime Component", push: "dengan SO : 138580731 dan 13451973" },
        { id: 4, time: "22 Oktober 2018 - 8:00", title: "Surabaya", location: "Telah Menginput Lifetime Component", push: "dengan SO : 138580733 dan 13151973" },
        { id: 5, time: "28 November 2018 - 9:40", title: "Bekasi", location: "Telah Menginput Lifetime Component", push: "dengan SO : 138580731 dan 13451973" },
      ]
      // nextPage: true,
      // prevPage: false,
      // numberOfPage: 2,
      // currentPage: 1,
      // filter: {
      //   filter : {}
      // }
    };
  }
  render(){
    if(this.props.idCard === "Notification"){
      return(
        <>
          {this.state.notif.map(() => (
            <>
              {this.state.list.map(world => (
                <div className="list-item-notif">
                  <div className="kartu-judul">{world.time}</div>
                  <div className="kartu-nama-site">{world.title}</div>
                  <div className="kartu-judul">{world.location}</div>
                  <div className="kartu-judul">{world.push}</div>
                </div>
              ))}
            </>
          ))}
        </>
      )
    } 
    else if(this.props.idCard === "See All"){
      return(
          <>
          {this.state.col.map(() => (
            <div className="filters-container-notif">
              {this.state.events.map(world => (
                <div className="kartu">
                {/* <Card className="kartu"> */}
                  <div className="kartu-title">{world.time}</div>
                  <div className="kartu-site">{world.title}</div>
                  <div className="kartu-title">{world.location}</div>
                  <div className="kartu-title">{world.push}</div>
                {/* </Card> */}
                </div>
              ))}
            </div>
          ))}
          </>
      )
    }
  }
}