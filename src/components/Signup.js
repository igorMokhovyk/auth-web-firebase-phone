import {Card, Form, Button, Alert} from 'react-bootstrap';
import { useState } from "react";
import {useAuth} from "../context/AuthContext";
import {Link, useHistory} from "react-router-dom";

  export default function Signup() {
    // const emailRef = useRef()
    // const passwordRef = useRef()
    // const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const history = useHistory();

    const emailHandler = (event) => {
      setEmail(event.target.value)
    }

    const passwordHandler = (event) => {
      setPassword(event.target.value)
    }

    const passwordConfirmHandler = (event) => {
      setPasswordConfirm(event.target.value)
    }

    async function handleSubmit(e) {
      e.preventDefault()

      if (password !== passwordConfirm) {
        return setError("Passwords do not match")
      }

      try {
        setError("")
        setLoading(true)
        await signup(email, password)
        history.push("/") // if signup success - push to Dashboard
      } catch {
        setError("Failed to create an account")
      }

      setLoading(false)
    }

    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={emailHandler} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={passwordHandler} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" onChange={passwordConfirmHandler} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to='/login'>Log In</Link>
        </div>
      </>
    )
  }
