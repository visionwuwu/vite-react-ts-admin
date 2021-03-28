import React from 'react'
import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import Demo from '@/demo'
import foo from './foo'

describe('test', () => {
  foo()
  it('1 + 1', () => {
    expect(1 + 2).toBe(3)
  })

  it('test demo page', () => {
    const {getByText} = render(<Demo />)
    // const element = getByTestId('demo')
    const element = getByText('Demo Page').parentElement as HTMLDivElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('DIV')
  })
})
