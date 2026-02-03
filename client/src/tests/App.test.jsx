import { render, fireEvent } from '@testing-library/react'
import App from '../App'

it('increments count after click', () => {
  const { getByRole } = render(<App />)

  const btn = getByRole('button', { name: /count is 0/i })
  fireEvent.click(btn)

  // after click, the button text should update
  getByRole('button', { name: /count is 1/i })
})