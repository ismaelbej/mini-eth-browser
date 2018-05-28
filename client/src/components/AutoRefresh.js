import React from 'react';

function AutoRefresh(WrappedComponent, timeout) {
  return class PP extends React.Component {
    constructor(props) {
      super(props);
      this.forceRefresh = this.forceRefresh.bind(this);
    }

    componentDidMount() {
      this.timer = setTimeout(this.forceRefresh, timeout);
    }

    componentWillUnmount() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }

    forceRefresh() {
      this.props.refreshView();
      this.timer = setTimeout(this.forceRefresh, timeout);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default AutoRefresh;
