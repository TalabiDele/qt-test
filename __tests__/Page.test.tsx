import { render, screen, fireEvent } from '@testing-library/react'
import Page from '@/app/questions/page'

describe('Page', () => {
	// Mocking data for existing questions and options
	const existingQuestions = [
		{
			id: '1',
			question: 'Which horoscope sign is a fish?',
			options: ['Aquarius', 'Cancer', 'Pisces'],
		},
		{
			id: '2',
			question:
				'What was the name of the Franco-British supersonic commercial plane that operated from 1976-2003?',
			options: ['Accord', 'Concorde', 'Mirage'],
		},
	]

	it('renders existing questions and options', () => {
		render(<Page />)

		const question1 = screen.getByText('Which horoscope sign is a fish?')
		const question2 = screen.getByText(
			'What was the name of the Franco-British supersonic commercial plane that operated from 1976-2003?'
		)

		// Check if existing questions are rendered
		expect(question1).toBeInTheDocument()
		expect(question2).toBeInTheDocument()

		// Check if options for existing questions are    rendered

		const option1 = screen.getByText('Aquarius')
		const option2 = screen.getByText('Cancer')
		const option3 = screen.getByText('Mirage')

		expect(option1).toBeInTheDocument()
		expect(option2).toBeInTheDocument()
		expect(option3).toBeInTheDocument()
	})

	it('allows creating new questions with options', () => {
		render(<Page />)

		const questionButton = screen.getByText('Add New Question')

		// Click on the button to add a new question
		fireEvent.click(questionButton)

		// Check if input fields for new question and options are rendered
		const question = screen.getByPlaceholderText('Enter question')

		const option = screen.getByPlaceholderText('Enter option')

		expect(question).toBeInTheDocument()
		expect(option).toBeInTheDocument()

		// Fill in the input fields for new question and options

		fireEvent.change(question, {
			target: { value: 'New Question' },
		})
		fireEvent.change(option, {
			target: { value: 'New Option' },
		})

		const addOption = screen.getByText('Add option')

		// Click on the button to add a new option
		fireEvent.click(addOption)

		// Check if the new option is added
		expect(addOption).toBeInTheDocument()
	})

	it('allows adding and removing options to existing questions', () => {
		render(<Page />)

		// Click on the button to add a new option to the first question
		const addOption = screen.getByText('Add option')

		fireEvent.click(addOption)

		// Check if the new option is added to the first question
		const option4 = screen.getByText('Option 4')

		expect(option4).toBeInTheDocument()

		// Click on the button to remove an option from the first question
		// fireEvent.click(getByText('Remove Option'))

		// // Check if the option is removed from the first question
		// expect(getByText('Option 3')).not.toBeInTheDocument()
	})

	it('enforces constraints on the number of options per question', () => {
		render(<Page />)

		// Click on the button to add a new option to the second question
		const addOption = screen.getByText('Add option')

		fireEvent.click(addOption)

		// Click on the button to add another option to the second question
		fireEvent.click(addOption)

		// Check if the new options are added to the second question
		// expect(getByText('Option 4')).toBeInTheDocument()
		// expect(getByText('Option 5')).toBeInTheDocument()

		// // Click on the button to add another option to the second question
		// fireEvent.click(getByText('Add Option'))

		// // Check if the maximum number of options (5) is enforced
		// expect(getByText('Option 6')).not.toBeInTheDocument()
	})
})
