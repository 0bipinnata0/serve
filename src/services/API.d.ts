declare namespace API {
  export type CurrentUser = {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  };

  export type LoginStateType = {
    statusCode: number;
    message: 'ok' | 'error';
    data?: any;
    error?: string;
  };

  export type NoticeIconData = {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  };
  export type Faketasks = {
    key: string;
    id: string;
    location: string;
    user: string;
    spend_time: string;
    status: string;
    create_time: string;
  };
}
