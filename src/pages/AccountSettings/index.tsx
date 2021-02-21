import React, { Component } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import SecurityView from './components/security';

type AccountSettingsType = {
  accountSettings: any;
  dispatch: Dispatch<any>;
  loading: boolean;
};
class AccountSettings extends Component<AccountSettingsType> {
  reqRef: number = 0;
  timeoutId: number = 0;
  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'accountSettings/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountSettings/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    // const { accountSettings, loading } = this.props;
    const { accountSettings, loading, dispatch } = this.props;
    const { userInfo } = accountSettings;
    return (
      <GridContent>
        <SecurityView
          account={userInfo.account}
          password={userInfo.password}
          description={userInfo.description}
          dispatch={dispatch}
          loading={loading}
        />
      </GridContent>
    );
  }
}

type obj = {
  accountSettings: any;
  loading: {
    effects: Record<string, boolean>;
  };
};

const mapStateToProps = ({ accountSettings, loading }: obj) => ({
  accountSettings,
  loading: loading.effects['accountSettings/fetch'],
});

export default connect(mapStateToProps)(AccountSettings);
