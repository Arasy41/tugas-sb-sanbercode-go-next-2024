import React, { useState, useEffect } from "react";

function TugasHooks() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [countdown, setCountdown] = useState(100);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  if (countdown === 0) {
    return null;
  }

  return (
    <div className="container-hooks">
      <h1>Now At - {time}</h1>
      <p>Countdown: {countdown}</p>
    </div>
  );
}

export default TugasHooks;
// import React, { Component } from "react";

// class TugasHooks extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       time: new Date().toLocaleTimeString(),
//       countdown: 100,
//     };
//   }

//   componentDidMount() {
//     const intervalID = setInterval(() => {
//       this.setState({
//         time: new Date().toLocaleTimeString(),
//         countdown: this.state.countdown > 0 ? this.state.countdown - 1 : 0,
//       });
//     }, 1000);

//     if (this.state.countdown === 0) {
//       clearInterval(intervalID);
//     }
//   } 

//   componentWillUnmount() {
//     clearInterval(this.intervalID);
//   }

//   render() {
//     const { time, countdown } = this.state;

//     if (countdown === 0) {
//       return null;
//     }

//     return (
//       <>
//       <div className="container-hooks">
//         <h1>Now At - {time}</h1>
//         <p>Countdown: {countdown}</p>
//       </div>
//       </>
  
//     )
//   }
// }

// export default TugasHooks