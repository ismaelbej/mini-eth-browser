import React from 'react';

function AutoRefresh(WrappedComponent, timeout) {
  return class PP extends React.Component {
    constructor(props) {
      super(props);
      this.forceRefresh = this.forceRefresh.bind(this);
    }

    componentDidMount() {
      this.timer = setInterval(this.forceRefresh, timeout);
    }

    componentWillUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    forceRefresh() {
      this.props.refreshView();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default AutoRefresh;
