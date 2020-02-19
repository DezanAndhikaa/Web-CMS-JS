import React from 'react'
import { Card } from '@material-ui/core'

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
        return(
            <>
            {this.state.col.map(() => (
                <div className="filters-container">
                  {this.state.events.map(world => (
                       <Card className="kartu">
                         <div className="kartu-title">{world.time}</div>
                         <div className="kartu-site">{world.title}</div>
                         <div className="kartu-title">{world.location}</div>
                         <div className="kartu-title">{world.push}</div>
                       </Card>
                       
                  ))}
                </div>
           ))}
           </>
        )
    }
}