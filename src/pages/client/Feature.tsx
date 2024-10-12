import { ReactElement } from 'react'

import { Card, Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'

import { LogoCarousel } from '@/components'

import { features } from '@/utils/constants'

type Feature = {
  title: string
  text: string
  icon: ReactElement
}

export const Feature = () => {
  return (
    <section className='py-16 bg-white'>
      <h2 className='text-center text-4xl font-bold'>Why Choose Go Pass Manager?</h2>
      <LogoCarousel />
      <Row gutter={16} justify='center'>
        {features.slice(0, 3).map((feature: Feature) => (
          <Col span={6} key={feature.title}>
            <Card className='text-center' hoverable>
              <span className='text-3xl text-primary-800'>{feature.icon}</span>
              <Title level={4} className='mt-2'>
                {feature.title}
              </Title>
              <span className='text-base font-medium'>{feature.text}</span>
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={16} justify='center' className='mt-2'>
        {features.slice(3, 6).map((feature: Feature) => (
          <Col span={6} key={feature.title}>
            <Card className='text-center' hoverable>
              <span className='text-3xl text-primary-800'>{feature.icon}</span>
              <Title level={4} className='mt-2'>
                {feature.title}
              </Title>
              <span className='text-base font-medium'>{feature.text}</span>
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={16} justify='center' className='mt-2'></Row>
    </section>
  )
}
