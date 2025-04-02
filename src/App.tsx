import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  showElement: boolean;
  today: Date;
  clockName: string;
};

export class App extends React.Component<{}, State> {
  state = {
    showElement: true,
    today: new Date(),
    clockName: 'Clock-0',
  };

  handleHide = (e: MouseEvent) => {
    e.preventDefault();

    this.setState({
      showElement: false,
    });
  };

  handleShow = () => {
    this.setState({
      showElement: true,
    });
  };

  componentDidMount() {
    document.addEventListener('contextmenu', this.handleHide);
    document.addEventListener('click', this.handleShow);

    window.setInterval(() => {
      this.setState({ today: new Date() });
    }, 1000);

    window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.handleHide);
    document.removeEventListener('click', this.handleShow);
  }

  render() {
    const { showElement, today, clockName } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {showElement && (
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
