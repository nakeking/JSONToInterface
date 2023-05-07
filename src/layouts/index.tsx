import React from 'react';
import { Link, Outlet } from 'umi';
import styles from './index.less';

import { Layout, ConfigProvider } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  return (
    <ConfigProvider>
      <div className={styles.appLayout}>
        <Layout>
          <Sider className={styles.siderStyle}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/jsonToInterface">JSONToInterface</Link>
              </li>
            </ul>
          </Sider>
          <Layout>
            <Header className={styles.headerStyle}>Header</Header>
            <Content className={styles.contentStyle}>
              <Outlet />
            </Content>
            <Footer className={styles.footerStyle}>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
}

export default AppLayout