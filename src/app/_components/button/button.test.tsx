import { describe } from "node:test";
import {render,screen} from "@testing-library/react"
import { Button } from "./button";

describe('Button', () => {
    test('renders a default button', () => {
        const {getByText}=render(<Button>Click here</Button>);
        expect(getByText('Click here')).toBeInTheDocument()
    })

    test('disables the button when disabled prop is true',()=>{
        render(<Button disabled={true}>click here</Button>)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    test ('applied the correct css class for diffrent button variants',()=>{
        const {rerender}=render(<Button variant="primary">click here</Button>)
        expect(screen.getByRole('button')).toHaveClass('btn-primary');

        rerender(<Button variant="info">click here</Button>);
          expect(screen.getByRole('button')).toHaveClass('btn-info');
    })
})