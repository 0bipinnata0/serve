export interface TagType {
  key: string;
  label: string;
}

export interface GeographicItemType {
  name: string;
  id: string;
}

export interface GeographicType {
  province: GeographicItemType;
  city: GeographicItemType;
}

export interface NoticeType {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
}

export type CurrentUser = {
  description: string;
  name: string;
  avatar: string;
  userid: string;
  resourceName: string;
  resourceCode: string;
  notice: NoticeType[];
  email: string;
  signature: string;
  title: string;
  group: string;
  tags: TagType[];
  notifyCount: number;
  unreadCount: number;
  country: string;
  address: string;
  phone: string;
  leader: string;
  account: string;
  password: string;
  cores: string;
  continues: string;
  capacity: string;
};
