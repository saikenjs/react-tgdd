import {
  BankOutlined,
  LeftOutlined,
  MobileOutlined,
  RightOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { ReactNode } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseAtom } from '../recoil/atoms/BaseAtom';

import { Login } from '../components/Login';
import { userAtom } from '../recoil/atoms/UserAtom';

const { Sider, Content } = Layout;

const MenuStyled = styled(Menu)`
  font-size: 16px;
  padding-left: 1em;
  border-right: none !important;

  > .ant-menu-item {
    margin: 0 !important;
    padding: 0.8em 1.5em;
    height: max-content;
    gap: 1em;
    border-radius: 50px 0 0 50px;

    &::after {
      display: none;
    }

    > .ant-menu-item-icon > svg {
      height: 20px;
      width: 20px;
    }
  }

  // Collapsed
  &.ant-menu-inline-collapsed {
    > .ant-menu-item {
      display: flex;
      align-items: center;
      padding: 0.8em calc(50% - 16px / 2);
    }
  }
`;

interface Props {
  children: ReactNode;
}

interface SiderItem {
  icon: ReactNode;
  label: string;
  path: string;
}

export default function AdminLayout({ children }: Props) {
  const [{ collapsed }, setBase] = useRecoilState(BaseAtom);

  const user = useRecoilValue(userAtom);

  const match = useMatch('/admin/:module');

  const navigate = useNavigate();

  const genSiderItems = (items: SiderItem[]): ItemType[] =>
    items.map(({ icon, label, path }) => ({
      key: path.replace('/admin/', ''),
      icon,
      label,
      onClick: () => navigate(path),
    }));

  if (!user) return <Login />;

  return (
    <Layout hasSider className="h-screen gap-10 p-6 bg-[#dfeff7] shadow-2xl">
      <Sider
        theme="light"
        className="relative rounded-xl"
        width={300}
        collapsedWidth={90}
        collapsible
        collapsed={collapsed}
        trigger={null}
      >
        <div
          className="bg-[#FFEB99] absolute w-10 h-10  rounded-full shadow-2xl -right-[20px] flex justify-center items-center text-gray-800 top-20"
          onClick={() =>
            setBase(prev => ({ ...prev, collapsed: !prev.collapsed }))
          }
        >
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </div>
        <div className="p-6">
          <div className="overflow-hidden">
            <Link to="/">
              <img
                className="block object-left mb-20 h-[42px] object-cover overflow-hidden"
                src={`/images/logo-full.png`}
              />
            </Link>
          </div>
        </div>
        <MenuStyled
          mode="inline"
          selectedKeys={[match?.params.module ?? '']}
          items={genSiderItems([
            /*
             * {
             *   icon: <HomeOutlined />,
             *   label: 'Home',
             *   path: '/admin',
             * },
             */
            {
              icon: <MobileOutlined />,
              label: 'Product Management',
              path: '/admin/product-management',
            },
            {
              icon: <TagsOutlined />,
              label: 'Category Management',
              path: '/admin/category-management',
            },
            {
              icon: <BankOutlined />,
              label: 'Manufacturer Management',
              path: '/admin/manufacturer-management',
            },
            {
              icon: <ShopOutlined />,
              label: 'Store Management',
              path: '/admin/store-management',
            },
            {
              icon: <ShoppingOutlined />,
              label: 'Order Management',
              path: '/admin/order-management',
            },
          ])}
        />
      </Sider>
      <Content className="p-6 overflow-scroll bg-white shadow-2xl rounded-xl">
        {children}
      </Content>
    </Layout>
  );
}
