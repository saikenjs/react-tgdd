import {
  LeftOutlined,
  MobileOutlined,
  RightOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { Layout, Menu } from 'antd';
import { ReactNode, useState } from 'react';

const { Sider, Content } = Layout;

const MenuStyled = styled(Menu)`
  font-size: 16px;
  padding-left: 1em;
  > .ant-menu-item {
    margin: 0 !important;
    padding: 0.8em 0.5em;
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

  // Colapsed
  &.ant-menu-inline-collapsed {
    > .ant-menu-item {
      padding: 0.8em calc(50% - 16px / 2);
    }
  }
`;

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);

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
          onClick={() => setCollapsed(prev => !prev)}
        >
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </div>
        <div className="p-6">
          <img
            className="block object-left mb-20 h-[42px] object-cover"
            src={`/images/logo-full.png`}
          />
        </div>
        <MenuStyled
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            { key: 1, icon: <MobileOutlined />, label: 'Product Management' },
            { key: 2, icon: <TagsOutlined />, label: 'Category Management' },
          ]}
        />
      </Sider>
      <Content className="p-6 bg-white shadow-2xl rounded-xl">
        {children}
      </Content>
    </Layout>
  );
}
