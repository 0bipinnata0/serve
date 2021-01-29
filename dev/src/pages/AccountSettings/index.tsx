import React, { Component } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import type { CurrentUser } from './data.d';
import SecurityView from './components/security';

type AccountSettingsProps = {
  dispatch: Dispatch;
  currentUser: CurrentUser;
}

type AccountSettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';
type AccountSettingsState = {
  selectKey: AccountSettingsStateKeys;
}

class AccountSettings extends Component<
  AccountSettingsProps,
  AccountSettingsState
  > {
  main: HTMLDivElement | undefined = undefined;

  constructor(props: AccountSettingsProps) {
    super(props);
    this.state = {
      selectKey: 'base',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountSettings/fetchCurrent',
    });
  }

  render() {
    const { currentUser } = this.props;
    if (!currentUser.userid) {
      return '';
    }
    return (
      <GridContent>
        <SecurityView
          account={currentUser.account}
          password={currentUser.password}
          description={currentUser.description}
        />
      </GridContent>
    );
  }
}

export default connect(
  ({ accountSettings }: { accountSettings: { currentUser: CurrentUser } }) => ({
    currentUser: accountSettings.currentUser,
  }),
)(AccountSettings);
