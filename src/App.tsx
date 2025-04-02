import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  hasClock: boolean;
  today: Date;
  clockName: string;
};

export class App extends React.Component<{}, State> {
  state = {
    hasClock: true,
    today: new Date(),
    clockName: 'Clock-0',
  };

  handleHide = (e: MouseEvent) => {
    e.preventDefault();

    this.setState({
      hasClock: false,
    });
  };

  handleShow = () => {
    this.setState({
      hasClock: true,
    });
  };

  handleDate = () => {
    this.setState({ today: new Date() });
  };

  handleClockId = () => {
    this.setState({ clockName: getRandomName() });
  };

  componentDidMount() {
    window.addEventListener('contextmenu', this.handleHide);
    window.addEventListener('click', this.handleShow);

    window.setInterval(this.handleDate, 1000);
    window.setInterval(this.handleClockId, 3300);
  }

  componentDidUpdate(prevState: Readonly<State>): void {
    if (prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Clock name changed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.handleHide);
    document.removeEventListener('click', this.handleShow);
  }

  render() {
    const { hasClock, today, clockName } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && (
          <div className="Clock">
            <strong className="Clock__name">{clockName}</strong>

            {' time is '}

            <span className="Clock__time">
              {today.toUTCString().slice(-12, -4)}
            </span>
          </div>
        )}
      </div>
    );
  }
}

// import React from 'react';
// import './App.scss';

// function getRandomName(): string {
//   const value = Date.now().toString().slice(-4);

//   return `Clock-${value}`;
// }

// export const App: React.FC = () => {
//   const today = new Date();
//   let clockName = 'Clock-0';

//   // This code starts a timer
//   const timerId = window.setInterval(() => {
//     clockName = getRandomName();
//   }, 3300);

//   // this code stops the timer
//   window.clearInterval(timerId);

//   return (
//     <div className="App">
//       <h1>React clock</h1>

//       <div className="Clock">
//         <strong className="Clock__name">{clockName}</strong>

//         {' time is '}

//         <span className="Clock__time">
//           {today.toUTCString().slice(-12, -4)}
//         </span>
//       </div>
//     </div>
//   );
// };
