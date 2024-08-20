import './App.css';
import { ConfigProvider, Layout, Typography } from 'antd';
import Product from './pages/product';

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#333',
                    borderRadius: 10,
                }
            }}
        >
            <Layout className='main-layout'>
                <Layout.Header className='main-header'>
                    <Typography.Title style={{ margin: 0, color: '#fff' }}>
                        Product Management App
                    </Typography.Title>
                </Layout.Header>
                <Layout.Content className='main-content'>
                    <Product />
                </Layout.Content>
                <Layout.Footer className='main-footer'>
                    © 2024 Product Management App
                </Layout.Footer>
            </Layout>
        </ConfigProvider >
    );
}

export default App;
