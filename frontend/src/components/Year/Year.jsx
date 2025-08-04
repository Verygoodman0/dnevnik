import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

import './Year.css'
import Month from '../Month/Month';

function Year() {
    const [year, setYear] = useState();
    // let yearSubmit;

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     yearSubmit = year;
    //     console.log(yearSubmit);
    // };

    return(
        <>
             <Form className='form_year'> {/* onSubmit={handleSubmit}> */}
                <InputGroup>
                    <InputGroup.Text id="basic-addon1" className='input_year'> Year </InputGroup.Text>
                    <Form.Control
                        placeholder="Enter year"
                        aria-label="year"
                        onChange={e => setYear(e.target.value)}
                    />
                    {/* <Button variant="primary" type="submit" className='mb-submit'>
                        Submit
                    </Button> */}
                </InputGroup>
            </Form>
            <Month yearInput={year}/>
        </>
    );
};

export default Year;