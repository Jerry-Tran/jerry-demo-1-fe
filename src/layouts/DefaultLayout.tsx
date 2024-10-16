import { Element } from 'react-scroll'

import { Layout } from 'antd'

import { Contact, Feature, Home, Pricing } from '@/pages'

import { CustomFooter, CustomHeader } from './partials'

const { Content } = Layout

export const DefaultLayout = () => {
  return (
    <Layout className='min-h-screen overflow-x-hidden'>
      <CustomHeader />
      <Content className='mt-16'>
        <Element name='home'>
          <Home />
        </Element>
        <Element name='feature'>
          <Feature />
        </Element>
        <Element name='pricing'>
          <Pricing />
        </Element>
        <Element name='contact'>
          <Contact />
        </Element>
      </Content>

      <CustomFooter />
    </Layout>
  )
}
