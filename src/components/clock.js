import React from 'react';

export default class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            time: ""
        }
        this.fetchTime = this.fetchTime.bind(this);
    }

    componentWillMount() {
        this.setState({time: "00 : 00 : 00"})
    }

    componentDidMount() {
        this.clockTick();
    }

    formatTime(value) {
        if (value < 10) {
            return "0"+ String(value);
        }
        return value;
    }

    fetchTime() {
        let date = new Date();
        let hours = date.getHours();
        let mins = date.getMinutes();
        let secs = date.getSeconds();
        let time = `${this.formatTime(hours)} : ${this.formatTime(mins)} : ${this.formatTime(secs)}`;

        this.setState({time: time});
    }

    clockTick() {
        setInterval(this.fetchTime, 1000);
    }
    
    render(){
        return(
            <div className="clock">
                <h3>{this.state.time}</h3>
            </div>
        );
    }
}